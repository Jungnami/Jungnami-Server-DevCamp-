var express = require('express');
var router = express.Router();
var moment = require('moment');

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');

//의원 호감, 비호감 투표
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

//투표권 지급
router.put('/ballot', authUtil.isLoggedin, async (req, res) => {
    var today = moment();
    var lastDate = moment().endOf('month').date();

    var selectBallotQuery = 'SELECT * FROM vote WHERE idx = ?';

    let selectBallotResult = await db.queryParam_Arr(selectBallotQuery, [req.decoded.idx]);
    var userBallot = selectBallotResult[0];

    if (!selectBallotResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.USER_BALLOT_SELECT_ERROR, statusCode.VOTE_VOTE_DB_ERROR));
    } else {
        let diff = Math.floor(today.diff(userBallot.update_date) / (1000*60*60*24));
        if (diff == 1) {
            if (userBallot.sequence == 7) {
                userBallot.ballot += 10;
            } else if (userBallot.sequence == lastDate) {
                userBallot.ballot += 20;
                userBallot.sequence = 0;
            } else {
                userBallot.ballot += 5;
            }
            userBallot.sequence += 1;
        } else {
            userBallot.sequence = 1;
        }
    }
    var updateBallotQuery = 'UPDATE vote SET ballot = ?, update_date = ?, sequence = ? WHERE idx = ?';
    let updateBallotResult = await db.queryParam_Arr(updateBallotQuery, [userBallot.ballot, today, userBallot.sequence, req.decoded.idx]);

    if (!updateBallotResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.USER_BALLOT_INCRESE_ERROR, statusCode.VOTE_VOTE_DB_ERROR));
    } else {
        res.status(200).send(authUtil.responseMessage.USER_BALLOT_SUCCESS, userBallot.sequence);
    }
});

module.exports = router;
