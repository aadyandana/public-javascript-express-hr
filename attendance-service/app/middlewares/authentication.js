/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

const BaseError = require('../utils/errors');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token)
            throw new BaseError({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'Token not found',
            })

        await axios.get(`${process.env.USER_SERVICE_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(function(response) {
            const responseData = response.data;

            if (!responseData?.status)
                throw new BaseError({
                    statusCode: StatusCodes.UNAUTHORIZED,
                    message: 'User not found',
                })

            req.user = responseData.data;

            next();
        })
        .catch(function(err) {
            throw new BaseError({
                statusCode: err?.status || StatusCodes.UNAUTHORIZED,
                message: err?.response?.data?.message || err?.message || 'Cannot fetch user',
            })
        });
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        return res.status(statusCode).json(response);
    }
}

module.exports = { authenticateToken }
