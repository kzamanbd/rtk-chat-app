const GeneralError = require('./GeneralError');

class BadRequest extends GeneralError {
    constructor(message, code) {
        super(message);
        this.name = 'BadRequest';
        this.code = code;
    }

    getCode() {
        return this.code || 400;
    }
}

module.exports = BadRequest;
