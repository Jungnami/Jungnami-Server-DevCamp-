var jwt = require('../../auth/module/jwt');
const client = require('../../auth/module/redis');

const responseMessage = require('./responseMessage');
const statusCode = require('./statusCode');

const authUtil = {
    successTrue: (message, data) => {
        return {
            success: true,
            message: message,
            error: null,
            data: data
        }
    },
    successFalse: (err, message, status) => {
        if (!err && !message) {
            message = 'data not found';
        }
        return {
            status : status,
            success: false,
            message: message,
            errors: (err) ? authUtil.parseError(err) : null,
            data: null
        }
    },
    parseError: (errors) => { 
        var parsed = {};
        if (errors.name == 'ValidationError') {
            for (var name in errors.errors) {
                var validationError = errors.errors[name];
                parsed[name] = {
                    message: validationError.message
                };
            }
        } else if (errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
            parsed.username = {
                message: 'This username already exists!'
            };
        } else {
            parsed.unhandled = errors;
        }
        return parsed;
    },
    isLoggedin: async (req, res, next) => {
        var token = req.headers['token'];

        if (!token) {
            return res.json(authUtil.successFalse(null, responseMessage.EMPTY_TOKEN, statusCode.AUTH_BAD_REQUEST));
        } else {
            const user = jwt.verify(token);
            
            if (user == -3) {
                return res.json(authUtil.successFalse(null, responseMessage.INVALID_TOKEN, statusCode.AUTH_BAD_REQUEST));
            } else if (user == -2) {
                return res.json(authUtil.successFalse(null, responseMessage.EMPTY_TOKEN, statusCode.AUTH_BAD_REQUEST));
            } else {
                req.decoded = user;
                next();
            }
        }
    },
    isAdmin: async (req, res, next) => {
        await authUtil.isLoggedin(req, res, next);
        const user = req.decoded;

        if (user.grade != 0) {
            return res.json(authUtil.successFalse(null, responseMessage.NOT_ADMIN, statusCode.AUTH_BAD_REQUEST));
        } 
        next();
    }
};

module.exports = authUtil;