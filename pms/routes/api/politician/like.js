const express = require('express');
const router = express.Router();

const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');


router.post('/', authUtil.isLoggedin, async (req, res, next) => {
    const isLike = req.body.isLike;
    const reply_idx = req.body.reply_idx;
    let resMsg = '';

    const selectLikeQuery = 'SELECT * FROM legislator_comment_like WHERE user_idx=? AND comment_idx=?'
    const selectLikeResult = await db.queryParam_Arr(selectLikeQuery, [req.decoded.idx, reply_idx])

    if(!selectLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_READ_ERROR, statusCode.REPLY_LIKE_DB_ERROR))
    } else if(selectLikeResult.length === 1){
        const deleteLikeQuery = 'DELETE FROM legislator_comment_like WHERE user_idx = ? AND comment_idx = ? AND like_flag = ?';
        let deleteLikeResult;

        if(isLike === '1') {
            deleteLikeResult = await db.queryParam_Arr(deleteLikeQuery, [req.decoded.idx, reply_idx, isLike]);
        } else {
            deleteLikeResult = await db.queryParam_Arr(deleteLikeQuery, [req.decoded.idx, reply_idx, isLike]);
        }

        if (!deleteLikeResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));        
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE_CANCEL_OK));
        }

    } else {
        if(isLike === '1') {
            resMsg = responseMessage.REPLY_LIKE_LIKE_ERROR;
        } else {
            resMsg = responseMessage.REPLY_LIKE_DISLIKE_ERROR;
        }

        const insertLikeQuery = 'INSERT INTO legislator_comment_like (comment_idx, like_flag, user_idx) VALUES (?, ?, ?)';
        const insertLikeResult = await db.queryParam_Arr(insertLikeQuery, [reply_idx, isLike, req.decoded.idx]);

        if(!insertLikeResult){
            res.status(200).send(authUtil.successFalse(resMsg, statusCode.REPLY_LIKE_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE_OK));
        }
    }
});

module.exports = router;