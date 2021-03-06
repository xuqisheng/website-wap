/**
 * 手机钱庄
 * @name 在投资金
 * @description 单页js
 * @date 2015-08-11
 */
define(function (require, exports, module) {

    require('zepto');
    var hrefParameter=require('module/href-parameter'),
        hybridProtocol = require('module/native-calls'),
        DateFormat=require('module/date-format');

    // 这里没有做路由,而是直接在页面js上载入数据,所以不需要暴露模块接口给路由js调用
    //module.exports = function () {
    //--------------------------------------------------【渲染页面】
    var isApp = hrefParameter.get('native_view'),
        sysTime = hrefParameter.get('sysTime'),
        formatTime = DateFormat.format(-(-sysTime), 'yyyy-MM-dd HH:mm');
    $('#resultData').html(formatTime);
    $('#pageLoading').remove();

    $('#enter').on('click', function(){
        if(isApp){
            hybridProtocol({
                tagName: 'openNativePage',
                data: {
                    type:'userAccount',
                    url:window.location.href
                }
            });
        }else{
            window.location.href = 'https://h5.qian360.com/#&pageUser'
        }
    });
    //--------------------------------------------------【暴露接口内存回收】
    return function () {

    };
    //};
});
