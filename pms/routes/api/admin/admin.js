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
router.get('/pms', async(req, res, next) => {
    let resultArr = new Array();

    const selectPartyQuery = 'SELECT party_name FROM party';
    const selectPartyResult = await db.queryParam_None(selectPartyQuery);
    const selectCityQuery = 'SELECT city_name FROM city';
    const selectCityResult = await db.queryParam_None(selectCityQuery);
    const selectOrdinalQuery = 'SELECT ordinal FROM legislator GROUP BY ordinal';
    const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
    
    resultArr.push(selectPartyResult, selectCityResult, selectOrdinalResult);

    if(!selectPartyResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        // res.sendFile(path.join(__dirname, '../../../public/index.html'))
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_LOAD_SUCCESS, resultArr));
    }
});


// **조회 요청시 rest 어떻게 보내고, 받은 정보 어떻게 사용하는지 where???

router.get('/pms/search', async(req, res, next) => {
    // const selectLegiQuery = 'SELECT legi_name, party_cd, city_cd, ordinal, crime FROM legislator WHERE party_cd=?, city_cd=?, ordinal=?, crime=?';
    const selectLegiQuery = 'SELECT legi_name, party_cd, city_cd, ordinal, crime, profile_img FROM legislator';
    const selectLegiResult = await db.queryParam_None(selectLegiQuery);
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