const { StatusCodes } = require('http-status-codes');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/attendances.update.validator');
const convert = require('../utils/dtos/attendances.dto');

const BaseError = require('../utils/errors');
const Attendance = require('../models/attendance');

const attendanceUpdate = async (userId, id, body) => {
    const validatedBody = validator(schema, body);
    const { end_time: endTime } = validatedBody.value;

    const transaction = await db.transaction();
    try {
        const [ , affectedRows ] = await Attendance.update({
            end_time: endTime,
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
            message: err.message || 'Attendance create failed',
        });
    }
}

module.exports = attendanceUpdate;
