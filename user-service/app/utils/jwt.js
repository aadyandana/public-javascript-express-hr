/* eslint-disable no-undef */
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const BaseError = require('../utils/errors')

const generateToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token)
            throw new BaseError({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'Token not found',
            })

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                throw new BaseError({
                    statusCode: StatusCodes.UNAUTHORIZED,
                    message: 'Invalid token',
                })

            req.user = user;

            next();
        });
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        return res.status(statusCode).json(response);
    }
}

module.exports = { generateToken, authenticateToken }
