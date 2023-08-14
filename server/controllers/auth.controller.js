const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const nodemailer = require('nodemailer');
const { User } = require('../models');
const { BadRequest } = require('../utilities/errors');

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

const login = async (req, res, next) => {
    try {
        // find a user who has this email/username
        const { username, password } = req.body;
        const user = await User.findOne({
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
                const accessToken = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                // set cookie
                res.cookie(process.env.COOKIE_NAME, accessToken, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: !process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    signed: true,
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
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
        return next(err, req, res);
    }
};

const register = async (req, res, next) => {
    const { name, email, password, withLogin } = req.body;
    if (!name || !email || !password) {
        return next(new BadRequest('Name and email are required!', 422), req, res);
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

                // generate token
                const accessToken = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                });

                // set cookie
                res.cookie(process.env.COOKIE_NAME, accessToken, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: !process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                    signed: true,
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
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
            return next(err, req, res);
        }
    } else {
        return next(new BadRequest('User already exists!', 422), req, res);
    }
};

router.post('/login', login);
router.post('/register', register);

module.exports = router;
