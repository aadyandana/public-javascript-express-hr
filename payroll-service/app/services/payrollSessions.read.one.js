const { StatusCodes } = require('http-status-codes');

const validator = require('../utils/validators');
const schema = require('../utils/validators/payrollSessions.read.one.validator');
const convert = require('../utils/dtos/payrollSessions.dto');

const BaseError = require('../utils/errors');
const PayrollSession = require('../models/payrollSession');

const payrollSessionReadOne = async (body, isRequired = false) => {
    const validatedBody = validator(schema, body);

    const payrollSession = await PayrollSession.findOne({
        where: validatedBody.value,
    });

    if (isRequired)
        if (!payrollSession)
            throw new BaseError({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Payroll session not found',
            })

    return convert(payrollSession);
}

module.exports = payrollSessionReadOne;
