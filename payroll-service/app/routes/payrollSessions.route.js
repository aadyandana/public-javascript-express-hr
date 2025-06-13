const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../middlewares/authentication');
const {
    PayrollSessionCreateController,
    PayrollSessionReadController,
    PayrollSessionReadOneController,
    PayrollSessionUpdateController,
} = require('../controllers/payrollSessions.controller');

router.post('', [authenticateToken], PayrollSessionCreateController);
router.get('', [authenticateToken], PayrollSessionReadController);
router.get('/:id', [authenticateToken], PayrollSessionReadOneController);
router.patch('/:id', [authenticateToken], PayrollSessionUpdateController);

module.exports = router;
