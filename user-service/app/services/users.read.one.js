const { StatusCodes } = require('http-status-codes');

const validator = require('../utils/validators');
const schema = require('../utils/validators/users.read.one.validator');

const BaseError = require('../utils/errors');
const User = require('../models/user');

const userReadOne = async (body, isRequired = false) => {
const validatedBody = validator(schema, body);

    const user = await User.findOne({
        where: validatedBody.value,
    });

    if (isRequired)
        if (!user)
            throw new BaseError({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            })

    return user;
}

module.exports = userReadOne;
