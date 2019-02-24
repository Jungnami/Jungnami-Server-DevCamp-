const express = require('express');
const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const router = express.Router();

// 의원별 상세 정보 페이지
// 호감, 비호감 순위
router.get('/:idx', async (req, res, next) => {
  const selectQuery = 'SELECT legi_name, party_cd, region, ordinal, profile_img, reelection, crime, twitter, facebook, blog, phone FROM legislator WHERE idx = ?';
  const selectResult = await db.queryParam_Arr(selectQuery, req.params.idx);
  console.log(selectResult)
  if (!selectResult){
    res.status(200).send(authUtil.successFalse(responseMessage.LEGISLATOR_DB_ERROR, statusCode.PMS_DB_ERROR));
  } else {
    res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_DETAIL_LOAD_SUCCESS, responseMessage.LEGISLATOR_SUCCESS, selectResult[0]));    
  }
});

module.exports = router;