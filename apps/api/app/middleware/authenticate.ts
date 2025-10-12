import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const cookieAuth = (req: Request, res: Response, next: NextFunction) => {
    const cookies: any = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        try {
            const cookieSecret: string = process.env.COOKIE_NAME || '';
            const token = cookies[cookieSecret];
            const jwtSecret: string = process.env.JWT_SECRET || '';
            const decoded = jwt.verify(token, jwtSecret);
            (req as any)['authUser'] = decoded;
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'Authentication failure!',
                error: err
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Authentication failure!'
        });
    }
};

export const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        const splitToken = authorization.split(' ');
        try {
            const token = splitToken[1];
            const jwtSecret: string = process.env.JWT_SECRET || '';
            const decoded = jwt.verify(token, jwtSecret);
            (req as any)['authUser'] = decoded;
            next();
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'Authentication failure!'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Authorization token required!'
        });
    }
};
