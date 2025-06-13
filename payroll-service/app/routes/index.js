const express = require('express');
const router = express.Router();

const payrollSessionRoutes = require('./payrollSessions.route');

router.get('/', (req, res) => {
    res.json({ version: '0.0.1' });
});

router.use('/payroll_sessions', payrollSessionRoutes);

module.exports = router;
