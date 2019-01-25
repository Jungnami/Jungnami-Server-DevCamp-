var express = require('express');
var router = express.Router();

const authUtil = require('../../../module/utils/authUtil');
const responseMessage = require('../../../module/utils/responseMessage');
const statusCode = require('../../../module/utils/statusCode');
const db = require('../../../module/pool');
const jwt = require('../../../module/jwt');

router.post('/refresh', async (req, res) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        res.status(200).send(authUtil.successFalse(null, responseMessage.EMPTY_REFRESH_TOKEN, statusCode.AUTH_BAD_REQUEST));
    } else {
        var findUserByRefreshQuery = 'SELECT idx, id, grade FROM membership WHERE refresh_token = ?';
        let findUserByRefreshResult = await db.queryParam_Arr(findUserByRefreshQuery, [refreshToken]);

        if (findUserByRefreshResult) {
            res.status(200).send(authUtil.successFalse(findUserByRefreshResult, responseMessage.NOT_FOUND_USER, statusCode.AUTH_DB_ERROR));
        } else {
            const newToken = jwt.sign(findUserByRefreshResult);
            //TODO redis에 값 수정
            res.status(200).send(authUtil.successTrue(responseMessage.REFRESH_TOKEN, newToken));
        }
    }
});

module.exports = router;