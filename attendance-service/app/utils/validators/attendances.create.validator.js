const joi = require('joi');

module.exports = joi.object({
    date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    start_time: joi.date().iso().required(),
});
