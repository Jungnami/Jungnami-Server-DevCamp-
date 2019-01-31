const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');

const router = express.Router();

// 정당별 목록
router.get('/party/:party_cd/:vote', async(req, res, next) => {
    let selectParty = 'SELECT l.idx, l.legi_name, l.region, l.party_cd, l.profile_img, v.like_cnt, v.dislike_cnt FROM legislator AS l LEFT JOIN vote_result AS v ON l.idx=v.idx WHERE l.party_cd = ? ';
    let selectPartyResult;
    const party_cd = parseInt(req.params.party_cd);
    if(req.params.vote == 'like'){
        selectParty += 'ORDER BY v.like_cnt DESC';
        console.log(selectParty)
        selectPartyResult = await db.queryParam_Arr(selectParty, party_cd);
    
        if(!selectPartyResult) {
            res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
        } else {
            res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LIST_SUCCESS, selectPartyResult));
        }
    } else if(req.params.vote == 'dislike') {
        selectParty += 'ORDER BY v.dislike_cnt DESC';
        selectPartyResult = await db.queryParam_Arr(selectParty, req.params.party_cd);

        if(!selectPartyResult) {
            res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
        } else {
            res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LIST_SUCCESS, selectPartyResult));
        }
    }
});

//지역별 목록
router.get('/region/:city_cd/:vote', async (req, res, next) => {
    let selectRegion = 'SELECT l.idx, l.legi_name, l.city_cd, l.region, l.party_cd, l.profile_img, v.like_cnt, v.dislike_cnt FROM legislator AS l LEFT JOIN vote_result AS v ON l.idx=v.idx WHERE l.city_cd = ? ';
    let queryResult;
    if(req.params.vote == 'like') {
        selectRegion += 'ORDER BY v.dislike_cnt DESC';
        queryResult = await db.queryParam_Arr(selectRegion, req.params.city_cd);

        console.log(queryResult);

        if(!queryResult) {
            res.status(statusCode.OK).send(state.DB_ERROR);
        } else {
            res.status(statusCode.OK).send(queryResult);
        }
    } else if(req.params.vote == 'dislike'){
        selectRegion += 'ORDER BY v.dislike_cnt DESC';
        queryResult = await db.queryParam_Arr(selectRegion, req.params.city_cd);

        console.log(queryResult);

        if(!queryResult) {
            res.status(state.OK).send(state.DB_ERROR);
        } else {
            res.status(state.OK).send(queryResult);
        }
    }
});


module.exports = router;