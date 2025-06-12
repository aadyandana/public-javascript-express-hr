const User = require('../models/user');

const userRead = async () => {
    return await User.findAll();
}

module.exports = userRead;
