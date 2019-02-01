const express = require('express');
const db = require('../../../module/pool');
const state = require('../../../module/utils/statusCode');

const { party: party } = require('../../../parser/party');
const { region: region } = require('../../../parser/region');
const { legislator: legislator} = require('../../../parser/legislator');
// const legislator = require('../../../parser/legislator');
const { detail: detail } = require('../../../parser/detail');

const router = express.Router();

// Initial insert
router.post('/insert', async(req, res, next) => {
    await party();
    await region();
    await legislator();
    await detail();
});

// 국회의원 검색
router.get('/', async(req, res, next) => {

});

// 상세 정보 내에서 수정
router.post('/update', async(req, res, next) => {

})

module.exports = router;