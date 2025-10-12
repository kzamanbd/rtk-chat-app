import mongoose from 'mongoose';
import { IUser } from './user';

export interface IConversation extends mongoose.Document {
    toUser: IUser;
    fromUser: IUser;
    lastMessage: string;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new mongoose.Schema<IConversation>(
    {
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        lastMessage: String
    },
    {
        timestamps: true
    }
);
const Conversation: mongoose.Model<IConversation> = mongoose.model('Conversation', schema);

export default Conversation;
