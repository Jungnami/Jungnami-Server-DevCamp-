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
router.get('/', async(req, res, next) => {
    let resultArr = new Array();

    const selectPartyQuery = 'SELECT party_name FROM party';
    const selectPartyResult = await db.queryParam_None(selectPartyQuery);
    const selectCityQuery = 'SELECT city_name FROM city';
    const selectCityResult = await db.queryParam_None(selectCityQuery);
    const selectOrdinalQuery = 'SELECT ordinal FROM legislator GROUP BY ordinal';
    const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
    
    resultArr.push(selectPartyResult, selectCityResult, selectOrdinalResult);

    if(!selectPartyResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse('null', responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.PMS_ADMIN_LOAD_SUCCESS, resultArr));
    }
});

// POST /admin/pms/search (admin page 의원 검색 요청)
router.post('/search', async(req, res, next) => {
    let selectLegiQuery = 'SELECT idx, legi_name, profile_img FROM legislator WHERE ordinal=';
    let selectLegiResult;
    if(req.body.ordinal == 'null'){
        const selectOrdinalQuery = 'SELECT MAX(ordinal) as ordinal FROM legislator GROUP BY ordinal';
        const selectOrdinalResult = await db.queryParam_None(selectOrdinalQuery);
        req.body.ordinal = selectOrdinalResult[0].ordinal;
    }
    selectLegiQuery += req.body.ordinal;

    // 'SELECT crime FROM legislator WHERE crime IS NULL;
    if(req.body.name != 'null'){                                                                                                                                                                                                                                                                                                                                                                                                                     
        selectLegiQuery += ' AND legi_name=?';
        selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.name);
    } else {
        if(req.body.crime == '0'){
            selectLegiQuery += ' AND crime IS NULL';
        } else if(req.body.crime == '1') {
            selectLegiQuery += ' AND crime IS NOT NULL';
        }
        if(req.body.party_cd == 'null'){
            if(req.body.city_cd == 'null'){
                selectLegiResult = await db.queryParam_None(selectLegiQuery); 
            } else {
                selectLegiQuery += ' AND city_cd=?'
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.city_cd);
            }
        } else {
            selectLegiQuery += ' AND party_cd=?'
            if(req.body.city_cd == 'null') {
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, req.body.party_cd);
            } else {
                selectLegiQuery += ' AND city_cd=?'
                selectLegiResult = await db.queryParam_Arr(selectLegiQuery, [req.body.party_cd, req.body.city_cd]) 
            }
        }
    }
    if(!selectLegiResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse('null', responseMessage.DB_ERROR, statusCode.DB_ERROR));
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
        res.status(statusCode.OK).send(pmsUtil.successFalse('null', responseMessage.DB_ERROR));
    } 
    res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LEGISLATOR_DB_INSERT));
});

//api update
router.put('/update', async(req, res, next) => {
    
})

module.exports = router;