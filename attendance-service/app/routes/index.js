const express = require('express');
const router = express.Router();

const attendanceRoutes = require('./attendances.route');

router.get('/', (req, res) => {
    res.json({ version: '0.0.1' });
});

router.use('/attendances', attendanceRoutes);

module.exports = router;
