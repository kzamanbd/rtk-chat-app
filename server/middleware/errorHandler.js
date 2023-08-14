const { v4: uuidV4 } = require('uuid');
const { GeneralError } = require('../utilities/errors');
// module scaffolding
const handler = {};

// request handler
handler.requestHandler = (req, res, next) => {
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
handler.errorHandler = (err, req, res, next) => {
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

module.exports = handler;
