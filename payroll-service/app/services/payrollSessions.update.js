const { StatusCodes } = require('http-status-codes');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/payrollSessions.update.validator');
const convert = require('../utils/dtos/payrollSessions.dto');

const BaseError = require('../utils/errors');
const PayrollSession = require('../models/payrollSession');

const payrollSessionUpdate = async (userId, id, body) => {
    const validatedBody = validator(schema, body);
    const { status } = validatedBody.value;

    const transaction = await db.transaction();
    try {
        const [ , affectedRows ] = await PayrollSession.update({
            status,
            updated_by: userId,
        }, {
            where: { id },
            returning: true,
        }, { transaction: transaction });

        await transaction.commit();

        return convert(affectedRows[0]);
    } catch (err) {
        await transaction.rollback();

        throw new BaseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message || 'Payroll service create failed',
        });
    }
}

module.exports = payrollSessionUpdate;
