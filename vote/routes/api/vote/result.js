var express = require('express');
var router = express.Router();
var cron = require('node-cron');

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');
const redisClient = require('../../../module/redis');

//투표 결과 받기
router.get('/', async (req, res) => {
    let isLike = parseInt(req.query.isLike);

    redisClient.hgetall('voteResult', (err, dbj) => {
        if (isLike) {
            
        } else {
    
        }
    });
    


});

//10분마다 투표결과 갱신
router.put('/', async (req, res) => {
    cron.schedule('*/5 * * * *', async () => {
        var getAllLikeQuery = 'SELECT legi.idx, legi.legi_name, legi.party_name, legi.profile_img, vr.like_cnt FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx';
        var getAllDislikeQuery = 'SELECT legi.idx, legi.legi_name, legi.party_name, legi.profile_img, vr.dislike_cnt FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx';

        let getAllLikeResult = await db.queryParam_None(getAllLikeQuery);
        let getAllDislikeResult = await db.queryParam_None(getAllDislikeQuery);

        if (!getAllLikeResult || !getAllDislikeResult) {
            res.status(200).send(authUtil.successFalse(null, res))
        } else {
            //투표 결과 redis cache에 저장
            redisClient.hmset('voteResult', 'like', getAllLikeResult, 'dislike', getAllDislikeResult);
        }
    
    });
});

//월요일마다 투표 갱신
router.delete('/reset', async (req, res) => {
    cron.schedule('* * * * Monday', async () => {

    });
});


module.exports = router;
