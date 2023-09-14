import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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

export default mongoose.model('User', userSchema);
