const express = require('express');
const router = express.Router();

const db = require('../../../module/pool');
const authUtil = require('../../../../commons/utils/authUtil');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');

//댓글 표시
router.get('/:legi_id', async (req, res) => {
    const selectCommentQuery = 'SELECT * FROM legislator_comment WHERE legi_idx = ?';
    const selectCommentResult = await db.queryParam_Arr(selectCommentQuery, [req.params.legi_id]);

    if(!selectCommentResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_READ_ERROR));
    } else if (selectCommentResult == '') {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_READ_ERROR));        
    } else {
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_READ, selectCommentResult));
    }
});

//댓글 게시
router.post('/', authUtil.isLoggedin, async (req, res, next) => {
    const legiIdx = req.body.legi_id;
    const content = req.body.content;
    const writer = req.decoded.idx;
    const insertCommentQuery = 'INSERT INTO legislator_comment (`legi_idx`, `writer`, `content`) VALUES (?, ?, ?)'
    const insertCommentResult = await db.queryParam_Arr(insertCommentQuery, [legiIdx, writer, content]);

    if(!insertCommentResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_INSERT_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        var updatePointQuery = 'UPDATE membership SET point = point + 1 WHERE idx = ?';
        let updatePointResult = await db.queryParam_Arr(updatePointQuery, writer);

        if (!updatePointResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.USER_POINT_INCRESE_ERROR, statusCode.REPLY_USER_POINT_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_CREATED, responseMessage.REPLY_OK))
        }
    }
});

//댓글 수정
router.put('/', authUtil.isLoggedin, async (req, res) => {
    const comment_idx = req.body.comment_idx;
    const writer = req.body.writer;
    const content = req.body.content;

    if (writer != req.decoded.idx) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        const updateCommentQuery = 'UPDATE legislator_comment SET content=? WHERE idx=?';
        const updateCommentResult = await db.queryParam_Arr(updateCommentQuery, [content, comment_idx]);

        if (!updateCommentResult) {
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_MODIFIED, responseMessage.REPLY_MODIFIED_OK));
        }
    }
});

//댓글 삭제
router.delete('/:comment_idx', authUtil.isLoggedin, async (req, res) => {
    const writer = req.body.writer;

    if(writer != req.decoded.idx){
        res.status(200).send(authUtil.successFalse(responseMessage.NO_AUTHORITY, statusCode.REPLY_UNAUTHORIZED));
    } else {
        const deleteCommentQuery = 'DELETE FROM legislator_comment WHERE idx=?';
        const deleteCommentResult = await db.queryParam_Arr(deleteCommentQuery, req.params.comment_idx);
        
        if(!deleteCommentResult){
            res.status(200).send(authUtil.successFalse(responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
        } else {
            res.status(200).send(authUtil.successTrue(statusCode.REPLY_DELETED, responseMessage.REPLY_DELETE_OK));
        }
    }
});

//댓글 신고
router.post('/notify/:comment_idx', authUtil.isLoggedin, async (req, res) => {
    const selectNotifyQuery = 'SELECT * from legislator_comment_notify WHERE id=?'
    const selectNotifyResult = await connection_Arr(selectNotifyQuery, [req.decoded.idx]);

    if (!selectNotifyResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLYNOTIFYDBERROR, statusCode.REPLYNOTIFYDBERROR));
    } else {
        const Transaction = await db.Transaction(async (connection) => {
            const insertNotifyQuery = 'INSERT INTO legislator_comment_notify VALUES (?, ?, ?, ?)';
            const insertNotifyResult = await connection.query(insertNotifyQuery, [req.decoded.idx, req.params.comment_idx]);
            if(!insertNotifyResult){
                res.status(200).send(authUtil.successFalse(null, responseMessage.REPLYNOTIFYDBERROR, statusCode.REPLYNOTIFYDBERROR));
            }

            const increaseNotifyQuery = 'UPDATE membership2 SET cumulativenotify=cumulativenotify+1 WHERE idx=?';
            const increaseNotifyResult = await connection.query(increaseNotifyQuery, [req.decoded.idx]);
            if(!increaseNotifyResult){
                res.status(200).send(authUtil.successFalse(null, responseMessage.USERNOTIFYCOUNTERROR, statusCode.USERNOTIFYCOUNTERROR));                
            }
        });

        if(!Transaction) {
            res.status(200).send(authUtil.successFalse(null, responseMessage.REPLYNOTIFYTRANJECTIONERROR, statusCode.REPLYNOTIFYDBERROR));
        } else {
            res.status(200).send(authUtil.successTrue(responseMessage.REPLYNOTIFYOK, NULL));
        }
    }
});

module.exports = router;