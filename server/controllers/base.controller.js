const express = require('express');
const { cookieAuth: auth } = require('../middleware/authenticate');

const router = express.Router();

// do logout
const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.json({
        message: 'Logout successful!',
        success: true
    });
};

// get current user
const refreshToken = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Current user',
        user: req.authUser
    });
};

router.get('/refresh-token', auth, refreshToken);
router.get('/logout', auth, logout);

module.exports = router;
