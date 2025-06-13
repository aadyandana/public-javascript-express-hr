const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../middlewares/authentication');
const { AttendanceCreateOrUpdateController } = require('../controllers/attendances.controller');

router.post('', [authenticateToken], AttendanceCreateOrUpdateController);

module.exports = router;
