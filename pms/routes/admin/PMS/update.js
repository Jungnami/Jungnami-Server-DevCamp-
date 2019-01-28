const express = require('express');
const db = require('../../../module/pool');
const state = require('../../../module/utils/statusCode');

const { party: party } = require('../../../parser/party');
const { region: region } = require('../../../parser/region');
// const { city } = require('../../../parser/city');
// const { legislator } = require('../../../parser/legislator');
// const { detail } = require('../../../parser/detial');

const router = express.Router();

//update 버튼 눌렀을 때
// router.post('/admin/update', async(req, res, next) => {
    
// });

party();
// region();