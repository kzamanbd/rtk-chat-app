import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    emailVerifiedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        avatar: String,
        emailVerifiedAt: Date
    },
    {
        timestamps: true
    }
);
// hide password field
userSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }, options) => rest
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
