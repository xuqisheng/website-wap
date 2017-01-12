/**
 * 手机钱庄
 * @name 在投资金
 * @description 单页js
 * @date 2015-08-11
 */
define(function (require, exports, module) {

    require('zepto');
    var pageUrl = require('module/ajax-map'),
        base=require('module/base'),
        cookie=require('module/cookie'),
        Handlebars = require('module/handlebars-helper'),
        hrefParam = require('module/href-parameter'),
        hybridProtocol = require('module/native-calls');

    var isApp = hrefParam.get('native_view') ? true : false,
        oauthToken = isApp ? hrefParam.get('oauthToken') : cookie.getCookie('qz_h5_oauthToken');

    // 正式环境和测试环境 地址监听
    var curPageUrl = window.location.href;
    var reg = /(test\d*)/gi,
        isTest = reg.exec(location.href);
    var h5Url = isTest !== null ? 'http://h5.'+isTest[0]+'.qian360.com/' : 'https://h5.qian360.com/',
        mallUrl = isTest !== null ? 'http://mall.'+isTest[0]+'.qian360.com/' : 'https://mall.qian360.com/',
        qian360Url = isTest !== null ? 'http://'+isTest[0]+'.qian360.com/' : 'https://www.qian360.com/';

    //module.exports = function () {
    //--------------------------------------------------【渲染页面】
    var tpl =__inline('../tpl/pageTaskCenter.tpl');
    var myTemplate = Handlebars.compile(tpl);
    function renderEvent(){
        if(!$('#pageLoading')[0]){
            $('body').append($('<section id="pageLoading"></section>'))
        }
        base.ajax({
            url: pageUrl.taskCenter.url,
            type: "post",
            data: {
                oauthToken:oauthToken,
                appId:pageUrl.appId,
                service:pageUrl.taskCenter.service
            },
            dataType: "json",
            async: false,
            success: function (data) {
                $('#pageTaskCenter').html(myTemplate(data.resultData));
                if($('#pageLoading')[0]){
                    $('#pageLoading').remove();
                }
                events();
            }
        });
    }
    renderEvent();
    //iOS ViewController更新数据
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        state = "webkitVisibilityState";
    }
    document.addEventListener(visibilityChange, function () {
        if (document[state] == "visible") {
            renderEvent();
        }
    }, false);

    //生成给android点击返回时触发毁掉函数的交互协议
    base.isApp('android') && base.hybridProtocol({
        tagName: 'notify',
        data: {
            type: 'backCallback',
            callback: renderEvent
        }
    });
    //--------------------------------------------------【方法】
    //跳转app原生页面
    var goPage = function(type,url){
        hybridProtocol({
            tagName: 'openNativePage',
            data: {
                type:type,
                url:url
            }
        });
    };
    // 跳转web页面 app 和 web 兼容
    function goWebPage(url, title){
        if(isApp){
            hybridProtocol({
                tagName: 'openWebPage',
                data: {
                    title: title || '',
                    url: url
                }
            });
        }else{
            window.location.href = url;
        }
    }
    //签到
    function signIn(){
        goWebPage(mallUrl+'sign.html')
    }
    //注册
    function register(){
        if(isApp){
            goPage('login', curPageUrl);
        }else{
            window.location.href = h5Url + 'interlayer.html?redirectURL=' + curPageUrl;
        }
    }
    //实名
    function realName(){
        if(isApp){
            goPage('realNamePage', curPageUrl);
        }else{
            window.location.href = h5Url + 'realName.html';
        }
    }
    //投资
    function invest(){
        if(isApp){
            goPage('productList', curPageUrl);
        }else{
            window.location.href = h5Url + '#&pageProList';
        }
    }
    //邀请
    function invite(){
        if(isApp){
            goWebPage(qian360Url+'activity/springThunder/invitFriend.html?oauthToken='+oauthToken, '邀请好友一起拿红包');
        }else{
            window.location.href = qian360Url+'activity/springThunder/invitFriend.html?oauthToken='+oauthToken;
        }
    }
    //--------------------------------------------------【方法绑定】
    function events(){
        $('.j-checkIn').on('click', signIn);
        $('.j-register').on('click', register);
        $('.j-realName').on('click', realName);
        $('.j-invest').on('click', invest);
        $('.j-invite').on('click', invite);
    }
    //};
});
