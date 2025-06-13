const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../middlewares/authentication');
const {
    AttendanceCreateOrUpdateController,
    AttendancePayController,
} = require('../controllers/attendances.controller');

router.post('', [authenticateToken], AttendanceCreateOrUpdateController);
router.patch('/pay', [authenticateToken], AttendancePayController);

module.exports = router;
