var express = require('express');
var router = express.Router();

router.use('/vote', require('./api/vote/index'));

module.exports = router;