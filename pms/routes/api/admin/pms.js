const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../../commons/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const authUtil = require('../../../../commons/utils/authUtil');
const path = require('path')

const { party: party } = require('../../../parser/party');
const { region: region } = require('../../../parser/region');
const { legislator: legislator} = require('../../../parser/legislator');
const { detail: detail } = require('../../../parser/detail');

const router = express.Router();

// pms admin page
// select option에 필요한 데이터 전달
router.get('/', async(req, res, next) => {
    let resultArr = new Array();

    const selectPartyQuery = 'SELECT * FROM party';
    const selectPartyResult = await db.queryParam_None(selectPartyQuery);
    const selectCityQuery = 'SELECT * FROM city';
    const selectCityResult = await db.queryParam_None(selectCityQuery);
    const selectOrdinalQuery = 'SELECT ordinal FROM legislator GROUP BY ordinal';
    const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
    const ordinal = selectOrdinalResult[selectOrdinalResult.length-1].ordinal;
    const selectLegiQuery = 'SELECT idx, legi_name, profile_img FROM legislator WHERE ordinal= ?';
    const selectLegiResult = await db.queryParam_Arr(selectLegiQuery, ordinal);
    
    resultArr.push(selectPartyResult, selectCityResult, selectOrdinalResult, selectLegiResult);

    if(!selectPartyResult) {
        res.status(statusCode.OK).send(authUtil.successFalse(responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        console.log(resultArr)
        res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_ADMIN_OK, responseMessage.PMS_ADMIN_LOAD_SUCCESS, resultArr));
    }
});

// POST /admin/pms/search (admin page 의원 검색 요청)
router.post('/search', async(req, res, next) => {
    console.log(req.body);
    let selectLegiQuery = 'SELECT idx, legi_name, profile_img FROM legislator WHERE ordinal=';
    let selectLegiResult;
    if(!req.body.ordinal){
        const selectOrdinalQuery = 'SELECT MAX(ordinal) as ordinal FROM legislator GROUP BY ordinal';
        const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
        req.body.ordinal = selectOrdinalResult[0].ordinal;
    }
    selectLegiQuery += req.body.ordinal;

    if(req.body.name){                                                                                                                                                                                                                                                                                                                                                                                                                     
        selectLegiQuery += ' AND legi_name=?';
        selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.name);
    } else {
        if(req.body.crime == '0'){
            selectLegiQuery += ' AND crime IS NULL';
        } else if(req.body.crime == '1') {
            selectLegiQuery += ' AND crime IS NOT NULL';
        }
        if(!req.body.party){
            if(!req.body.city){
                selectLegiResult = await db.queryParam_None(selectLegiQuery); 
            } else {
                selectLegiQuery += ' AND city_name=?'
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.city);
            }
        } else {
            selectLegiQuery += ' AND party_name=?'
            if(!req.body.city){
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.party);
            } else {
                selectLegiQuery += ' AND city_name=?'
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, [req.body.party, req.body.city]) 
            }
        }
    }
    console.log(selectLegiQuery)
    console.log(selectLegiResult)
    if(!selectLegiResult) {
        res.status(statusCode.OK).send(authUtil.successFalse(responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(authUtil.successTrue(statusCode.PMS_ADMIN_SEARCH_SUCCESS, responseMessage.PMS_ADMIN_SEARCH_SUCCESS, selectLegiResult))
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
        console.log(err)
        res.status(statusCode.OK).send(authUtil.successFalse('null', responseMessage.DB_ERROR));
    } 
    res.status(statusCode.OK).send(authUtil.successTrue(responseMessage.LEGISLATOR_DB_INSERT));
});

//api update
router.put('/update', async(req, res, next) => {
    
})

module.exports = router;