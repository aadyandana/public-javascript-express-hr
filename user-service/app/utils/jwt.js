/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

module.exports = { generateToken }
