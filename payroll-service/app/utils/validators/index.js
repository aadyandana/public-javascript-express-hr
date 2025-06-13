const { StatusCodes } = require('http-status-codes');

const BaseError = require('../errors');

const validate = (schema, body) => {
    const validatedBody = schema.validate(body);

    if (validatedBody.error) {
        const message = validatedBody?.error?.details[0]?.message || 'Bad Request';

        throw new BaseError({
            statusCode: StatusCodes.BAD_REQUEST,
            message: message,
        })
    }

    return validatedBody;
}

module.exports = validate;
