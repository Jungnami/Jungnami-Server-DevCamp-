var express = require('express');
var router = express.Router();

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');

//의원 호감 투표
router.post('/', authUtil.isLoggedin, async (req, res) => {
    let isLike = parseInt(req.query.isLike);
    let legiCd = parseInt(req.query.code);
    let insertLegiVoteQuery = '';

    let checkBallotNumQuery = 'SELECT ballot FROM vote WHERE user_idx = ?';
    let checkBallotNumResult = await db.queryParam_Arr(checkBallotNumQuery, [req.decoded.idx]);

    if (!checkBallotNumResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.VOTE_VOTE_DB_ERROR, statusCode.VOTE_VOTE_DB_ERROR));
    } else if (checkBallotNumResult[0].ballot == 0) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.USER_BALLOT_AMOUNT_LACK, statusCode.VOTE_BAD_REQUEST));
    } else {
        if (isLike) {
            insertLegiVoteQuery = 'INSERT INTO vote_result (idx, like_cnt, dislike_cnt) VALUES (?, ?, dislike_cnt) ON DUPLICATE KEY UPDATE like_cnt = like_cnt + 1';
        } else {
            insertLegiVoteQuery = 'INSERT INTO vote_result (idx, like_cnt, dislike_cnt) VALUES (?, like_cnt, ?) ON DUPLICATE KEY UPDATE dislike_cnt = dislike_cnt + 1';
        }
        let insertLegiVoteResult = await db.queryParam_Arr(insertLegiVoteQuery, [legiCd, 1]);

        if (!insertLegiVoteResult) {
            res.status(200).send(authUtil.successFalse(null, responseMessage.LEGI_VOTE_ERROR, statusCode.VOTE_VOTE_RESULT_DB_ERROR));
        } else {
            let takeBallotQuery = 'UPDATE vote SET ballot = ballot - 1 WHERE user_idx = ?';
            let takeBallotResult = await db.queryParam_Arr(takeBallotQuery, [req.decoded.idx]);

            if (!takeBallotResult) {
                res.status(200).send(authUtil.successFalse(null, responseMessage.USER_BALLOT_DECRESE_ERROR, statusCode.VOTE_VOTE_DB_ERROR));
            } else {
                res.status(200).send(authUtil.successTrue(responseMessage.USER_VOTE_SUCCESS));
            }
        }
    }
});

module.exports = router;
