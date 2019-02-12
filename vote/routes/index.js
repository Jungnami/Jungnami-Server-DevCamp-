var express = require('express');
var router = express.Router();

router.use('/admin', require('./api/admin/index'));
router.use('/vote', require('./api/vote/index'));

module.exports = router;