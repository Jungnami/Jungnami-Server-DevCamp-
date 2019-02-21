const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');

const router = express.Router();

//국회의원 상세 정보 조회
router.get('/:idx', async(req, res, next) => {
    const selectLegiQuery = 'SELECT * FROM legislator WHERE idx=?';
    const selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.params.idx);

    if(!selectLegiResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LEGISLATOR_DETAIL_SUCCESS,selectLegiResult));
    }
})

//국회의원 상세 정보 수정    
router.put('/update/:idx', async(req, res, next) => {
    let updateLegiQuery = 'UPDATE legislator SET legi_name=?, party_name=?, region=?, ordinal=?, profile_img=?, reelection=?, crime=?, sns=?, phone=? WHERE idx=?';
    //  ?=? WHERE idx=?';
    const option = Object.keys(req.body);
    // const value = new Array();
    const query = new Array();

    for (let i in option){
        // query[i] = new Array();
        query.push(req.body[option[i]]);
    }
    query.push(req.params.idx);
    console.log(query)

    let updateLegiResult = await db.queryParam_Parse(updateLegiQuery, query);
    console.log(updateLegiResult)
    if(!updateLegiResult){
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_UPDATE_SUCCESS));
    }
})

module.exports = router;