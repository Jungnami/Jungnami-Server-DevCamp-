var express = require('express');
var router = express.Router();
var moment = require('moment');

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//댓글 보기 + 대댓글 보기
router.get('/:article_id', async (req, res) => {
    var selectReqQuery = 'SELECT * FROM reply WHERE article_id = ? AND parent = 0 ORDER BY writetime';
    let selectReqResult = await db.queryParam_Arr(selectReqQuery, [req.params.article_id]);

    if (!selectReqResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        for (let i = 0; i < selectReqResult.length; i++) {
            var selectReReplyQuery = 'SELECT * FROM reply WHERE article_id = ? AND parent = ? ORDER BY writetime';
            let selectReReplyReuslt = await db.queryParam_Arr(selectReReplyQuery, [req.params.article_id, selectReqResult[i].idx]);

            selectReqResult[i].rereply = selectReReplyReuslt;
        }
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_OK, selectReqResult));
    }
});

//댓글 등록
router.post('/', authUtil.isLoggedin, async (req, res) => {
    let articleIdx = req.body.articleIdx;
    let parent = req.body.parent;
    let depth = 0;
    let content = req.body.content;
    let writer = req.decoded.idx;
    let writeTime = moment().format('YYYY-MM-DD hh:mm:ss');

    if (parent != 0) {
        var selectReplyQuery = 'SELECT depth FROM reply WHERE parent = ? ORDER BY depth DESC LIMIT 1';
        let selectReplyResult = await db.queryParam_Arr(selectReplyQuery, [parent]);

        if (selectReplyResult.length == 0) {
            depth = 1;
        } else {
            depth = selectReplyResult[0].depth + 1;
        }
    }

    var insertRepQuery = 'INSERT INTO reply (article_id, writer, content, writetime, parent, depth) VALUES (?, ?, ?, ?, ?, ?)';
    let insertRepResult = await db.queryParam_Arr(insertRepQuery, [articleIdx, writer, content, writeTime, parent, depth]);

    if (!insertRepResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_INSERT_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        var updatePointQuery = 'UPDATE membership SET point = point + 1 WHERE idx = ?';
        let updatePointResult = await db.queryParam_Arr(updatePointQuery, [req.decoded.idx]);

        if (!updatePointResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.USER_POINT_INCRESE_ERROR, statusCode.AUTH_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_CREATED, responseMessage.REPLY_OK));
        }
    }
});

//댓글 수정
router.put('/', authUtil.isLoggedin, async (req, res) => {
    let reply_idx = req.body.reply_idx;
    let writer = req.body.writer;
    let content = req.body.content;

    if (writer != req.decoded.idx) {
        res.status(200).send(authUtil.successFalse(responseMessage.NO_AUTHORITY, statusCode.REPLY_UNAUTHORIZED));
    } else {
        var updateRepQuery = 'UPDATE reply SET content = ? WHERE idx = ?';
        let updateRepResult = await db.queryParam_Arr(updateRepQuery, [content, reply_idx]);

        if (!updateRepResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_PUT_OK));
        }
    }
});

//댓글 삭제
router.delete("/", authUtil.isLoggedin, async (req, res) => {
    let reply_idx = req.body.reply_idx;
    let writer = req.body.writer;

    if (writer != req.decoded.idx) {
        res.status(200).send(authUtil.successFalse(responseMessage.NO_AUTHORITY, statusCode.REPLY_UNAUTHORIZED));
    } else {
        var deleteRepQuery = 'DELETE FROM reply WHERE idx = ? AND writer = ?';
        let deleteRepResult = await db.queryParam_Arr(deleteRepQuery, [reply_idx, writer]);
        
        if (!deleteRepResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_DELETE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_DELETE_OK));
        }
    }

});

router.post('/notify/', authUtil.isLoggedin, async (req, res) => {
    var checkNotifyQuery = 'SELECT * FROM notify WHERE user_idx = ? AND reply_idx = ?';
    let checkNotifyResult = await db.queryParam_Arr(checkNotifyQuery, [req.decoded.idx, req.body.reply_idx]);

    if (!checkNotifyResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_NOTIFY_DB_ERROR, statusCode.REPLY_NOTIFY_DB_ERROR));
    } else if (checkNotifyResult.length == 1) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_NOTIFY_ALREADY, statusCode.REPLY_NOTIFY_BAD_REQUEST));
    } else {
        let notifyTransaction = await db.Transaction(async (connection) => {
            var notifyQuery = 'INSERT INTO notify (user_idx, reply_idx, timestamp, reason) VALUES (?, ?, ?, ?)';
            let notifyResult = await connection.query(notifyQuery, [req.decoded.idx, req.body.reply_idx, moment().format('YYYY-MM-DD hh:mm:ss'), req.body.reason]);
            if (!notifyResult) {
                res.status(200).send(authUtil.successFalse(responseMessage.REPLY_NOTIFY_DB_ERROR, statusCode.REPLY_NOTIFY_DB_ERROR));
            }

            var increseNotifyQuery = 'UPDATE membership SET cumulative_notify = cumulative_notify + 1 WHERE idx = ?';
            let increseNotifyResult = await connection.query(increseNotifyQuery, [req.decoded.idx]);
            if (!increseNotifyResult) {
                res.status(200).send(authUtil.successFalse(responseMessage.USER_NOTIFY_COUNT_ERROR, statusCode.USER_NOTIFY_COUNT_ERROR));
            }
        });

        if (!notifyTransaction) {                
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_NOTIFY_TRANJECTION_ERROR, statusCode.REPLY_NOTIFY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_NOTIFY_OK));
        }
    } 
});

module.exports = router;