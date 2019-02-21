const express = require('express');
const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const router = express.Router();

// 의원별 상세 정보 페이지
// cms 내용 추가해야 함
router.get('/page/:idx', async (req, res, next) => {
  const selectQuery = 'SELECT * FROM legislator WHERE idx = ?';
  const selectResult = await db.queryParam_Arr(selectQuery, req.params.idx);

  if (!selectResult){
    res.status(200).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
  } else {
    res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LEGISLATOR_SUCCESS, selectResult));    
  }
});

module.exports = router;