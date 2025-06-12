const User = require('../models/user');

const Read = async () => {
    return await User.findAll();
}

module.exports = Read;
