const { StatusCodes } = require('http-status-codes');

const BaseResponse = require('../utils/responses')
const BaseError = require('../utils/errors')

const payrollSessionCreate = require('../services/payrollSessions.create');
const payrollSessionRead = require('../services/payrollSessions.read');
const payrollSessionReadOne = require('../services/payrollSessions.read.one');
const payrollSessionUpdate = require('../services/payrollSessions.update');

const PayrollSessionCreateController = async (req, res) => {
    try {
        const payrollSession = await payrollSessionCreate(req.user.id, req.body);

        res.status(StatusCodes.CREATED).json(new BaseResponse({
            message: 'Create payroll session successful',
            data: payrollSession,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError({ message: err.message }).response;

        res.status(statusCode).json(response);
    }
}

const PayrollSessionReadController = async (req, res) => {
    try {
        const payrollSessions = await payrollSessionRead();

        res.json(new BaseResponse({
            message: 'Read payroll sessions successful',
            data: payrollSessions,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError({ message: err.message }).response;

        res.status(statusCode).json(response);
    }
}

const PayrollSessionReadOneController = async (req, res) => {
    try {
        const payrollSession = await payrollSessionReadOne(req.params);

        res.json(new BaseResponse({
            message: 'Read payroll session detail successful',
            data: payrollSession,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError({ message: err.message }).response;

        res.status(statusCode).json(response);
    }
}

const PayrollSessionUpdateController = async (req, res) => {
    try {
        const payrollSession = await payrollSessionUpdate(req.user.id, req.params.id, req.body);

        res.json(new BaseResponse({
            message: 'Update payroll session successful',
            data: payrollSession,
        }));
    } catch (err) {
        const statusCode = err?.statusCode || 500;
        const response = err?.response || new BaseError({ message: err.message }).response;

        res.status(statusCode).json(response);
    }
}

module.exports = {
    PayrollSessionCreateController,
    PayrollSessionReadController,
    PayrollSessionReadOneController,
    PayrollSessionUpdateController,
}
