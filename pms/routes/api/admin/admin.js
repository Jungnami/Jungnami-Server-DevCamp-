const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');
const path = require('path')

const { party: party } = require('../../../parser/party');
const { region: region } = require('../../../parser/region');
const { legislator: legislator} = require('../../../parser/legislator');
const { detail: detail } = require('../../../parser/detail');

const router = express.Router();

// pms admin page
// select option에 필요한 데이터 전달
router.get('/pms', async(req, res, next) => {
    let resultArr = new Array();

    const selectPartyQuery = 'SELECT party_cd FROM party';
    const selectPartyResult = await db.queryParam_None(selectPartyQuery);
    const selectCityQuery = 'SELECT city_cd FROM city';
    const selectCityResult = await db.queryParam_None(selectCityQuery);
    const selectOrdinalQuery = 'SELECT ordinal FROM legislator GROUP BY ordinal';
    const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
    
    resultArr.push(selectPartyResult, selectCityResult, selectOrdinalResult);
    console.log(resultArr)

    if(!selectPartyResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_LOAD_SUCCESS, resultArr));
    }
});


// **조회 요청시 rest 어떻게 보내고, 받은 정보 어떻게 사용하는지 where???
// select box에서 받아온 여러 개 값 확인하는 방법
// default로 최신 대수
//req.body.search-legislator, body-parser 이용
router.post('/pms/search', async(req, res, next) => {
    const selectBox = new Array();
    for (let i in Object.keys(req.body.data)) {
        if (req.body.data[i] == null) {
            req.body.data[i] = '%';
        }
        selectBox.push(req.body.data[i]);
    }

    const selectLegiQuery = 'SELECT idx, legi_name, profile_img FROM legislator WHERE legi_name LIKE ? AND party_cd LIKE ? AND city_cd LIKE ? AND ordinal LIKE ?';
    const selectLegiResult = await db.queryParam_Arr(selectLegiQuery, selectBox);
    console.log(selectBox)
    console.log(selectLegiQuery)
    console.log(selectLegiResult)
    if(!selectLegiResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_SEARCH_SUCCESS, selectLegiResult))
    }
})

// Initial insert
router.post('/insert', async(req, res, next) => {
    try{
        await party();
        await region();
        await legislator();
        await detail();
    } catch (err) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR));
    } 
    res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LEGISLATOR_DB_INSERT));
});

//api update
router.put('/update', async(req, res, next) => {
    
})

module.exports = router;