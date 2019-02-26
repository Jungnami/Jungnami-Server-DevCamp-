var express = require('express');
var router = express.Router();

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//좋아요, 싫어요 누르기
router.post('/', authUtil.isLoggedin, async (req, res) => {
    let reply_idx = req.body.reply_idx;
    let isLike = req.body.isLike;

    var selectLikeQuery = 'SELECT * FROM reply_like WHERE user_idx = ? AND reply_idx = ? AND like_flag = ?';
    let selectLikeResult = await db.queryParam_Arr(selectLikeQuery, [req.decoded.idx, reply_idx, isLike]);

    if (!selectLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_DB_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
    } else if (selectLikeResult.length === 1) { //이미 좋아요나 싫어요 한게 있으면 -> cnlth
        let deleteTransaction = await db.Transaction(async (connection) => {
            var deleteLikeQuery = 'DELETE FROM reply_like WHERE reply_idx = ? AND like_flag = ? AND user_idx = ?';
            let deleteLikeResult = await connection.query(deleteLikeQuery, [reply_idx, isLike, req.decoded.idx]);

            if (!deleteLikeResult) {
                if (isLike == 1) { //좋아요 삭제 실패일 때
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                } else {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DISLIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                }
            }

            var decreseDislikeCntQuery = 'UPDATE reply SET dislike_cnt = dislike_cnt - 1 WHERE idx = ?';
            var decreseLikeCntQuery = 'UPDATE reply SET like_cnt = like_cnt - 1 WHERE idx = ?';

            if (isLike == 1) {
                let decreseLikeCntResult = await connection.query(decreseLikeCntQuery, [reply_idx]);
                if (!decreseLikeCntResult) {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                }
            } else {
                let decreseDislikeCntResult = await connection.query(decreseDislikeCntQuery, [reply_idx]);
                if (!decreseDislikeCntResult) {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DISLIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                }
            }
        });

        if (!deleteTransaction) {
            if (isLike == 1) {
                res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_CANCEL_TRANJECTION_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
            } else {
                res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DISLIKE_CANCEL_TRANJECTION_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
            }
        } else {
            if (isLike == 1) { //좋아요 삭제 성공일 때
                res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE_CANCEL_OK));
            } else {
                res.status(200).send(authUtil.successTrue(statusCode.REPLY_DISLIKE_OK, responseMessage.REPLY_DISLIKE_CANCEL_OK));
            }
        }
    } else {
        let insertTransaction = await db.Transaction(async (connection) => {
            var insertLikeQuery = 'INSERT INTO reply_like (reply_idx, like_flag, user_idx) VALUES ( ?, ?, ?)';
            let insertLikeResult = await connection.query(insertLikeQuery, [reply_idx, isLike, req.decoded.idx]);

            if (!insertLikeResult) {
                if (isLike == 1) { //좋아요 실패일 때
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_LIKE_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                } else {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_DISLIKE_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
                }
            }

            var increseLikeCntQuery = 'UPDATE reply SET like_cnt = like_cnt + 1 WHERE idx = ?';
            var increseDislikeCntQuery = 'UPDATE reply SET dislike_cnt = dislike_cnt + 1 WHERE idx = ?';

            if (isLike == 1) {
                let increseLikeCntResult = await connection.query(increseLikeCntQuery, [reply_idx]);
                if (!increseLikeCntResult) {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
                }
            } else {
                let increseDislikeCntResult = await connection.query(increseDislikeCntQuery, [reply_idx]);
                if (!increseDislikeCntResult) {
                    res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
                }
            }
        });

        if (!insertTransaction) {
            if (isLike == 1) {
                res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_TRANJECTION_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
            } else {
                res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DISLIKE_TRANJECTION_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
            }
        } else {
            if (isLike == 1) { //좋아요 성공일 때
                res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE_OK));
            } else {
                res.status(200).send(authUtil.successTrue(statusCode.REPLY_DISLIKE_OK, responseMessage.REPLY_DISLIKE_OK));
            }
        }
    }
});

module.exports = router;