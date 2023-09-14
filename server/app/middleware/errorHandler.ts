import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

import { GeneralError } from '../utils/AppError';

// request handler
export const requestHandler = (req: Request, res: Response, next: NextFunction) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = uuidV4();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);
    return next();
};

// global error handler
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const correlationId = req.headers['x-correlation-id'];
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
    }
    return res.status(code).json({
        correlationId,
        message: err.message
    });
};
