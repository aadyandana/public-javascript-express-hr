const BaseResponse = require('../utils/responses')
const BaseError = require('../utils/errors')

const userLogin = require('../services/users.login');
const userReadOne = require('../services/users.read.one');

const UserLoginController = async (req, res) => {
    try {
        const userToken = await userLogin(req.body);

        res.json(new BaseResponse({
            message: 'Login successful',
            data: userToken,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

const UserReadOneController = async (req, res) => {
    try {
        const user = await userReadOne({ id: req.user.id }, true);

        res.json(new BaseResponse({
            message: 'Read user detail successful',
            data: user,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

module.exports = { UserLoginController, UserReadOneController }
