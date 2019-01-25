var express = require('express');
var router = express.Router();

router.use('/admin', require('./admin'));
router.use('/mypage', require('./mypage'));

module.exports = router;