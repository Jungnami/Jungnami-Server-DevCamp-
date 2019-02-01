const express = require('express');
const db = require('../../../module/pool');
const pmsUtil = require('../../../../commons/utils/pmsUtil');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const router = express.Router();

router.get('/page/:code', async (req, res, next) => {
  const selectQuery = 'SELECT * FROM legislator WHERE idx = ?';
  const selectResult = await db.queryParam_Arr(selectQuery, req.params.code);

  if (!selectResult){
    res.status(200).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
  } else {
    res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LEGISLATOR_SUCCESS, selectResult));    
  }
});

module.exports = router;