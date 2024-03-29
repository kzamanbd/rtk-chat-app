import { Request, Response } from 'express';
import expressWinston from 'express-winston';
import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

const logFormat = format.printf(
    ({ level, message, timestamp, stack }: any) => `${timestamp}: ${level} - ${stack || message}`
);
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    verbose: 'cyan',
    debug: 'white'
};

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize({ colors }),
        format.timestamp({ format: 'DD/MM/YYYY || HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [new transports.Console()]
});

const MONGO_URI: string = process.env.MONGO_URI || 'http://localhost:27017';
console.log(MONGO_URI);

const mongoTransport = new transports.MongoDB({
    db: 'mongodb+srv://kzaman:16724245@cluster0.t00ijp0.mongodb.net',
    metaKey: 'meta',
    collection: 'logs',
    tryReconnect: true,
    options: {
        useUnifiedTopology: true
    }
});

// eslint-disable-next-line no-unused-vars
const getLogMessage = (req: Request, res: Response) => {
    const msgObj = {
        request: req.body,
        correlationId: req.headers['x-correlation-id']
    };

    return JSON.stringify(msgObj);
};

export const infoLogger = expressWinston.logger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.cli({ colors })),
            handleExceptions: true
        })
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: false,
    msg: getLogMessage
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.cli({ colors })),
            handleExceptions: true
        }),
        mongoTransport
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error" : "{{err.message}}" }'
});
