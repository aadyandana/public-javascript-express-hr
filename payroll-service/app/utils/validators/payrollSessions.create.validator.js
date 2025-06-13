const joi = require('joi');

module.exports = joi.object({
    start_date: joi.date().required(),
    end_date: joi.date().required(),
});
