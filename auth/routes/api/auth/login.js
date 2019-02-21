var express = require('express');
var router = express.Router();

const authUtil = require('../../../../commons/utils/authUtil');
const responseMessage = require('../../../../commons/utils/responseMessage');
const statusCode = require('../../../../commons/utils/statusCode');
const passport = require('passport')

//naver 로그인
router.get('/naver', passport.authenticate('naver'));

//naver login 연동 콜백
router.get('/naver/callback', async (req, res) => {
    passport.authenticate('naver', {
        failureRedirect: '/'
    }), (req, res) => {
        res.status(200).send(authUtil.successTrue(statusCode.AUTH_OK, responseMessage.LOGIN_SUCCESS, req.session.passport.token));
    }
});

//naver 로그인
router.get('/kakao', passport.authenticate('kakao'));

//naver login 연동 콜백
router.get('/kakao/callback', passport.authenticate('kakao', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/fail'
}));

router.get('/fail', async (req, res) => {
    res.status(200).send(authUtil.successFalse(responseMessage.LOGIN_FAIL, statusCode.INTERNAL_SERVER_ERROR));
});

router.get('/success', async (req, res) => {
    res.status(200).send(authUtil.successTrue(statusCode.AUTH_OK, responseMessage.LOGIN_SUCCESS, req._passport.session.user));
});

module.exports = router;