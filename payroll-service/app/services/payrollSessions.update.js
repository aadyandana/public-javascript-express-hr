const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/payrollSessions.update.validator');
const convert = require('../utils/dtos/payrollSessions.dto');

const PAYROLL_SESSION_STATUS_CODE = require('../utils/enums/PayrollSessionStatusCode');
const BaseError = require('../utils/errors');
const PayrollSession = require('../models/payrollSession');

const payrollSessionUpdate = async (token, userId, id, body) => {
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

        const payrollSession = affectedRows[0];

        if (status == PAYROLL_SESSION_STATUS_CODE.PAID) {
            payAttendance(token, payrollSession);
        }

        await transaction.commit();

        return convert(payrollSession);
    } catch (err) {
        await transaction.rollback();

        throw new BaseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message || 'Payroll service create failed',
        });
    }
}

const payAttendance = async (token, payrollSession) => {
    await axios.patch(`${process.env.ATTENDANCE_SERVICE_URL}/attendances/pay`, {
        payroll_session_id: payrollSession.id,
        start_date: payrollSession.start_date,
        end_date: payrollSession.end_date,
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(function(response) {
        const responseData = response.data;

        if (!responseData?.status)
            throw new BaseError({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'User not found',
            })
    })
    .catch(function(err) {
        console.log(err);
        throw new BaseError({
            statusCode: err?.status || StatusCodes.UNAUTHORIZED,
            message: err?.response?.data?.message || err?.message || 'Cannot fetch user',
        })
    });
}

module.exports = payrollSessionUpdate;
