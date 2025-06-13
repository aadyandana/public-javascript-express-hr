const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../middlewares/authentication');
const {
    AttendanceCreateOrUpdateController,
    AttendanceReadActiveController,
    AttendancePayController,
} = require('../controllers/attendances.controller');

router.post('', [authenticateToken], AttendanceCreateOrUpdateController);
router.get('/active', [authenticateToken], AttendanceReadActiveController);
router.patch('/pay', [authenticateToken], AttendancePayController);

module.exports = router;
