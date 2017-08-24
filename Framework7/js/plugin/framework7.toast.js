/**
 * Created by SMART on 2017/7/17.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: toast提示框
 */

Framework7.prototype.plugins.toast = function (app, params) {

    function Toast(text, onClose, options) {
        var $$ = Dom7,
            template = '<div class="tmod-toast" style="position: absolute; z-index: 13000; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, .4);"><div class="inner" style="font-size: 16px; line-height: 30px; position: absolute; z-index: 13001; top: 40%; right: 20%; left: 20%; padding: 10px; text-align: center; color: #fff; border-radius: 5px; background-color: rgba(49, 49, 49, .9);">{{text}}</div></div>', // 定义模版
            delay = options && options.duration || 13000, // 调用定义，初始化时间，默认延迟
            clickClose = options && options.clickClose || false, // 是否允许点击关闭提示
            $toast, // toast dom
            delayFn;

        // 整理入参
        var message = String(text) || '警告',
            callback = typeof onClose === 'function' ? onClose : undefined;

        showToast();

        function hideToast (callback) {
            $toast.remove();
            callback && callback()
        }
        function showToast () {
            $toast && hideToast();// 清除原有的toast
            $toast = $$(template.replace('{{text}}',message));
            $$('body').append($toast);
            delayFn = setTimeout(function () {
                hideToast(callback);
            }, delay);
            clickClose && bindClickClose(callback);
        }
        function bindClickClose (fn) {
            $toast.on('click',function () {
                clearTimeout(delayFn);
                hideToast(fn)
            })
        }
    }

    /**
     * @param text String 展示的文字内容
     * @param onClose function 关闭后触发回调
     * @param options Object 配置参数
     * @param options.duration Number 延迟时间
     * @param options.clickClose Boolean 是否允许点击关闭提示
     * */
    app.toast = function (text, onClose, options) {
        return new Toast(text, onClose, options)
    }
};
