/**
 * Created by chengshuai on 2017/6/1.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: 扩展js原型链方法，添加常量以及常用全局变量
 */

// 检查数组中是否包含某个元素，如果包含，返回index，如果不包含，则返回false
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return i;
        }
    }
    return false;
};

var INFO = {
        userId: '' || sessionStorage.getItem('userId'),
        token: '' || sessionStorage.getItem('token')
    },
    SETTING = {
        pageSize: {
            less: 5,
            default: 10,
            more: 20
        },
        regex: {
            mobile: /^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[07])\d{8}$/, //手机号码校验
            positiveNumber: /^\d+$/, //正数
            integer: /^-?([1-9](?=0+|$)|[0-9](?!0+$))[0-9]*$/, //整数
            noZeroPositiveInteger: /^\+?[1-9][0-9]*$/, //非0的正整数
            noZeroPositiveIntegerAndFloat: /^[0-9]+([.]{1}[0-9]+){0,1}$/,//非0正整数或者浮点数
        }
    };
var BASEURL = HOSTNAME + 'cdm-app/v2/';//网络的url
var BASEURL_PUBLIC = HOSTNAME + 'cdm-app/public/v2/';//不需要授权的网络url
