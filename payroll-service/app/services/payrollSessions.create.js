const { StatusCodes } = require('http-status-codes');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/payrollSessions.create.validator');
const convert = require('../utils/dtos/payrollSessions.dto');

const BaseError = require('../utils/errors');
const PayrollSession = require('../models/payrollSession');

const payrollSessionCreate = async (userId, body) => {
    const validatedBody = validator(schema, body);
    const { start_date: startDate, end_date: endDate } = validatedBody.value;

    const transaction = await db.transaction();
    try {
        const newPayrollSession = await PayrollSession.create({
            start_date: startDate,
            end_date: endDate,
            created_by: userId,
            updated_by: userId,
        }, { transaction: transaction });

        await transaction.commit();

        return convert(newPayrollSession);
    } catch (err) {
        await transaction.rollback();

        throw new BaseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message || 'Payroll session create failed',
        });
    }
}

module.exports = payrollSessionCreate;
