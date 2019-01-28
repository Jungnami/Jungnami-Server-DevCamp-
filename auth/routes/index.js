var express = require('express');
var router = express.Router();

router.use('/auth', require('./api/auth/index'));
router.use('/user', require('./api/user/index'));

module.exports = router;
