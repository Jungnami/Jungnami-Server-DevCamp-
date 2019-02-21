var express = require('express');
var router = express.Router();
var moment = require('moment');

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//댓글 보기 + 대댓글 보기
router.get('/:article_id', async (req, res) => {
    let parent = req.query.parent;
    var selectReqQuery = 'SELECT * FROM reply WHERE article_id = ? AND parent = ?';

    if (!req.query.parent) {
        selectReqQuery += " ORDER BY depth"
    } else {
        parent = 0;
    }
    let selectReqResult = await db.queryParam_Arr(selectReqQuery, [req.params.article_id, parent]);

    if (!selectReqResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        res,status(200).send(suthUtil.successTrue(responseMessage.REPLY_OK, selectReqResult));
    }
});

//댓글 등록
router.post('/', authUtil.isLoggedin, async (req, res) => {
    let articleIdx = req.body.articleIdx;
    let parent = req.body.parent;
    let depth = req.body.depth;
    let content = req.body.content;
    let writer = req.decoded.idx;
    let writeTime = moment().format('YYYY-MM-DD hh:mm:ss');

    var insertRepQuery = 'INSERT INTO reply VALUES (?, ?, ?, ?, ?)';
    let insertRepResult = await db.queryParam_Arr(insertRepQuery, [articleIdx, writer, content, writeTime]);

    if (!insertRepResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_INSERT_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        //포인트 증가는 SQL TRIGGER로 해결
        res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
    }
});
//댓글 수정
router.put('/', authUtil.isLoggedin, async (req, res) => {
    let reply_idx = req.body.reply_idx;
    let writer = req.body.writer;
    let content = req.body.content;
    let writeTime = moment().format('YYYY-MM-DD hh:mm:ss');

    if (writer != req.decoded.idx) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        var updateRepQuery = 'UPDATE reply SET content = ? writetime = ? WHERE idx = ?';
        let updateRepResult = await db.queryParam_Arr(updateRepQuery, [content, writeTime, reply_idx]);

        if (!updateRepResult) {
            res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
        }
    }

    
});

//댓글 삭제
router.delete("/:reply_idx", authUtil.isLoggedin, async(req, res) => {
    let writer = req.body.writer;

    if (writer != req.decoded.idx) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_DELETE_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        var deleteRepQuery = 'DELETE FROM reply WHERE idx = ?';
        let deleteRepResult = await db.queryParam_Arr(deleteRepQuery, [req.params.reply_idx]);

        if (!deleteRepResult) {
            res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_DELETE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
        }
    }
    
});

router.post('/notify/:reply_idx', authUtil.isLoggedin, async (req, res) => {
    var checkNotifyQuery = 'SELECT * FROM notify WHERE idx = ?';
    let checkNotifyResult = await db.queryParam_Arr(checkNotifyQuery, [req.decoded.idx]);

    if (!checkNotifyResult) {

    } else {
        let Transaction = await db.Transaction(async (connection) => {
            var notifyQuery = 'INSERT INTO notify VALUES (?, ?, ?, ?)';
            let notifyResult = await connection.query(notifyQuery, [req.decoded.idx, req.params.reply_idx, moment().format('YYYY-MM-DD hh:mm:ss'), req.body.reason]);
            if (!notifyResult) {
                res.status(200).send(authUtil.successFalse(null, responseMessage.REPLYNOTIFYDBERROR, statusCode.REPLYNOTIFYDBERROR));
            }

            var increseNotifyQuery = 'UPDATE membership SET cumulativenotify = cumulativenotify + 1 WHERE idx = ?';
            let increseNotifyResult = await connection.query(increseNotifyQuery, [req.decoded.idx]);
            if (!increseNotifyResult) {
                res.status(200).send(authUtil.successFalse(null, responseMessage.USERNOTIFYCOUNTERROR, statusCode.USERNOTIFYCOUNTERROR));
            }
        });

        if (!Transaction) {                
            res.status(200).send(authUtil.successFalse(null, responseMessage.REPLYNOTIFYTRANJECTIONERROR, statusCode.REPLYNOTIFYDBERROR));
        } else {
            res.status(200).send(authUtil.successTrue(responseMessage.REPLYNOTIFYOK, NULL));
        }
    } 
});


module.exports = router;