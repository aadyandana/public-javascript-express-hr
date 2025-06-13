const joi = require('joi');

module.exports = joi.object({
    end_time: joi.date().iso().optional(),
});
