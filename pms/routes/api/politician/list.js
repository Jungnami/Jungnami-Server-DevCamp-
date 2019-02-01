const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');

const router = express.Router();

router.get('/party', async (req, res, next) => {
    const selectParty = 'SELECT party_cd FROM party'
    const selectPartyResult = await db.queryParam_None(selectParty);

    if(!selectPartyResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LIST_SUCCESS, selectPartyResult));
    }
});

router.get('/region', async (req, res, next) => {
    const selectRegion = 'SELECT city_cd FROM city'
    const selectRegionResult = await db.queryParam_None(selectRegion);

    if(!selectRegionResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LIST_SUCCESS, selectRegionResult));
    }
});

module.exports = router;