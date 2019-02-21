var express = require('express');
var router = express.Router();
var moment = require('moment');

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');
const jwt = require('../../../module/jwt');
const redisClient = require('../../../module/redis');

router.post('/', async (req, res) => {
    console.log(req.user);
    let refreshToken = req.body.refreshToken;
    let expToken = req.body.expToken;

    if (!refreshToken) {
        res.status(200).send(authUtil.successFalse(responseMessage.EMPTY_REFRESH_TOKEN, statusCode.AUTH_BAD_REQUEST));
    } else {
        var findUserByRefreshQuery = "SELECT idx, id, grade FROM membership WHERE refresh_token = ?";
        let findUserByRefreshResult = await db.queryParam_Arr(findUserByRefreshQuery, [refreshToken]);

        console.log(findUserByRefreshResult);
        if (!findUserByRefreshResult || findUserByRefreshResult.length == 0) {
            res.status(200).send(authUtil.successFalse(responseMessage.NOT_FOUND_USER, statusCode.AUTH_DB_ERROR));
        } else {
            const newToken = jwt.sign(findUserByRefreshResult[0]);
            //TODO redis에 값 수정
            redisClient.del(expToken);
            redisClient.hmset(newToken, 'access_date', moment().format('YYYY-MM-DD hh:mm:ss'));
            res.status(200).send(authUtil.successTrue(statusCode.AUTH_OK, responseMessage.REFRESH_TOKEN, newToken));
        
        }
    }
});

module.exports = router;