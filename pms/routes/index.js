const express = require('express');
const router = express.Router();

router.use('/list', require('./api/politician/list'));
router.use('/ranking', require('./api/politician/ranking'));
router.use('/legislator', require('./api/politician/legislator'));
router.use('/comment', require('./api/politician/comment'));
router.use('/like', require('./api/politician/like'));
router.use('/pms', require('./api/admin/pms'));
router.use('/detail', require('./api/admin/detail'));

module.exports = router;