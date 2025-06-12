const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../utils/jwt');
const { UserLoginController, UserReadAllController } = require('../controllers/users.controller');

router.post('/login', UserLoginController);
router.get('', [authenticateToken], UserReadAllController);

module.exports = router;
