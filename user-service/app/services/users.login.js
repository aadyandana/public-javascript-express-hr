const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const validator = require('../utils/validators');
const schema = require('../utils/validators/users.login.validator');
const convert = require('../utils/dtos/users.dto');

const BaseError = require('../utils/errors');
const userReadOne = require('./users.read.one');
const { generateToken } = require('../utils/jwt');

const userLogin = async (body) => {
    const validatedBody = validator(schema, body)
    const { username, password } = validatedBody.value;

    const user = await userReadOne({ username }, true);

    matchPassword(password, user.password)

    const userDto = convert(user)

    return {
        user: userDto,
        token: await generateToken(userDto),
    }
}

const matchPassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid)
        throw new BaseError({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'User password wrong',
            })
}

module.exports = userLogin;
