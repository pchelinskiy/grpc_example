const {StatusCodes} = require('http-status-codes');

class CustomError extends Error {
    constructor(code) {
        const message = StatusCodes[code] || "UNEXPECTED_ERROR";
        super(message);
        this.code = code;
    }
}

module.exports = CustomError;