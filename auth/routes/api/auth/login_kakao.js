var express = require('express');
const request = require('request-promise');
var router = express.Router();
var moment = require('moment');
var randtoken = require('rand-token');

const jwt = require('../../../module/jwt');
const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const db = require('../../../module/pool');

router.post('/', async (req, res, next) => {

    // kakao access token
    let accessToken = req.body.accessToken;
    if (!accessToken) {
        res.status(200).send(authUtil.successFalse(responseMessage.NO_ACCESS_TOKEN, statusCode.AUTH_BAD_REQUEST))
    }

    // push 알람 클라이언트 토큰
    let fcmToken = req.body.fcmToken;

    let option = {
        method: 'GET',
        uri: 'https://kapi.kakao.com/v2/user/me',
        json: true,
        headers: {
            'Authorization': "Bearer " + accessToken
        }
    }

    try {
        let kakaoResult = await request(option);

        console.log(kakaoResult);
        var id = kakaoResult.id;
        var nickname = kakaoResult.properties.nickname;
        var img_url = kakaoResult.properties.thumbnail_image;
        let token = '';
        let idx = -1;
        let grade = 1;
        let today = moment().format('YYYY-MM-DD hh:mm:ss');
        var refreshToken = randtoken.uid(256);

        let checkIdQuery = 'SELECT * FROM membership WHERE id = ?';
        let checkIdResult = await db.queryParam_Arr(checkIdQuery, [id]);

        // 이미 회원가입이 되어있을 때
        if (checkIdResult.length != 0) {
            token = jwt.sign({
                idx: checkIdResult[0].idx,
                id: checkIdResult[0].id,
                grade: checkIdResult[0].grade
            });

            res.status(200).send(authUtil.successTrue(statusCode.AUTH_OK, responseMessage.LOGIN_SUCCESS, {
                'token': token,
                "refreshToken": checkIdResult[0].refresh_token
            }));
        } else { // 다른 기기이고 회원이 아닐때
            let userInsertTransaction = await db.Transaction(async (connection) => {
                var inserUserQuery = 'INSERT INTO membership (auth_type, id, name, profile_img, age, gender, status, grade, point, fcm_token, refresh_token, access_date, regist_date, cumulative_notify) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                let insertUserResult = await connection.query(inserUserQuery,
                    [1, id, nickname, img_url, 20, 1, 1, grade, 100, fcmToken, refreshToken, today, today, 0]);

                if (!insertUserResult) {
                    next(500);
                } else {
                    if (idx == -1) idx = insertUserResult.insertId;

                    var insertBallotQuery = 'INSERT INTO vote (idx, ballot, update_date, sequence) VALUES (?, ?, ?, ?)';
                    let insertBallotResult = await connection.query(insertBallotQuery, [idx, 5, today, 1]);

                    if (!insertBallotResult) {
                        next(500);
                    } else {
                        token = jwt.sign({
                            idx: idx,
                            id: id,
                            grade: grade
                        });
                    }
                }
            });

            if (!userInsertTransaction) {
                res.status(200).send(authUtil.successFalse(responseMessage.LOGIN_TRANSACTION_ERROR, statusCode.AUTH_DB_ERROR));
            } else {
                res.status(200).send(authUtil.successTrue(statusCode.AUTH_OK, responseMessage.LOGIN_SUCCESS, {
                    'token': token,
                    "refreshToken": refreshToken
                }));
            }
        }
    } catch (err) {
        console.log("Kakao Error => " + err);
    } finally {}
});


module.exports = router;