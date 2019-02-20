// const moment = require('moment');

const responseMessage = require('./responseMessage');
const statusCode = require('./statusCode');

const pmsUtil = {
    successTrue: (message, data) => {
        return {
            // success: true,
            message: message,
            // error: null,
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
    }
};

module.exports = pmsUtil;