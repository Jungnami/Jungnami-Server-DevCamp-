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
        res.statusCode(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_READ_ERROR));
    } else {
        res.statusCode(200).send(authUtil.successTrue(responseMessage.REPLY_OK, selectCommentResult));
    }
});

//댓글 게시
router.post('/', authUtil.isLoggedin, async (req, res, next) => {
    const legiIdx = req.body.legi_id;
    const writer = req.decode.writer;
    const content = req.body.content;
    const writeTime = moment().format('YYYY-MM-DD hh:mm:ss');
    
    const insertCommentQuery = 'INSERT INTO comment VALUES (?, ?, ?, ?)'
    const insertCommentResult = await db.queryParam_Arr(insertCommentQuery, [legiIdx, writer, content, writeTime]);

    if(!insertCommentResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_INSERT_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
    }
});

//댓글 수정
router.put('/', authUtil.isLoggedin, async (req, res) => {
    const comment_idx = req.body.comment_idx;
    const writer = req.body.writer;
    const content = req.body.content;

    if (writer != req.decoded.writer) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
    }
});

//댓글 삭제
router.delete('/:comment_idx', authUtil.isLoggedin, async (req, res) => {
    const writer = req.body.writer;

    if(writer != req.decoded.idx){

    } else {
        const updateCommentQuery = 'UPDATE comment SET content=? WHERE idx=?';
        const updateCommentResult = await db.queryParam_Arr(updateCommentQuery, writer);

        if(!encodeURIComponent){
            res.status(200).send(authUtil.successFalse(null, responseMessage.REPLY_DB_UPDATE_ERROR, statusCode.REPLY_DB_ERROR));

        } else {
            res.status(200).send(authUtil.successTrue(responseMessage.REPLY_OK, null));
        }
    }
});