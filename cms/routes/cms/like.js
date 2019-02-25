var express = require('express');
var router = express.Router();

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//좋아요, 싫어요 누르기
router.post('/:isLike/:reply_idx', authUtil.isLoggedin, async (req, res) => {
    let reply_idx = req.body.reply_idx;
    let isLike = req.body.isLike;
    let statCode = [0, 0];  //성공일 때, 실패일 때
    let resMessage = ['', ''];

    var selectLikeQuery = 'SELECT * FROM reply_like WHERE user_idx = ? AND reply_idx = ?';
    let selectLikeResult = await db.queryParam_Arr(selectLikeQuery, [req.decoded.idx, reply_idx]);

    if (!selectLikeResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_LIKE_DB_ERROR, statusCode.REPLY_LIKE_DB_ERROR));
    } else if (selectLikeResult.length === 1) {     //이미 좋아요나 싫어요 한게 있으면 -> cnlth
        var deleteLikeQuery = 'DELETE FROM reply_like WHERE idx = ?';
        let deleteLikeResult = await db.queryParam_Arr(deleteLikeQuery, [reply_idx]);

        if (isLike) {   //좋아요일 때
            
        } else {

        }

        if (!deleteLikeResult) {
            res.status(200).send(authUtil.successFalse(resMessage[1], statCode[1]));
        } else {
            res.status(200).send(authUtil.successTrue(statCode[0], resMessage[0]));
        }
    } else {
        var insertLikeQuery = 'INSERT INTO reply_like VALUES ( ?, ?, ?)';
        let insertLikeResult = await db.queryParam_Arr(insertLikeQuery, [reply_idx, isLike, req.decoded.idx]);

        if (isLike) {   //좋아요일 때
            
        } else {

        }

        if (!insertLikeResult) {
            res.status(200).send(authUtil.successFalse(resMessage[1], statCode[1]));
        } else {
            res.status(200).send(authUtil.successTrue(statCode[0], resMessage[0]));
        }
    }
});

module.exports = router;