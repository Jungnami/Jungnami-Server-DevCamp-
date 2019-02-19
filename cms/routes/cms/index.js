var express = require('express');
var router = express.Router();

router.use('/like', require('./like'));
router.use('/reply', require('./reply'));

module.exports = router;
