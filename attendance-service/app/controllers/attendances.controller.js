const { StatusCodes } = require('http-status-codes');

const BaseResponse = require('../utils/responses')
const BaseError = require('../utils/errors')

const attendanceCreateOrUpdate = require('../services/attendances.create.or.update');

const AttendanceCreateOrUpdateController = async (req, res) => {
    try {
        const attendance = await attendanceCreateOrUpdate(req.user, req.body);

        res.status(StatusCodes.CREATED).json(new BaseResponse({
            message: 'Create or update attendance successful',
            data: attendance,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError({ message: err.message }).response;

        res.status(statusCode).json(response);
    }
}

module.exports = { AttendanceCreateOrUpdateController }
