// import dependencies
import express, { Request, Response } from 'express';
import { tokenAuth as auth } from '../middleware/authenticate';
import Conversation from '../models/conversation';
import Message from '../models/message';
import User from '../models/user';

const router = express.Router();

const getPartnerInfo = (conversation: any, userId: string) => {
    const partner =
        conversation.toUser._id.toString() === userId.toString() ? conversation.fromUser : conversation.toUser;
    return partner;
};

// find existing conversation
const findConversation = async (req: Request, res: Response) => {
    const authUser = (req as any).authUser;
    const { userId } = req.params;
    try {
        const conversation: any = await Conversation.findOne({
            $or: [
                { toUser: userId, fromUser: authUser._id },
                { toUser: authUser._id, fromUser: userId }
            ]
        });
        if (conversation) {
            res.status(200).json({
                success: true,
                conversation: {
                    ...conversation._doc,
                    partnerInfo: getPartnerInfo(conversation, authUser._id)
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No conversation found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// if not create new conversation
const createConversation = async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    const authUser = (req as any).authUser;
    try {
        const existsConversation = await Conversation.findOne({
            $or: [
                { toUser: userId, fromUser: authUser._id },
                { toUser: authUser._id, fromUser: userId }
            ]
        });

        if (!existsConversation) {
            const newConversation = new Conversation({
                toUser: userId,
                fromUser: authUser._id
            });
            const savedConversation = await newConversation.save();

            if (savedConversation) {
                // save message
                const newMessage = new Message({
                    userInfo: authUser._id,
                    conversationId: savedConversation._id,
                    message
                });
                await newMessage.save();

                // if conversation update last message
                savedConversation.lastMessage = message;
                await savedConversation.save();

                // populate conversation toUser and fromUser
                const populatedData: any = await Conversation.findOne({ _id: savedConversation._id })
                    .populate('toUser', 'name avatar')
                    .populate('fromUser', 'name avatar')
                    .exec();

                // target conversation to user
                const targetUser = getPartnerInfo(populatedData, authUser._id);

                const conversation = {
                    ...populatedData._doc,
                    partnerInfo: targetUser
                };

                (global as any).chat.emit(`conversation.${targetUser._id}`, conversation);

                res.status(201).json({
                    success: true,
                    conversation
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Something went wrong'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Conversation already exists'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// send message
const sendMessage = async (req: Request, res: Response) => {
    const { message, conversationId } = req.body;
    const authUser = (req as any).authUser;
    try {
        const conversation: any = await Conversation.findOne({ _id: conversationId })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .exec();

        if (conversation) {
            // save message
            const newMessage: any = new Message({
                userInfo: authUser._id,
                conversationId: conversation._id,
                message
            });

            await newMessage.save();

            // if conversation update last message
            conversation.lastMessage = message;
            await conversation.save();

            const targetUser = getPartnerInfo(conversation, authUser._id);

            (global as any).chat.emit(`conversation.${targetUser._id}`, {
                ...conversation._doc,
                partnerInfo: targetUser
            });

            const userInfo = {
                _id: authUser._id,
                name: authUser.name
            };

            const messageData = {
                ...newMessage._doc,
                userInfo
            };

            (global as any).chat.emit(`newMessage.${conversationId}`, messageData);

            res.status(201).json({
                success: true,
                message: messageData
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Something went wrong',
                error: 'Conversation not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// get conversations
const getConversations = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const authUser = (req as any).authUser;
    try {
        const docs = await Conversation.find({ $or: [{ toUser: userId }, { fromUser: userId }] })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .sort('-updatedAt')
            .exec();

        const conversations = docs.map((conversation: any) => ({
            ...conversation._doc,
            partnerInfo: getPartnerInfo(conversation, authUser._id)
        }));

        res.status(200).json({
            success: true,
            conversations
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// get messages
const getMessages = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const authUser = (req as any).authUser;

    try {
        // find conversation
        const conversation = await Conversation.findOne({ _id: conversationId })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .exec();

        const chatHead = getPartnerInfo(conversation, authUser._id);

        // find all messages
        const messages = await Message.find({ conversationId }).populate('userInfo', 'name avatar').exec();
        res.status(200).json({
            success: true,
            messages,
            chatHead
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// get users to start conversation
const getUsers = async (req: Request, res: Response) => {
    const authUser = (req as any).authUser;
    try {
        const users = await User.find({ _id: { $ne: authUser._id } });

        // get all conversations
        const conversations = await Conversation.find({
            $or: [{ toUser: authUser._id }, { fromUser: authUser._id }]
        });
        // filter users who have conversation with current user
        const filteredUsers = users.map((user: any) => {
            const found = conversations.find((item: any) => {
                const { toUser, fromUser } = item;
                return toUser.toString() === user._id.toString() || fromUser.toString() === user._id.toString();
            });
            return {
                ...user._doc,
                conversationId: found ? found._id : null
            };
        });

        res.status(200).json({
            success: true,
            users: filteredUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// outgoing call handler
const callRequest = (req: Request, res: Response) => {
    const roomId = req.body.room_id;
    const targetUserId = req.body.target_user_id;
    const authUser = (req as any).authUser;

    const obj = {
        room_id: roomId,
        target_user_id: targetUserId,
        caller: authUser
    };

    (global as any).chat.emit(`newCallRequest.${targetUserId}`, obj);
    res.status(200).json({
        success: true,
        message: 'Outgoing call',
        ...obj
    });
};

router.get('/conversation/:userId', auth, findConversation);
router.get('/conversations/:userId', auth, getConversations);
router.post('/conversation', auth, createConversation);
router.get('/messages/:conversationId', auth, getMessages);
router.post('/message', auth, sendMessage);
router.get('/users', auth, getUsers);
router.post('/call-request', auth, callRequest);

export default router;
