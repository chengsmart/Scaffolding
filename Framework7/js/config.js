/**
 * Created by chengshuai on 2017/6/1.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: 初始化项目
 */

//初始化内容
var myApp = new Framework7({
    swipeBackPage: false, //禁止左滑返回
    fastClicks: false, //快速点击取消，兼容android4.3
    init: false, //取消自动初始化，首页myApp.init()手动初始化
    cache: false,
    modalTitle: '提示',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    // animatePages: false,
    // materialRipple: false,//关闭触摸涟漪，红米手机太卡
    pushState: true,  //可以使用浏览器前进后退功能
    pushStateRoot:'index.html',
    navbarAnimation:true,
    preroute: function (view, options) {// 路由拦截器
    }
});
var $$ = Framework7.$;
$$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});
var mainView = myApp.addView('.view-main');
//ajax请求用到的加载转圈效果
$$(document).on('ajaxStart', function () {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj){
    try{
        Tools.handleErr(errorMessage, scriptURI, lineNumber,columnNumber,errorObj)
    }catch(e) {
        console.warn('无法发送报错信息')
    }
};
