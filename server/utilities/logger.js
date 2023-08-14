require('winston-mongodb');
const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');

const logFormat = format.printf(
    ({ level, message, timestamp, stack }) => `${timestamp}: ${level} - ${stack || message}`
);
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    verbose: 'cyan',
    debug: 'white'
};

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize({ colors }),
        format.timestamp({ format: 'DD/MM/YYYY || HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [new transports.Console()]
});

const mongoErrorTransport = new transports.MongoDB({
    db: process.env.MONGO_URI,
    metaKey: 'meta',
    collection: 'logs'
});

// eslint-disable-next-line no-unused-vars
const getLogMessage = (req, res) => {
    const msgObj = {
        request: req.body,
        correlationId: req.headers['x-correlation-id']
    };

    return JSON.stringify(msgObj);
};

const infoLogger = expressWinston.logger({
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

const errorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.cli({ colors })),
            handleExceptions: true
        }),
        mongoErrorTransport
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error" : "{{err.message}}" }',
    correlationId: "{{req.headers['x-correlation-id']}}"
});

module.exports = {
    logger,
    infoLogger,
    errorLogger
};
