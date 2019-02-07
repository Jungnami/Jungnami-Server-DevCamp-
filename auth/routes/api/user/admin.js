var express = require('express');
var router = express.Router();

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');

const redisClient = require('../../../module/redis');

router.get('/check', async (req, res) => {
    redisClient.hgetall(req.headers['token'], (err, obj) => {
        console.log(obj);
        console.log(obj.access_date);
    })
    res.status(200).send(req.decoded);
});

router.get('/list', authUtil.isAdmin, async (req, res) => {
    const admin = req.decoded;

    var getAllUserQuery = 'SELECT * FROM membership WHERE grade != 0;';
    let getAllUserResult = await db.queryParam_None(getAllUserQuery);

    if (!getAllUserResult) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.DB_ERROR, statusCode.AUTH_DB_ERROR));
    } else {
        res.status(200).send(authUtil.successTrue(responseMessage.READ_USER, getAllUserResult));
    }
});

module.exports = router;