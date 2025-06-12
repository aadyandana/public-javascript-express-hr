const { Router } = require('express');
const router = Router();

const { UserGetAllController } = require('../controllers/users.controller');

router.get('', UserGetAllController);

module.exports = router;
