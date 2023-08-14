const express = require('express');

const router = express.Router();

const authRoutes = require('./controllers/auth.controller');
const chatRoutes = require('./controllers/chat.controller');
const baseRoutes = require('./controllers/base.controller');

router.get('/', async (req, res) => {
    res.status(200).json({
        title: 'Express Testing',
        message: 'The app is working properly!',
        users: `${req.protocol}://${req.get('host')}${req.originalUrl}users`
    });
});

router.use('/api', baseRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/chat', chatRoutes);

module.exports = router;
