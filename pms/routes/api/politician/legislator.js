const express = require('express');
const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const router = express.Router();

// 의원별 상세 정보 페이지
// 호감, 비호감 순위
router.get('/page/:idx', async (req, res, next) => {
  const selectQuery = 'SELECT legi_name, party_cd, region, ordinal, profile_img, reelection, crime, sns, phone FROM legislator WHERE idx = ?';
  const selectResult = await db.queryParam_Arr(selectQuery, req.params.idx);

  if (!selectResult){
    res.status(200).send(authUtil.successFalse(responseMessage.DB_ERROR, statusCode.DB_ERROR));
  } else {
    res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_DETAIL_LOAD_SUCCESS, responseMessage.LEGISLATOR_SUCCESS, selectResult));    
  }
});

module.exports = router;