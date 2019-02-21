const express = require('express');
const router = express.Router();

const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');


router.post('/:isLike/:comment_idx', authUtil.isLoggedin, async (req, res) => {
    const isLike = req.params.isLike;
    let resMsg = '';

    const selectLikeQuery = 'SELECT * FROM legislator_comment_like WHERE '
    const selectLikeResult = await db.queryParam_Arr(selectLikeQuery, [req.decoded.writer])

    if(!selectLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_DB_ERROR, statusCode.REPLY_LIKE_DB_ERROR))
    } else if(selectLikeResult.length === 1){
        if(selectLikeResult) {
            resMsg = responseMessage.REPLY_LIKE_ALREADY;
        } else {
            resMsg = responseMessage.REPLY_DISLIKE_ALREADY;
        }
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_BAD_REQUEST, resMsg));
    } else {
        if(isLike) {
            resMsg = responseMessage.REPLY_LIKE_LIKE_ERROR;
        } else {
            resMsg = responseMessage.REPLY_LIKE_DISLIKE_ERROR;
        }

        const insertLikeQuery = 'INSERT INTO legislator_comment_like VALUES (?, ?, ?)';
        const insertLikeResult = await db.queryParam_Arr(insertLikeQuery, [req.params.comment_idx, isLike, req.decoded.idx]);

        if(!insertLikeResult){
            res.status(200).send(authUtil.successFalse(resMsg, statusCode.REPLY_LIKE_DB_ERROR));
        } else {
            res.status(200).send(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE);
        }
    }
});

router.delete('/:isLike/:comment_idx', )