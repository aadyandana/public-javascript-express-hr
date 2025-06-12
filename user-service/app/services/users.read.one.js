const { StatusCodes } = require('http-status-codes');

const BaseError = require('../utils/errors');
const User = require('../models/user');

const userReadOne = async (body, isRequired = false) => {
    const { username } = body;

    const user = await User.findOne({
        where: {
            username: username
        },
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
