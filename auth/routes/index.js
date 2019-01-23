var express = require('express');
var router = express.Router();

router.use('/login', require('./api/auth/login'));

module.exports = router;
