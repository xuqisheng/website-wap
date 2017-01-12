/**
 * 手机钱庄
 * @name 账户余额
 * @description 单页js
 * @date 2015-08-10
 */
define(function (require, exports, module) {

    require('page/transferHelp');
    var base = require('module/base');

    if(base.isApp()){
        $('.nav-item a').on('click', function(){
            var that = $(this),
                title = that.attr('title'),
                url = location.protocol + '//' + location.host + that.attr('href');
            base.hybridProtocol({
                tagName: 'openWebPage',
                data: {
                    title: title,
                    url: url
                }
            });
            return false;
        })
    }
});
