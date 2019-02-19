const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');
const path = require('path')

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
//patch에 body 입력 가능?? 
router.put('/update/:legi_cd', async(req, res, next) => {
    let updateLegiQuery = 'UPDATE legislator SET ?=? WHERE legi_cd=?';
    let arr = new Array
    let updateLegiResult = await db.queryParam_Arr(updateLegiQuery, 'crime', req.body.crime, req.params.legi_cd);
    console.log(updateLegiResult)

    if(!updateLegiResult){
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_UPDATE_SUCCESS));
    }
})

module.exports = router;