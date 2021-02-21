
class ErrorHanlder extends Error {
    constructor(message, statusCode) {
        super(message);
        this.stausCode = statusCode

        Error.stackTraceLimit(this, this.constructor)
    }
};

module.exports = ErrorHanlder;