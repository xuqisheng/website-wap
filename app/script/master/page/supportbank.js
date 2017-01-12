define(function (require, exports, module) {
    require('zepto');
    var pageUrl = require('module/ajax-map'),
        Handlebars = require('module/handlebars-helper'),
        base=require('module/base'),
        cookie=require('module/cookie');
    // 判断是否是app
    var isApp = window.location.href.indexOf('native_view') != -1 ? true : '';
    Handlebars.registerHelper("format",function(number){
        //返回+1之后的结果
        return number/10000
    });
        base.ajax({
            url: pageUrl.supportBank.url,
            type: "post",
            data: {
                native_view:isApp,
                oauthToken:cookie.getCookie('qz_h5_oauthToken')  || cookie.getCookie('oauthToken'),
                appId:pageUrl.appId,
                service:pageUrl.supportBank.service
            },
            dataType: "json",
            async: false,
            success: function (data) {
                var tpl =__inline('../tpl/supportbank.tpl');
                var myTemplate = Handlebars.compile(tpl);
                $('#supportbank').append(myTemplate(data));
            }
        });
});