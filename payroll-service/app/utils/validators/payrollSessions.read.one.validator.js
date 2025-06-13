const joi = require('joi');

module.exports = joi.object({
    id: joi.string().guid({ version: 'uuidv4' }),
});
