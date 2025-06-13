const joi = require('joi');

module.exports = joi.object({
    user_id: joi.string().guid({ version: 'uuidv4' }),
    date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    end_time: joi.date().iso().allow(null),
});
