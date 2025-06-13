const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/attendances.pay.validator');

const BaseError = require('../utils/errors');
const Attendance = require('../models/attendance');

const attendancePay = async (adminId, body) => {
    const validatedBody = validator(schema, body);
    const { start_date: startDate, end_date: endDate } = validatedBody.value;

    const transaction = await db.transaction();
    try {
        const [ affectedCount ] = await Attendance.update({
            paid: true,
            updated_by: adminId,
        }, {
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
                paid: false,
            },
        }, { transaction: transaction });

        await transaction.commit();

        return { affectedCount: affectedCount };
    } catch (err) {
        await transaction.rollback();

        throw new BaseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message || 'Attendances payment failed',
        });
    }
}

module.exports = attendancePay;
