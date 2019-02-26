const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const authUtil = require('../../../../commons/utils/authUtil');

const router = express.Router();

//국회의원 상세 정보 조회
router.get('/:idx', async(req, res, next) => {
    const selectLegiQuery = 'SELECT legi_name, party_name, region, ordinal, profile_img, reelection, crime, twitter, facebook, blog, phone FROM legislator WHERE idx=?';
    const selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.params.idx);
    console.log(selectLegiResult)
    if(!selectLegiResult) {
        res.status(statusCode.OK).send(authUtil.successFalse(responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_OK, responseMessage.LEGISLATOR_DETAIL_SUCCESS,selectLegiResult));
    }
})

//국회의원 상세 정보 수정    
router.put('/update/:idx', async(req, res, next) => {
    let updateLegiQuery = 'UPDATE legislator SET legi_name=?, party_name=?, region=?, ordinal=?, profile_img=?, reelection=?, crime=?, twitter, facebook, blog=?, phone=? WHERE idx=?';
    const option = Object.keys(req.body);
    const query = new Array();

    for (let i in option){
        query.push(req.body[option[i]]);
    }
    query.push(req.params.idx);
    console.log(query)

    let updateLegiResult = await db.queryParam_Parse(updateLegiQuery, query);
    console.log(updateLegiResult)
    if(!updateLegiResult){
        res.status(statusCode.OK).send(authUtil.successFalse(responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_UPDATE_SUCCESS, responseMessage.PMS_ADMIN_UPDATE_SUCCESS));
    }
})

module.exports = router;