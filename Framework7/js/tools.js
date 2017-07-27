/**
 * Created by chengshuai on 2017/6/1.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: 定义了所有工具类
 */

var Tools = {
    // 统一设置ajax的请求头
    setToken:function (xhr) {
        if(!INFO.token){
            mainView.router.loadPage('login.html');
            return;
        }
        xhr.setRequestHeader('Authorization',INFO.token)
    },
    // 登录后保存token，如果不传参则为登出
    saveToken:function (token) {
        if(token){
            INFO.token = token;
            sessionStorage.setItem('token',token);
        }else{
            INFO.token = '';
            sessionStorage.removeItem('token');
            mainView.router.loadPage('index.html');
        }
    },
    // 保存userId和userStatus，如果不传参则删除
    saveUserInfo:function (userId, userStatus) {
        if(userId){
            INFO.userId = userId;
            INFO.userStatus = userStatus;
            sessionStorage.setItem('userId',userId);
            sessionStorage.setItem('userStatus',userStatus);
        }else{
            INFO.userId = '';
            INFO.userStatus = '';
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userStatus');
        }
    },
    // 保存配送员id
    saveThirdInfo:function (thirdId) {
        if(thirdId){
            INFO.thirdId = thirdId;
        }else{
            INFO.thirdId = '';
        }
    },
    //时间戳转换成yyyy-mm-dd
    needTimeString: function (str, status) { //status为true时，返回的时间格式含有小时分秒
        var now = new Date(parseInt(str));
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (status) {
            return this.getTodayString(year, month, date) + " " + hour + ":" + minute + ":" + second;
        } else {
            return this.getTodayString(year, month, date)
        }
    },
    // 获取今天日期
    getTodayString: function (year, month, day) { //传参则进行整理，缺任意参数均为获取当天日期
        var _today = new Date();
        var _year, _month, _date;
        if (year && month && day) {
            _year = year;
            _month = month;
            _date = day;
        } else {
            _year = _today.getFullYear();
            _month = _today.getMonth() + 1; //月份从0开始
            _date = _today.getDate();
        }
        if (_month < 10) {
            _month = '0' + _month;
        }
        if (_date < 10) {
            _date = '0' + _date;
        }
        return _year + '-' + _month + '-' + _date;
    },
    // 统一错误提示
    errorTip: function (msg) {
        switch (msg.status) {
            case 204:
                console.warn('204');
                break;
            case 401:
                console.warn('未授权');
                // 未授权跳转登录页面
                myApp.alert('请您重新登录','登录超时',function () {
                    mainView.router.loadPage('login.html?status=unAuth');
                });
                break;
            case 500:
                myApp.alert('请稍后再试', '服务器内部错误');
                break;
            default:
                Tools.handleErr(msg, msg.requestUrl, 'AJAX报错');
                break;
        }
    },
    //判断接口状态方法，适用于AJAX成功时，判断resCode的状态
    successTip: function (data, successFn, errorFn) {
        data.errCode ? (errorFn ? errorFn(data) : myApp.alert(data.message, '数据错误')): (successFn && successFn(data));
    },
    //便签窗口 弹出提示
    warningTag: function (element, elementValue, fn) {
        //element = 当前页面id(#page_home) elementValue = 提示内容 fn = 提示后执行fn
        $$(element).append('<div class="tmod-warning">' +
            '<div class="inner">' + elementValue + '</div>' +
            '</div>');
        $$('.tmod-warning').show();
        setTimeout(function () {
            $$('.tmod-warning').hide();
            $$('.tmod-warning').remove();
            if (fn) {
                fn()
            }
        }, 1300)
    },
//报错信息采集
    handleErr: function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        var logTime = new Date().getTime(),
            line = '==================================================================================================================================================================================================',
            style = 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:1em;line-height:1;overflow:hidden; white-space: nowrap; text-overflow: ellipsis; -ms-text-overflow: ellipsis; word-break: keep-all; -ms-word-break: keep-all;';

        var msg = '【javascript错误】### 报错时间: ' + logTime + ' ### 错误信息: ' + JSON.stringify(errorMessage) + ' ### URL: ' + scriptURI + ' ### 在' + lineNumber + '行数: ' + columnNumber + '列' + ' ### 详细信息' + errorObj + '========JavaScript错误========';
        // send to server
        Service.sendErrorLog(msg,function () {
            console.group('javascript错误');
            console.log('%c' + line , style);
            console.log('报错时间：' + logTime);
            console.log('报错信息：' + JSON.stringify(errorMessage));
            console.log('报错URL：' + scriptURI);
            console.log('第' + lineNumber + '行，第' + columnNumber + '列');
            console.log('详细信息：' + errorObj);
            console.log('%c' + line , style);
            console.groupEnd();
        })
    },
//定义一个比较器,用于排序对象数组,倒序排列，如需正序，第二个参数传输true
    compare: function (propertyName, ascending) {
        return function (obj1, obj2) {
            var value1 = obj1[propertyName];
            var value2 = obj2[propertyName];
            if (value2 > value1) {
                if (ascending) {
                    return -1;
                } else {
                    return 1;
                }
            }
            else if (value2 < value1) {
                if (ascending) {
                    return 1;
                } else {
                    return -1;
                }
            }
            else {
                return 0;
            }
        }
    },
    //时间字符串转换为时间戳
    timeStrToStamp: function (str) {
        var timeArr = str.split('-');
        var stamp = new Date(Date.UTC(timeArr[0], timeArr[1]-1, timeArr[2]));
        return stamp.getTime();
    },
    //判断对象是否为空
    isEmpty:function (obj) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    },
    //验证输入长度是否符合要求
    judgeInputValid: function (msg, maxLength) {
        var strLength = 0;
        var str = msg.trim();
        for ( var i = 0; i < str.length; i++) {
            if (this.isChinese(str.charAt(i))){//中文占两个字符
                strLength +=2;
            } else {//英文占一个字符
                strLength ++;
            }
        }
        return strLength > maxLength ? false : true;
    },
    //检测是否为中文字符
    isChinese: function (str) {
        var reg = /[\u0000-\u00FF]/;
        return !reg.test(str);
    },
    checkPhone: function (phone) {
        var isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/;
        var isChinaUnion  = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/;
        //var isChinaTelcom = /^(?:133|153|177|18[019])\d{8}$/; //1349号段
        //var isOtherTelphone   = /^170([059])\d{7}$/;//其他运营商
        if(isChinaMobile.test(phone)){
            return '移动';
        }
        else if(isChinaUnion.test(phone)){
            return  '联通';
        }
        else{
            return '其他'
        }
    },
    //查询小区列表并编译小区列表弹出层
    getNeighbourhoodList : function (id, callback) {
        Service.getRegion(id, function (data) {
            var compiledTemplate = Template7.compile($$('#tpl-popup-neighbourhood-list').html())
            var popHtml = compiledTemplate({'list': data[0].regions})
            callback && callback(popHtml)
        }, function (error) {
            Tools.warningTag(page.container, error.message);
        });
    }
}
