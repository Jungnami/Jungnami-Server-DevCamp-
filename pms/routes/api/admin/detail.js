const express = require('express');
const db = require('../../../module/pool');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../../commons/utils/responseMessage');
const pmsUtil = require('../../../../commons/utils/pmsUtil');
const path = require('path')

const router = express.Router();

router.get('/', async(req, res, next) => {
    const selectLegiQuery = 'SELECT * FROM legislator';
    const selectLegiResult = await db.queryParam_None(selectLegiQuery);

    if(!selectLegiResult) {
        res.status(statusCode.OK).send(pmsUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.DB_ERROR));
    } else {
        res.status(statusCode.OK).send(pmsUtil.successTrue(responseMessage.LEGISLATOR_DETAIL_SUCCESS));
    }
})

router.put('/update', async(req, res, next) => {
    
})

module.exports = router;