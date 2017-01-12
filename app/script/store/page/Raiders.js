/**
 * Created by Administrator on 2016/8/25.
 */
/**
 * 手机钱庄
 * @name 绑定银行卡
 * @description 单页js
 * @date 2015-08-12
 */
define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base');
    new Vue({
        el:'body',
        data:{
            pageLoading:true,
            isApp:false
        },
        ready:function(){
            this.pageLoading = false;
            this.isApp = base.isApp('ios') ?  true : false;
        }
    })
});