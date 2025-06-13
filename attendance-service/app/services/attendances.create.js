const { StatusCodes } = require('http-status-codes');

const db = require('../models');
const validator = require('../utils/validators');
const schema = require('../utils/validators/attendances.create.validator');
const convert = require('../utils/dtos/attendances.dto');

const BaseError = require('../utils/errors');
const Attendance = require('../models/attendance');

const attendanceCreate = async (userId, body) => {
    const validatedBody = validator(schema, body);
    const { date, start_time: startTime } = validatedBody.value;

    const transaction = await db.transaction();
    try {
        const newAttendance = await Attendance.create({
            user_id: userId,
            date: date,
            start_time: startTime,
        }, { transaction: transaction });

        await transaction.commit();

        return convert(newAttendance);
    } catch (err) {
        await transaction.rollback();

        throw new BaseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err.message || 'Attendance create failed',
        });
    }
}

module.exports = attendanceCreate;
