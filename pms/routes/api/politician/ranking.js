const express = require('express');
const db = require('../../../module/pool');
const state = require('../../../module/utils/statusCode');

const router = express.Router();

// 정당별 목록
// SELECT p.name, v.like_cnt, v.dislike_cnt FROM politician AS p LEFT JOIN vote_result AS v ON p.code = v.code WHERE p.city_cd=10007 ORDER BY v.like_cnt DESC;
router.get('/party', async(req, res, next) => {
    let selectParty = 'SELECT * FROM legislator AS l LEFT JOIN vote_result AS v ON p.legi_cd=v.legi_cd WHERE p.party_cd = ? ';
    let queryResult;
    if(!req.query.code){
        next();
    } else if(req.query.condition == 'like') {
        selectParty += 'ORDER BY v.like_cnt DESC';
        queryResult = await db.queryParam_Arr(selectParty, req.query.party);
        console.log(queryResult);

        if(!queryResult) {
            res.status(state.OK).send(state.DB_ERROR);
        } else {
            res.status(state.OK).send(queryResult);
        }
    } else if(req.query.condition == 'dislike'){
        selectParty += 'ORDER BY v.dislike_cnt DESC';
        queryResult = await db.queryParam_Arr(selectParty, req.query.party);
        console.log(queryResult);

        if(!queryResult) {
            res.status(state.OK).send(state.DB_ERROR);
        } else {
            res.status(state.OK).send(queryResult);
        }
    }
})

router.get('/party', async (req, res, next) => {
    const selectParty = 'SELECT * FROM party'
    const selectPartyResult = await db.queryParam_None(selectParty);

    console.log(selectPartyResult);

    if(!selectPartyResult) {
        res.status(state.OK).send(state.DB_ERROR);
    } else {
        res.status(state.OK).send(selectPartyResult);
    }
});


//지역별 목록
router.get('/region', (req, res, next) => {
    let selectRegion = 'SELECT * FROM legislator AS l LEFT JOIN vote_result AS v ON p.city_cd=v.city_cd WHERE p.city_cd = ? ';
    let queryResult;
    if(!req.query.city_cd){
        next();
    } else if(req.query.condition == 'like') {
        selectRegion += 'ORDER BY v.like_cnt DESC';
        queryResult = await db.queryParam_Arr(selectRegion, req.query.city_cd);

        console.log(queryResult);

        if(!queryResult) {
            res.status(state.OK).send(state.DB_ERROR);
        } else {
            res.status(state.OK).send(queryResult);
        }
    } else if(req.query.condition == 'dislike'){
        selectRegion += 'ORDER BY v.dislike_cnt DESC';
        queryResult = await db.queryParam_Arr(selectRegion, req.query.city_cd);

        console.log(queryResult);

        if(!queryResult) {
            res.status(state.OK).send(state.DB_ERROR);
        } else {
            res.status(state.OK).send(queryResult);
        }
    }
});

router.get('/region', (req, res, next) => {
    const selectParty = 'SELECT * FROM city'
    const selectPartyResult = await db.queryParam_None(selectParty);

    console.log(selectPartyResult);

    if(!selectPartyResult) {
        res.status(state.OK).send(state.DB_ERROR);
    } else {
        res.status(state.OK).send(selectPartyResult);
    }
});


module.exports = router;