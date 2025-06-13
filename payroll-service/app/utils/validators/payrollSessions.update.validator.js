const joi = require('joi');

module.exports = joi.object({
    status: joi.number().required(),
});
