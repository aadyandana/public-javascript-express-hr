const joi = require('joi');

module.exports = joi.object({
    payroll_session_id: joi.string().guid({ version: 'uuidv4' }).required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
});
