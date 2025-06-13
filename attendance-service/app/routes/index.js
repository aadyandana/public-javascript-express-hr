const express = require('express');
const router = express.Router();

const userRoutes = require('./attendances.route');

router.get('/', (req, res) => {
    res.json({ version: '0.0.1' });
});

router.use('/attendances', userRoutes);

module.exports = router;
