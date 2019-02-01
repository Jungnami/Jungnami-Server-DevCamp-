var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var moment = require('moment');

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');
const redisClient = require('../../../module/redis');

//투표 결과 받기
router.get('/', async (req, res) => {
    let isLike = parseInt(req.query.isLike);

    redisClient.hgetall('voteResult', (err, dbj) => {
        if (err) {
            res.status(200).send(authUtil.successFalse(err, responseMessage.REDIS_VOTE_RESULT_READ_ERROR, statusCode.VOTE_VOTE_RESULT_REDIS_ERROR));
        } else {
            let result = { 'timeStamp' : obj.timeStamp };

            if (isLike) {
                result.data = obj.like;
                res.status(200).send(authUtil.successTrue(responseMessage.READ_VOTE_RESULT, result));
            } else {
                result.data = obj.dislike;
                res.status(200).send(authUtil.successTrue(responseMessage.READ_VOTE_RESULT, result));
            }
        }
    });
});

//10분마다 투표결과 갱신
router.put('/', async (req, res) => {
    cron.schedule('*/5 * * * *', async () => {
        let timeStamp = moment().format('YYYY-MM-DD hh:mm:ss');

        var getAllLikeQuery = 'SELECT legi.idx, legi.legi_name, legi.party_name, legi.profile_img, vr.like_cnt FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx';
        var getAllDislikeQuery = 'SELECT legi.idx, legi.legi_name, legi.party_name, legi.profile_img, vr.dislike_cnt FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx';

        let getAllLikeResult = await db.queryParam_None(getAllLikeQuery);
        let getAllDislikeResult = await db.queryParam_None(getAllDislikeQuery);

        if (!getAllLikeResult || !getAllDislikeResult) {
            res.status(200).send(authUtil.successFalse(null, res))
        } else {
            //투표 결과 redis cache에 저장
            redisClient.hmset('voteResult', 'like', getAllLikeResult, 'dislike', getAllDislikeResult, 'timeStamp', timeStamp);
        }

    });
});

//월요일마다 투표 갱신
router.delete('/reset', async (req, res) => {
    cron.schedule('* * * * Monday', async () => {
        let moveVoteTableQuery = 'INSERT INTO summary SELECT * FROM vote_result';
        let deleteVoteDataQuery = 'DELETE FROM vote_result';
        let updateDateQuery = 'UPDATE summary SET start_date = ?, end_date = ? WHERE start_date = null AND end_date = null';

        let moveVoteTableResult = await db.queryParam_None(moveVoteTableQuery);
        if (moveVoteTableResult) {
            res.status(200).send(authUtil.successFalse(null, responseMessage.VOTE_SUMMARY_COPY_ERROR, statusCode.VOTE_VOTE_RESULT_DB_ERROR));
        } else {
            let lastWeek = moment().add(-7, 'days').format('YYYY-MM-DD');
            let today = moment().format('YYYY-MM-DD');

            let updateDateResult = await db.queryParam_Arr(updateDateQuery, [lastWeek, today]);
            if (!updateDateResult) {
                res.status(200).send(authUtil.successFalse(null, responseMessage.VOTE_SUMMARY_DATE_UPDATE_ERROR, statusCode.VOTE_SUMMARY_ERROR));
            } else {
                let deleteVoteDataResult = await db.queryParam_None(deleteVoteDataQuery);
                if (!deleteVoteDataResult) {
                    res.status(200).send(authUtil.successFalse(null, responseMessage.VOTE_RESULT_DELETE_ERROR, statusCode.VOTE_VOTE_RESULT_DB_ERROR));
                } else {
                    res.status(200).send(authUtil.successTrue(responseMessage.VOTE_SUMMARY_SUCCESS, null));
                }
            }
        }
    });
});




module.exports = router;
