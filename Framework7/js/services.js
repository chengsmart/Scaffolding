/**
 * Created by chengshuai on 2017/6/1.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description:
 */
var Service = {
    sendErrorLog: function (msg, fn) {
        $$.ajax({
            url: BASEURL_PUBLIC + 'logs/error?msg=' + msg,
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                fn();
            },
            error: function (data) {
                fn();
            }
        });
    },
    // 第三方和医生登录
    login: function (req, success, error) {
        $$.ajax({
            url: HOSTNAME + 'cdm-app/token',
            type: 'post',
            data: req,
            dataType: 'json',
            success: function (data) {
                Tools.successTip(data, success, error)
            },
            error: function (data) {
                error(data)
            }
        });
    },
    // 忘记密码
    resetPasswd: function (req, success, error) {
        $$.ajax({
            url: BASEURL_PUBLIC + 'user/resetPass',
            type: 'post',
            data: JSON.stringify(req),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                Tools.successTip(data, success, error)
            },
            error: function (data) {
                Tools.errorTip(data)
            }
        });
    },
    // 通过社保卡号发送验证码
    sendMsgBySin: function (req, success, error) {
        $$.ajax({
            url: BASEURL_PUBLIC + 'user/sendMessageBySin/' + req,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                Tools.successTip(data, success, error)
            },
            error: function (data) {
                Tools.errorTip(data)
            }
        });
    },
    // 发送验证码
    validateCode: function (req, success, error) {
        console.log(req);
        $$.ajax({
            url: BASEURL_PUBLIC + 'user/sendMessage/' + req,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                Tools.successTip(data, success, error)
            },
            error: function (data) {
                Tools.errorTip(data)
            }
        });
    },
//    注册
    register: function (req, success, error) {
        $$.ajax({
            url: BASEURL_PUBLIC + 'user/baseRegister',
            type: 'post',
            data: JSON.stringify(req),
            dataType:'json',
            contentType: 'application/json',
            success: function (data) {
                Tools.successTip(data, success, error);
            },
            error: function (data) {
                Tools.errorTip(data)
            }
        });
    },
}
