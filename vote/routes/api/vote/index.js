var express = require('express');
var router = express.Router();

router.use('/result', require('./result'));
router.use('/', require('./vote'));

module.exports = router;
