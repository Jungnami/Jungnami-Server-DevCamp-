const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const authUtil = require('../../../../commons/utils/authUtil');

const router = express.Router();

// 정당별 목록
router.get('/party/:party_cd/:isLike', async(req, res, next) => {
    let selectParty = 'SELECT l.idx, l.legi_name, l.region, l.party_cd, l.profile_img, v.like_cnt, v.dislike_cnt FROM legislator AS l LEFT JOIN vote_result AS v ON l.idx=v.idx WHERE l.party_cd = ? ';
    let selectPartyResult;
    const party_cd = parseInt(req.params.party_cd);
    if(req.params.isLike == '1'){
        selectParty += 'ORDER BY v.like_cnt DESC';
        selectPartyResult = await db.queryParam_Arr(selectParty, party_cd);
    
        if(!selectPartyResult) {
            res.status(statusCode.OK).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.PMS_DB_ERROR));
        } else {
            res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LIST_SUCCESS, selectPartyResult));
        }
    } else if(req.params.isLike == '0') {
        selectParty += 'ORDER BY v.dislike_cnt DESC';
        selectPartyResult = await db.queryParam_Arr(selectParty, req.params.party_cd);

        if(!selectPartyResult) {
            res.status(statusCode.OK).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.PMS_DB_ERROR));
        } else {
            res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LIST_SUCCESS, selectPartyResult));
        }
    }
});

//지역별 목록
router.get('/region/:city_cd/:isLike', async (req, res, next) => {
    let selectRegionQuery = 'SELECT l.idx, l.legi_name, l.city_cd, l.region, l.party_cd, l.profile_img, v.like_cnt, v.dislike_cnt FROM legislator AS l LEFT JOIN vote_result AS v ON l.idx=v.idx WHERE l.city_cd = ? ';
    let selectRegionResult;
    if(req.params.isLike == '1') {
        selectRegionQuery += 'ORDER BY v.dislike_cnt DESC';
        selectRegionResult = await db.queryParam_Arr(selectRegionQuery, req.params.city_cd);

        if(!selectRegionResult) {
            res.status(statusCode.OK).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.PMS_DB_ERROR));

        } else {
            res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LIST_SUCCESS, selectRegionResult));
        }
    } else if(req.params.isLike == '0'){
        selectRegionQuery += 'ORDER BY v.dislike_cnt DESC';
        selectRegionResult = await db.queryParam_Arr(selectRegionQuery, req.params.city_cd);

        console.log(selectRegionResult);

        if(!selectRegionResult) {
            res.status(statusCode.OK).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.PMS_DB_ERROR));
        } else {
            res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LIST_SUCCESS, selectRegionResult));
        }
    }
});


module.exports = router;