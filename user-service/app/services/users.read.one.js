const { StatusCodes } = require('http-status-codes');

const BaseError = require('../utils/errors');
const User = require('../models/user');

const userReadOne = async (body, isRequired = false) => {
    const user = await User.findOne({
        where: body,
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
