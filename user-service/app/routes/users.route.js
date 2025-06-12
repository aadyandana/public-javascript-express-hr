const { Router } = require('express');
const router = Router();

const { authenticateToken } = require('../middlewares/authentication');
const { UserLoginController, UserReadOneController } = require('../controllers/users.controller');

router.post('/login', UserLoginController);
router.get('', [authenticateToken], UserReadOneController);

module.exports = router;
