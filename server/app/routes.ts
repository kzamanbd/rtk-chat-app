import express, { Request, Response } from 'express';

import authRoutes from './controllers/auth.controller';
import baseRoutes from './controllers/base.controller';
import chatRoutes from './controllers/chat.controller';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        title: 'Express Testing',
        message: 'The app is working properly!',
        users: `${req.protocol}://${req.get('host')}${req.originalUrl}users`,
        frontend: 'https://rtk-chat-app-cyan.vercel.app'
    });
});

router.use('/api', baseRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/chat', chatRoutes);

export default router;
