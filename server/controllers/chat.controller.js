// import dependencies
const express = require('express');
const { Conversation, Message, User } = require('../models');
const { cookieAuth: auth } = require('../middleware/authenticate');

const router = express.Router();

const getPartnerInfo = (conversation, userId) => {
    const partner =
        conversation.toUser._id.toString() === userId.toString() ? conversation.fromUser : conversation.toUser;
    return partner;
};

// find existing conversation
const findConversation = async (req, res) => {
    const { userId } = req.params;
    try {
        const conversation = await Conversation.findOne({
            $or: [
                { toUser: userId, fromUser: req.authUser._id },
                { toUser: req.authUser._id, fromUser: userId }
            ]
        });
        if (conversation) {
            res.status(200).json({
                success: true,
                conversation: {
                    ...conversation._doc,
                    partnerInfo: getPartnerInfo(conversation, req.authUser._id)
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No conversation found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// if not create new conversation
const createConversation = async (req, res) => {
    const { userId, message } = req.body;
    try {
        const existsConversation = await Conversation.findOne({
            $or: [
                { toUser: userId, fromUser: req.authUser._id },
                { toUser: req.authUser._id, fromUser: userId }
            ]
        });

        if (!existsConversation) {
            const newConversation = new Conversation({
                toUser: userId,
                fromUser: req.authUser._id
            });
            const savedConversation = await newConversation.save();

            if (savedConversation) {
                // save message
                const newMessage = new Message({
                    userInfo: req.authUser._id,
                    conversationId: savedConversation._id,
                    message
                });
                await newMessage.save();

                // if conversation update last message
                savedConversation.lastMessage = message;
                await savedConversation.save();

                // populate conversation toUser and fromUser
                const populatedData = await Conversation.findOne({ _id: savedConversation._id })
                    .populate('toUser', 'name avatar')
                    .populate('fromUser', 'name avatar')
                    .exec();

                // target conversation to user
                const targetUser = getPartnerInfo(populatedData, req.authUser._id);

                const conversation = {
                    ...populatedData._doc,
                    partnerInfo: targetUser
                };

                global.chat.emit(`conversation.${targetUser._id}`, conversation);

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// send message
const sendMessage = async (req, res) => {
    const { message, conversationId } = req.body;
    try {
        const conversation = await Conversation.findOne({ _id: conversationId })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .exec();

        if (conversation) {
            // save message
            const newMessage = new Message({
                userInfo: req.authUser._id,
                conversationId: conversation._id,
                message
            });

            await newMessage.save();

            // if conversation update last message
            conversation.lastMessage = message;
            await conversation.save();

            const targetUser = getPartnerInfo(conversation, req.authUser._id);

            global.chat.emit(`conversation.${targetUser._id}`, {
                ...conversation._doc,
                partnerInfo: targetUser
            });

            const userInfo = {
                _id: req.authUser._id,
                name: req.authUser.name
            };

            const messageData = {
                ...newMessage._doc,
                userInfo
            };

            global.chat.emit(`newMessage.${conversationId}`, messageData);

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// get conversations
const getConversations = async (req, res) => {
    const { userId } = req.params;
    try {
        const docs = await Conversation.find({ $or: [{ toUser: userId }, { fromUser: userId }] })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .sort('-updatedAt')
            .exec();

        const conversations = docs.map((conversation) => ({
            ...conversation._doc,
            partnerInfo: getPartnerInfo(conversation, req.authUser._id)
        }));

        res.status(200).json({
            success: true,
            conversations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// get messages
const getMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        // find conversation
        const conversation = await Conversation.findOne({ _id: conversationId })
            .populate('toUser', 'name avatar')
            .populate('fromUser', 'name avatar')
            .exec();

        const chatHead = getPartnerInfo(conversation, req.authUser._id);

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
            message: 'Internal server error',
            error: error.message
        });
    }
};

// get users to start conversation
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.authUser._id } });

        // get all conversations
        const conversations = await Conversation.find({
            $or: [{ toUser: req.authUser._id }, { fromUser: req.authUser._id }]
        });
        // filter users who have conversation with current user
        const filteredUsers = users.map((user) => {
            const found = conversations.find((item) => {
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
            message: 'Internal server error',
            error: error.message
        });
    }
};

router.get('/conversation/:userId', auth, findConversation);
router.get('/conversations/:userId', auth, getConversations);
router.post('/conversation', auth, createConversation);
router.get('/messages/:conversationId', auth, getMessages);
router.post('/message', auth, sendMessage);
router.get('/users', auth, getUsers);

module.exports = router;
