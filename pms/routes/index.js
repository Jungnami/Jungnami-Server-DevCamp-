const express = require('express');
const router = express.Router();

router.use('/ranking', require('./api/politician/ranking'));
router.use('/legislator', require('./api/politician/legislator'));

router.use('/admin', require('./admin/update'));

module.exports = router;