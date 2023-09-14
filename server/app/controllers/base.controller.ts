import express, { Request, Response } from 'express';
import { cookieAuth as auth } from '../middleware/authenticate';

const router = express.Router();

// do logout
const logout = (req: Request, res: Response) => {
    const cookieName: string = process.env.COOKIE_NAME || 'token';
    res.clearCookie(cookieName);
    res.json({
        message: 'Logout successful!',
        success: true
    });
};

// get current user
const refreshToken = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Current user',
        user: (req as any).authUser
    });
};

router.get('/refresh-token', auth, refreshToken);
router.get('/logout', auth, logout);

export default router;
