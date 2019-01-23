var express = require('express');
var router = express.Router();

const authUtil = require('../../../module/utils/authUtil');
const responseMessage = require('../../../module/utils/responseMessage');
const statusCode = require('../../../module/utils/statusCode');
const passport = require('passport')

//naver 로그인
router.get('/naver', passport.authenticate('naver'));

//naver login 연동 콜백
router.get('/naver/callback', async (req, res) => {
    passport.authenticate('naver', {
        failureRedirect: '/'
    }), (req, res) => {
        res.status(200).send(authUtil.successTrue(req.session.passport.token, responseMessage.LOGIN_SUCCESS));
    }
});

//naver 로그인
router.get('/kakao', passport.authenticate('kakao'));

//naver login 연동 콜백
router.get('/kakao/callback', passport.authenticate('kakao', {
    successRedirect: '/login/success',
    failureRedirect: '/login/fail'
}));

router.get('/fail', async (req, res) => {
    res.status(200).send(authUtil.successFalse(null, responseMessage.LOGIN_FAIL, statusCode.INTERNAL_SERVER_ERROR));
});

router.get('/success', async (req, res) => {
    res.status(200).send(authUtil.successTrue(req._passport.session.user, responseMessage.LOGIN_SUCCESS));
});

module.exports = router;
