const BaseResponse = require('../utils/responses')
const BaseError = require('../utils/errors')

const userLogin = require('../services/users.login');
const userRead = require('../services/users.read');

const UserLoginController = async (req, res) => {
    try {
        const userToken = await userLogin(req.body);

        res.json(new BaseResponse({
            message: 'Login successfully',
            data: userToken,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

const UserReadAllController = async (req, res) => {
    try {
        const users = await userRead();

        res.json(new BaseResponse({
            message: 'Read users successfully',
            data: users,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

module.exports = { UserLoginController, UserReadAllController }
