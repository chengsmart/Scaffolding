/**
 * Created by chengshuai on 2017/7/7.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description: 注册Template7的过滤器
 */

// 用于时间戳转换成时间格式
Template7.registerHelper('tsToString', function (timestamp,options){
    switch (options.hash.type){
        case 'day':
            return Tools.needTimeString(timestamp);
            break;
        case 'hour':
            return Tools.needTimeString(timestamp,true);
            break;
        default:
            return Tools.needTimeString(timestamp);
    }
});