const express = require('express');
const router = express.Router();

const userRoutes = require('./users.route');

router.get('/', (req, res) => {
    res.json({ version: '0.0.1' });
});

router.use('/users', userRoutes);

module.exports = router;
