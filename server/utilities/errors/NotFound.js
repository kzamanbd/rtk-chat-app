const GeneralError = require('./GeneralError');

class NotFound extends GeneralError {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }

    getCode() {
        return 404;
    }
}

module.exports = NotFound;
