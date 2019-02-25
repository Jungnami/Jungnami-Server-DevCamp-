const express = require('express');
const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const path = require('path');
const voteFileSys = require('mz/fs');
const redisClient = require('../../../module/redis');
const router = express.Router();

// 의원별 상세 정보 페이지
// 호감, 비호감 순위
router.get('/:idx', async (req, res, next) => {
    const selectQuery = 'SELECT legi_name, party_cd, region, ordinal, profile_img, reelection, crime, twitter, facebook, blog, phone FROM legislator WHERE idx = ?';
    const selectResult = await db.queryParam_Arr(selectQuery, req.params.idx);

    let resArr;

    if (!selectResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.LEGISLATOR_DB_ERROR, statusCode.PMS_DB_ERROR));
    } else if (selectResult == '') {
        res.status(200).send(authUtil.successFalse(responseMessage.LEGISLATOR_DETAIL_FAIL, statusCode.PMS_DB_ERROR));
    } else {
        resArr = selectResult[0];
    }

console.log(resArr)
    //호감 순위
    redisClient.hgetall('voteResult', (err, obj) => {
        if (err) {
            res.status(200).send(authUtil.successFalse(responseMessage.REDIS_VOTE_RESULT_READ_ERROR, statusCode.VOTE_VOTE_RESULT_REDIS_ERROR));
        } else {
            let tmpLike;
            let tmpDislike;

            try {
                tmpLike = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allLikeResult.txt'), 'UTF-8'));
                tmpDislike = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allDislikeResult.txt'), 'UTF-8'));
            } catch (readFileSysError) {
                res.status(200).send(authUtil.successFalse(responseMessage.VOTE_RESULT_FILE_READ_ERROR, statusCode.VOTE_VOTE_FILE_SYS_ERROR));
            }

            for (let i = 0; i < tmpLike.length; i++) {
                if (tmpLike[i].idx == req.params.idx) {
                    resArr.like_rank = tmpLike[i].rank;
                    resArr.dislke_rank = tmpDislike[i].rank;
                    break;
                }
            }

            if (err) {
                res.status(200).send(authUtil.successFalse(responseMessage.LIST_FAIL, statusCode.PMS_NO_CONTENT));
            } else {
                res.status(200).send(authUtil.successTrue(statusCode.PMS_OK, responseMessage.LIST_SUCCESS, selectResult[0]));
            }
        }
    })
});

module.exports = router;