const PayrollSession = require('../models/payrollSession');

const payrollSessionRead = async () => {
    return PayrollSession.findAll();
}

module.exports = payrollSessionRead;
