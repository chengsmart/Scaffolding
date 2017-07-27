/**
 * Created by SMART on 2017/7/17.
 * * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: 用于阻止安卓返回键
 */



Framework7.prototype.plugins.stopBack = function (app, params) {

    function backButton() {
        document.addEventListener("backbutton", function () {

        }, false);
    }

    return {
        hooks: {
            pageInit: backButton
        }
    };
};
