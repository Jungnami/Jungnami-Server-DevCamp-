var express = require('express');
var router = express.Router();

router.use('/admin', require('./admin/index'))
router.use('/cms', require('./cms/index'))

module.exports = router;
