var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var moment = require('moment');
var voteFileSys = require('fs');

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');
const redisClient = require('../../../module/redis');

//투표 결과 받기
router.get('/:isLike/:page', async (req, res) => {
    let isLike = parseInt(req.params.isLike);
    let page = parseInt(req.params.page);
    let nubmer = 15;

    redisClient.hgetall('voteResult', (err, obj) => {
        if (err) {
            res.status(200).send(authUtil.successFalse(responseMessage.REDIS_VOTE_RESULT_READ_ERROR, statusCode.VOTE_VOTE_RESULT_REDIS_ERROR));
        } else {
            let result = {
                'timeStamp': obj.timeStamp
            };
            try {
                let returnResult = [];
                if (isLike) {
                    result.data = JSON.parse(voteFileSys.readFileSync('allLikeResult.txt', 'UTF-8'));
                } else {
                    result.data = JSON.parse(voteFileSys.readFileSync('allDislikeResult.txt', 'UTF-8'));
                }

                for (let i = page; i < page + nubmer; i++) {
                    returnResult.push(result.data[i]);
                }

                result.data = returnResult;
                
                res.status(200).send(authUtil.successTrue(statusCode.VOTE_OK, responseMessage.READ_VOTE_RESULT, result));
            } catch (readFileSysError) {
                res.status(200).send(authUtil.successFalse(responseMessage.VOTE_RESULT_FILE_READ_ERROR, statusCode.VOTE_VOTE_FILE_SYS_ERROR));
            }
        }
    });
});

//과거 투표 기록 보기
router.get('/past/:isLike', async (req, res) => {
    //TODO 추후 최신 과거 결과는 저장해놓은거 파싱해서 사용하기
    var getPastLikeSummaryQuery = 'SELECT legi.idx, legi.legi_name, legi.party_cd, legi.profile_img, s.like_cnt AS vote_cnt ' +
        'FROM legislator AS legi JOIN summary AS s ON legi.idx = s.code ' +
        'WHERE s.start_date = (SELECT start_date FROM summary ORDER BY start_date DESC LIMIT 1)';
    var getPastDislikeSummaryQuery = 'SELECT legi.idx, legi.legi_name, legi.party_cd, legi.profile_img, s.dislike_cnt AS vote_cnt ' +
        'FROM legislator AS legi JOIN summary AS s ON legi.idx = s.code ' +
        'WHERE s.start_date = (SELECT start_date FROM summary ORDER BY start_date DESC LIMIT 1)';

    let pastSummaryResult = null;

    if (parseInt(req.params.isLike)) {
        pastSummaryResult = await db.queryParam_None(getPastLikeSummaryQuery);
    } else {
        pastSummaryResult = await db.queryParam_None(getPastLikeSummaryQuery);
    }

    if (!pastSummaryResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.SUMMARY_READ_ERROR, statusCode.VOTE_DB_ERROR));
    } else {

        res,
        status(200).send(authUtil.successTrue(statusCode.VOTE_OK, responseMessage.READ_SUMMARY, pastSummaryResult))
    }
});

//특정 과거 날짜 투표 기록 보기
router.get('/past/:isLike/:date', async (req, res) => {
    let pastDate = req.params.date;
    var getPastSummaryQuery = '';

    if (parseInt(req.params.isLike)) {
        getPastSummaryQuery = 'SELECT legi.idx, legi.legi_name, legi.party_cd, legi.profile_img, s.like_cnt AS vote_cnt ' +
            'FROM legislator AS legi JOIN summary AS s ON legi.idx = s.code ' +
            'WHERE s.start_date = ?';
    } else {
        getPastSummaryQuery = 'SELECT legi.idx, legi.legi_name, legi.party_cd, legi.profile_img, s.dislike_cnt AS vote_cnt ' +
            'FROM legislator AS legi JOIN summary AS s ON legi.idx = s.code ' +
            'WHERE s.start_date = ?';
    }

    let getPastSummaryResult = await db.queryParam_Arr(getPastSummaryQuery, [pastDate]);

    if (!getPastSummaryResult) {
        res.status(200).send(authUtil.successFalse(responseMessage.SUMMARY_READ_ERROR, statusCode.VOTE_SUMMARY_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(statusCode.VOTE_OK, responseMessage.READ_SUMMARY, changeContent(getPastSummaryResult)));
    }
});

//5분마다 투표 결과 갱신
cron.schedule('*/5 * * * *', async () => {
    let timeStamp = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log("투표 결과 갱신: " + timeStamp);

    var getAllLikeQuery = 'SELECT legi.idx AS idx, legi.legi_name, legi.party_cd, legi.city_cd, legi.region, legi.profile_img, vr.like_cnt AS vote_cnt ' +
        'FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx ORDER BY vr.like_cnt DESC';
    var getAllDislikeQuery = 'SELECT legi.idx, legi.legi_name, legi.party_cd, legi.city_cd, legi.region, legi.profile_img, vr.dislike_cnt AS vote_cnt ' +
        'FROM legislator AS legi JOIN vote_result AS vr ON legi.idx = vr.idx ORDER BY vr.dislike_cnt DESC';

    let getAllLikeResult = await db.queryParam_None(getAllLikeQuery);
    let getAllDislikeResult = await db.queryParam_None(getAllDislikeQuery);

    if (!getAllLikeResult || !getAllDislikeResult) {
        console.log("vote result file save error");
    } else {
        try {
            var selectAllLegiQuery = 'SELECT idx, legi_name, party_cd, profile_img, city_cd, region FROM legislator ORDER BY legi_name ASC';
            let selectAllLegiResult = await db.queryParam_None(selectAllLegiQuery);

            if (getAllLikeResult.length == 0 && getAllDislikeResult.length == 0) {   //테이블이 비어있을 때
                for (let i = 0; i < selectAllLegiResult.length; i++) {
                    selectAllLegiResult[i].rank = "-";
                    selectAllLegiResult[i].ratio = 0;
                    selectAllLegiResult[i].vote_cnt = 0;
                }
                getAllLikeResult = selectAllLegiResult;
                getAllDislikeResult = selectAllLegiResult;
            } else {
                getAllLikeResult = await changeContent(getAllLikeResult);
                getAllDislikeResult = await changeContent(getAllDislikeResult);

                await addRestRegi(selectAllLegiResult, getAllLikeResult);
                await addRestRegi(selectAllLegiResult, getAllDislikeResult);
            }

            //투표 결과 txt 파일로 저장
            voteFileSys.writeFileSync('allLikeResult.txt', JSON.stringify(getAllLikeResult), 'UTF-8');
            voteFileSys.writeFileSync('allDislikeResult.txt', JSON.stringify(getAllDislikeResult), 'UTF-8');

            //투표 결과 시간 redis에 저장
            redisClient.hmset('voteResult', 'timeStamp', timeStamp);
        } catch (resultError) {
            console.log(resultError);
        }
    }
});

//월요일마다 투표 갱신
cron.schedule('* * * * Monday', async () => {
    let moveVoteTableQuery = 'INSERT INTO summary SELECT * FROM vote_result';
    let deleteVoteDataQuery = 'DELETE FROM vote_result';
    let updateDateQuery = 'UPDATE summary SET start_date = ?, end_date = ? WHERE start_date = null AND end_date = null';

    let moveVoteTableResult = await db.queryParam_None(moveVoteTableQuery);
    if (!moveVoteTableResult) {} else {
        let lastWeek = moment().add(-7, 'days').format('YYYY-MM-DD');
        let today = moment().format('YYYY-MM-DD');

        let updateDateResult = await db.queryParam_Arr(updateDateQuery, [lastWeek, today]);
        if (!updateDateResult) {} else {
            let deleteVoteDataResult = await db.queryParam_None(deleteVoteDataQuery);
            if (!deleteVoteDataResult) {} else {}
        }
    }
    //TODO 추후 최근 과거 결과 파일로 저장해서 빌드하기
});

async function changeContent(result) {
    var preValue = result[0].vote_cnt;
    var rankCnt = 1;
    var continuity = 0;
    var maxVoteVal = result[0].vote_cnt;

    result[0].rank = '1';
    result[0].ratio = 100;

    for (let i = 1; i < result.length; i++) {
        if (preValue > result[i].vote_cnt) {
            rankCnt = rankCnt + continuity + 1;
            continuity = 0;
        } else if (preValue == result[i].vote_cnt) {
            continuity++;
        } else {
            break;
        }

        result[i].rank = rankCnt.toString();
        preValue = result[i].vote_cnt;

        result[i].ratio = Math.floor((result[i].vote_cnt * 100 / maxVoteVal));
    }
    return result;
};

async function addRestRegi(legiList, result) {
    let lastIdx = result.length;
    for (var i = 0; i < legiList.length; i++) {
        let flag = 0;
        for (var j = 0; j < lastIdx; j++) {
            if (legiList[i].idx == result[j].idx) {    //투표 결과가 있는 의원일 경우
                flag = 1;
            }
        }

        if (flag == 0) {
            legiList[i].rank = "-";
            legiList[i].ratio = 0;
            legiList[i].vote_cnt = 0;
            result[result.length] = legiList[i];
        }
    }
}

module.exports = router;
