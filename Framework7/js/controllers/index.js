/**
 * Created by chengshuai on 2017/6/1.
 * Email:chengshuai.tj@gmail.com
 * Author:Smart
 * Description:
 */
myApp.onPageBeforeInit('p-index', function (page) {
    var $page = $$(page.container);

    // bind your event
    $page.find('.button').on('click',function (e) {
        e.preventDefault();
        // do something
    })

});
