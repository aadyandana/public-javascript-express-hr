const { StatusCodes } = require('http-status-codes');

const BaseResponse = require('../utils/responses')
const BaseError = require('../utils/errors')

const attendanceCreateOrUpdate = require('../services/attendances.create.or.update');
const attendanceReadOne = require('../services/attendances.read.one');
const attendancePay = require('../services/attendances.pay');

const AttendanceCreateOrUpdateController = async (req, res) => {
    try {
        const attendance = await attendanceCreateOrUpdate(req.user, req.body);

        res.status(StatusCodes.CREATED).json(new BaseResponse({
            message: 'Create or update attendance successful',
            data: attendance,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

const AttendanceReadActiveController = async (req, res) => {
    try {
        const attendance = await attendanceReadOne({
            user_id: req.user.id,
            ...req.query,
            end_time: null,
        });

        res.json(new BaseResponse({
            message: 'Read attendance detail successful',
            data: attendance,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}

const AttendancePayController = async (req, res) => {
    try {
        const attendance = await attendancePay(req.user.id, req.body);

        res.json(new BaseResponse({
            message: 'Attendances payment successful',
            data: attendance,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError().response;

        res.status(statusCode).json(response);
    }
}



module.exports = {
    AttendanceCreateOrUpdateController,
    AttendanceReadActiveController,
    AttendancePayController
}
