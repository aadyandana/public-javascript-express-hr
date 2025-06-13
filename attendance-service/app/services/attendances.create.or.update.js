const { StatusCodes } = require('http-status-codes');

const validator = require('../utils/validators');
const schema = require('../utils/validators/attendances.create.or.update.validator');

const BaseError = require('../utils/errors');
const attendanceReadOne = require('./attendances.read.one');
const attendanceCreate = require('./attendances.create');
const attendanceUpdate = require('./attendances.update');

const attendanceCreateOrUpdate = async (user, body) => {
    const validatedBody = validator(schema, body);
    const userId = user.id;
    const { date } = validatedBody.value;

    let attendance = await attendanceReadOne({
        user_id: userId,
        date,
        end_time: null
    });

    if (attendance) {
        const { end_time: endTime } = validatedBody.value;

        if (!endTime)
            throw new BaseError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'There\'s active attendance, end it before start another attendance',
            });

        attendance = attendanceUpdate(user.id, attendance.id, { end_time: endTime });
    } else {
        const { start_time: startTime } = validatedBody.value;

        if (!startTime)
            throw new BaseError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'Need start time to create new attendance',
            });

        attendance = attendanceCreate(user.id, { date, start_time: startTime });
    }

    return attendance;
}

module.exports = attendanceCreateOrUpdate;
