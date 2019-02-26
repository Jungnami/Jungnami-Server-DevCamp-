var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var {
    PythonShell
} = require('python-shell')

const authUtil = require('../../../commons/utils/authUtil');
const responseMessage = require('../../../commons/utils/responseMessage');
const statusCode = require('../../../commons/utils/statusCode');
const db = require('../../module/pool');

//전체 기사 보기
router.get('/', async (req, res) => {
    var getAllArticleQuery = 'SELECT * FROM article ORDER BY ranking';
    let getAllArticleResult = await db.queryParam_None(getAllArticleQuery);

    if (!getAllArticleResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.ATRICLE_DB_READ_ERROR, statusCode.ARTICLE_OK_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(statusCode.ARTICLE_OK, responseMessage.ARTICLE_READ, getAllArticleResult));
    }
});

//특정 기사 보기 + 댓글까지 (대댓글을 댓글을 클릭했을 때)
router.get('/:article_idx', async (req, res) => {
    var getArticleQuery = 'SELECT * FROM article WHERE id = ?';
    let getArticleResult = await db.queryParam_Arr(getArticleQuery, [req.params.article_idx]);

    var getParentReplyQuery = 'SELECT * FROM reply WHERE article_id = ? AND parent = 0 AND depth = 0;';
    let getParentReplyResult = await db.queryParam_Arr(getParentReplyQuery, [req.params.article_idx]);

    if (!getArticleResult || !getParentReplyResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.REPLY_READ_ERROR, statusCode.REPLY_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(statusCode.REPLY_OK, responseMessage.REPLY_READ, { 'article' : getParentReplyResult, 'reply' : getParentReplyResult}));
    }
});

//5분마다 기사 크롤링
// cron.schedule('*/0.5 * * * *', async () => {

//   var options = {

//     mode: 'text',

//     pythonPath: 'crawling/venv/bin/python',

//     pythonOptions: ['-u'],

//     scriptPath: '',

//     args: []

//   };


//   ///Users/kangsujin/Desktop/autoCrawling/crawling/article_crawler.py
//   PythonShell.run('../crawling/article_crawler.py', options, function (err, results) {

//     if (err) {
//       console.log("err");
//       throw err;}

//     console.log('results: %j', results);

//   });
// });

module.exports = router;