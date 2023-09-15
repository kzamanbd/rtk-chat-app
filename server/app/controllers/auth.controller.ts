import bcrypt from 'bcrypt';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user';
import { BadRequest } from './../utils/AppError';

// node mailer
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '7b9fce5df6dcb0',
        pass: '6be66697f21486'
    }
});

const router = express.Router();

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // find a user who has this email/username
        const { username, password } = req.body;
        const user: any = await User.findOne({
            $or: [{ email: username }, { username }]
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                // prepare the user object to generate token
                const userObject = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    avatar: null
                };

                // generate token
                const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
                const accessToken = jwt.sign(userObject, JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                // set cookie
                const COOKIE_NAME: string = process.env.COOKIE_NAME || 'token';
                const JWT_EXPIRY: any = process.env.JWT_EXPIRY || '1d';
                const httpOnly: boolean = process.env.NODE_ENV !== 'production';
                const sameSite: any = process.env.NODE_ENV === 'production' ? 'None' : 'Lax';

                res.cookie(COOKIE_NAME, accessToken, {
                    maxAge: JWT_EXPIRY,
                    httpOnly: httpOnly,
                    secure: !httpOnly,
                    signed: true,
                    sameSite: sameSite
                });

                res.status(200).json({
                    message: 'Login successful!',
                    user: userObject,
                    token: accessToken
                });
            } else {
                throw new BadRequest('Invalid credentials!', 401);
            }
        } else {
            throw new BadRequest('Invalid credentials!', 401);
        }
    } catch (err) {
        return next(err);
    }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, withLogin } = req.body;
    if (!name || !email || !password) {
        return next(new BadRequest('Name and email are required!', 422));
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: encryptedPassword
        };
        try {
            const user = await User.create(userData);
            // send email
            const mailOptions = {
                from: '"Fred Foo 👻" kzamanbn@gmail.com',
                to: email,
                subject: 'Welcome to the app!',
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>'
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(`Error occurred. ${err.message}`);
                } else {
                    console.log(info);
                }
            });

            if (withLogin) {
                const userObject = {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    avatar: null
                };

                const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

                // generate token
                const accessToken = jwt.sign(userObject, JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                // set cookie
                const COOKIE_NAME: string = process.env.COOKIE_NAME || 'token';
                const JWT_EXPIRY: any = process.env.JWT_EXPIRY || '1d';
                const httpOnly: boolean = process.env.NODE_ENV !== 'production';
                const sameSite: any = process.env.NODE_ENV === 'production' ? 'None' : 'Lax';

                res.cookie(COOKIE_NAME, accessToken, {
                    maxAge: JWT_EXPIRY,
                    httpOnly: httpOnly,
                    secure: !httpOnly,
                    signed: true,
                    sameSite: sameSite
                });

                res.status(200).json({
                    message: 'Registration successful!',
                    user: userObject,
                    token: accessToken
                });
            } else {
                res.status(201).json({
                    data: user,
                    message: 'User created successfully!'
                });
            }
        } catch (err) {
            return next(err);
        }
    } else {
        return next(new BadRequest('User already exists!', 422));
    }
};

router.post('/login', login);
router.post('/register', register);

export default router;
