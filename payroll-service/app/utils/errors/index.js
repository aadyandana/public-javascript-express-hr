const BaseResponse = require('../responses')

class BaseError extends Error {
    statusCode;
    response;

    constructor(param) {
        super(param?.message);

        this.statusCode = param?.statusCode || 500;
        this.response = new BaseResponse({
            status: false,
            message: param?.message || 'Internal Server Error',
        });
    }
}

module.exports = BaseError;
