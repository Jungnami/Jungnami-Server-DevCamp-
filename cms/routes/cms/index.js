var express = require('express');
var router = express.Router();

router.use('/like', require('./like'));
router.use('/article', require('./article'));
router.use('/reply', require('./reply'));

module.exports = router;
