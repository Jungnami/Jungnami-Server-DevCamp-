var express = require('express');
var router = express.Router();

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//좋아요, 싫어요 누르기
router.post('/:isLike/:reply_idx', authUtil.isLoggedin, async (req, res) => {
    let isLike = req.params.isLike;
    let resMessage = '';

    var selectLikeQuery = 'SELECT * FROM reply_like WHERE user_idx = ? AND reply_idx = ?';
    let selectLikeResult = await db.queryParam_Arr(selectLikeQuery, [req.decoded.idx, req.params.reply_idx]);

    if (!selectLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_DB_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
    } else if (selectLikeResult.length === 1) {     //이미 좋아요나 싫어요 한게 있으면
        if (selectLikeResult) {
            resMessage = responseMessage.REPLY_LIKE_ALREADY;
        } else {
            resMessage = responseMessage.REPLY_DISLIKE_ALREADY;
        }
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_BAD_REQUEST, resMessage));
    } else {    //아무것도 한게 없으면
        if (isLike) {
            resMessage = responseMessage.REPLY_LIKE_LIKE_ERROR;
        } else {
            resMessage = responseMessage.REPLY_LIKE_DISLIKE_ERROR
        }

        var insertLikeQuery = 'INSERT INTO reply_like VALUES ( ?, ?, ?)';
        let insertLikeResult = await db.queryParam_Arr(insertLikeQuery, [req.params.reply_idx, isLike, req.decoded.idx]);

        if (!insertLikeResult) {
            res.status(200).send(authUtil.successFalse(resMessage, statusCode.REPLY_LIKE_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE));
        }
    }
});

//좋아요, 싫어요 취소 
router.delete('/:isLike/:reply_idx', authUtil.isLoggedin, async (req, res) => {
    var deleteLikeQuery = 'DELETE FROM reply_like WHERE user_idx = ? AND reply_idx = ? AND like_flag = ?';
    let deleteLikeResult = await db.queryParam_Arr(deleteLikeQuery, [req.decoded.idx, req.params.reply_idx, req.params.isLike]);

    if (!deleteLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_CANCEL_ERROR, statusCode.REPLY_LIKE_DB_ERROR));        
    } else {
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_LIKE_OK, responseMessage.REPLY_LIKE_CANCEL_OK));
    }
}); 

module.exports = router;