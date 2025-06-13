const joi = require('joi');

module.exports = joi.object({
    start_time: joi.date().iso().required(),
    end_time: joi.date().iso().greater(joi.ref('start_time')).required(),
});
