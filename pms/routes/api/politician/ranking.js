const express = require('express');
const path = require('path');
const voteFileSys = require('mz/fs');
const db = require('../../../module/pool');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const authUtil = require('../../../../commons/utils/authUtil');
const redisClient = require('../../../module/redis');

// require('../../../../vote/')

const router = express.Router();

router.get('/party/:party_cd/:isLike', async (req, res) => {
    const partyCd = req.params.party_cd;
    let isLike = parseInt(req.params.isLike);

    redisClient.hgetall('voteResult', (err, obj) => {
        if (err) {
            res.status(200).send(authUtil.successFalse(responseMessage.REDIS_VOTE_RESULT_READ_ERROR, statusCode.VOTE_VOTE_RESULT_REDIS_ERROR));
        } else {
            let tmpResult;
            let resArr = new Array();
            let result = {
                'timeStamp': obj.timeStamp
            };
            try {
                if (isLike) {
                    tmpResult = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allLikeResult.txt'), 'UTF-8'));
                } else {
                    tmpResult = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allDislikeResult.txt'), 'UTF-8'));
                }
            } catch (readFileSysError) {
                res.status(200).send(authUtil.successFalse(responseMessage.VOTE_RESULT_FILE_READ_ERROR, statusCode.VOTE_VOTE_FILE_SYS_ERROR));
            }
            let j = 1;
            for(let i = 0; i < tmpResult.length; i++){
                if(tmpResult[i].party_cd == partyCd){
                    tmpResult[i].party_rank = j;
                    resArr.push(tmpResult[i]);
                    j = j + 1;
                }
            }
            result.data = resArr;

            if(err) {
                res.status(200).send(authUtil.successFalse(responseMessage.LIST_FAIL, statusCode.PMS_NO_CONTENT))
            } else if(result.data == ''){
                res.status(200).send(authUtil.successFalse(responseMessage.LIST_FAIL, statusCode.PMS_NO_CONTENT))
            } else {
                res.status(200).send(authUtil.successTrue(statusCode.PMS_OK, responseMessage.LIST_SUCCESS, result));
            }
        }
    });
});

router.get('/city/:city_cd/:isLike', async (req, res) => {
    const cityCd = req.params.city_cd;
    let isLike = parseInt(req.params.isLike);

    redisClient.hgetall('voteResult', (err, obj) => {
        if (err) {
            res.status(200).send(authUtil.successFalse(responseMessage.REDIS_VOTE_RESULT_READ_ERROR, statusCode.VOTE_VOTE_RESULT_REDIS_ERROR));
        } else {
            let tmpResult;
            let resArr = new Array();
            let result = {
                'timeStamp': obj.timeStamp
            };
            try {
                if (isLike) {
                    tmpResult = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allLikeResult.txt'), 'UTF-8'));
                } else {
                    tmpResult = JSON.parse(voteFileSys.readFileSync(path.resolve('.' + '/../vote/allDisikeResult.txt'), 'UTF-8'));
                }
            } catch (readFileSysError) {
                res.status(200).send(authUtil.successFalse(responseMessage.VOTE_RESULT_FILE_READ_ERROR, statusCode.VOTE_VOTE_FILE_SYS_ERROR));
            }
            let j = 1;
            for(let i = 0; i < tmpResult.length; i++){
                if(tmpResult[i].city_cd == cityCd){
                    tmpResult[i].city_rank = j;
                    resArr.push(tmpResult[i]);
                    j = j + 1;
                }
            }
            result.data = resArr;

            if(err) {
                res.status(200).send(authUtil.successFalse(responseMessage.LIST_FAIL, statusCode.PMS_NO_CONTENT))
            } else if(result.data == ''){
                res.status(200).send(authUtil.successFalse(responseMessage.LIST_FAIL, statusCode.PMS_NO_CONTENT))
            } else {
            res.status(200).send(authUtil.successTrue(statusCode.PMS_OK, responseMessage.LIST_SUCCESS, result));
            }
        }
    });
});

module.exports = router;