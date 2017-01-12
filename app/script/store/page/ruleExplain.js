/**
 * 积分商城
 * @name 积分明细
 * @description 单页js
 * @date 2015-12-07
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base');

    //--------------------------------------------------【渲染页面】
    var tpl = __inline('../tpl/pageRuleExplain.tpl');
    var myTemplate = base.handlebars.compile(tpl);

    // 在iphone的app环境下添加特定的描述文字,不然不给上架..
    base.handlebars.registerHelper("helper-ftText", function () {
        if(base.isApp('ios')){
            return new base.handlebars.SafeString('<p style="margin-top:.15rem">积分商城活动由钱庄网提供，与设备生产商Apple Inc.无关</p><p>最终解释权归杭州乾庄互联网金融服务有限公司所有</p>');
        }
    });

    $('#pageRuleExplain').html(myTemplate());
    $('#pageLoading').hide()
});