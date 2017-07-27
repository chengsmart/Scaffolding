/**
 * Created by chengshuai on 2017/7/10.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: navbar随滚动渐显效果，在需要特效的page上添加tmod-transparent-navbar类名
 */
Framework7.prototype.plugins.navbarAnimation = function (app, params) {
    var _end = params.end || 200; // 滚动到xx像素高度时候，navbar 100%填充颜色
    var _start = params.start || 50; // 从xx像素高度开始填充颜色
    function navbarAnimation() {
        $$('.tmod-transparent-navbar .page-content').on('scroll', function (e) {
            var $page = $$(this).parents('.page');
            var h = e.srcElement.scrollTop - _start;
            h = (h < 0) ? 0 : h;
            var t = h / _end;
            t = (t > 1) ? 1 : t;
            // TODO 性能优化
            $page.find('.navbar').css('background-color','rgba(247,247,248,' + t + ')');
            $page.find('.navbar .center').css('color','rgba(43,43,43,' + t + ')');
        })
    }

    return {
        hooks: {
            pageInit: navbarAnimation
        }
    };
};