/**
 * 钱庄网
 * @name 基础js
 * @description 整站基础js模块
 * @date 2015-07-16
 * @version $V1.0$
 */
define(function (require, exports, module) {
    require('jquery');

    var cookie = require('qianModule/cookie'),
        pageUrl = require('module/ajax-map'),
        fastclick = require('module/fastclick'),
        Dialog = require('qianModule/dialog'),
        rsaEncrypt = require('module/rsaEncrypt'),
        Handlebars = require('module/handlebars-helper'),
        hybridProtocol = require('module/native-calls');

    var popAlert = new Dialog('alert'),
        popWait = new Dialog('wait');
    //--------------------------------------------------【全局变量】

    var USERPHONE = cookie.getCookie(isApp() ? 'cookie.name.user' : 'qz_h5_phone'),
        OAUTHTOKEN = cookie.getCookie(isApp() ? 'oauthToken' : 'qz_h5_oauthToken');
    var _loginLink = "http://h5.ceshi.qian360.com/interlayer.html?redirectURL=";
    var H5psd = 'https://h5.qian360.com/forgetTransPassword.html?redirectURL=';
    //--------------------------------------------------【ajax代理】
    var ajaxAgent = function (arg) {
        //架构工具会根据不同的发布环境替换`_loginLink`的值.
        var _currentLink = location.href,
            beforeFunc = arg.beforeFunc;

        return $.ajax({
            type: arg.type || "post",
            url: arg.url,
            async: arg.async && !0,
            dataType: arg.dataType || "json",
            data: $.extend(arg.data, {native_view: isApp()}),
            xhrFields: {
                withCredentials: true
            },
            beforeSend: arg.beforeSend,
            success: function (data) {
                beforeFunc && beforeFunc();
                if (data.resultCode == 0) {
                    if (data.errorCode == 'TOKEN_EXPIRED') {
                        // 弹出提醒
                        popAlert.run({
                            contStr: data.resultMsg,
                            confirmFunc: function () {
                                if (isApp()) {
                                    hybridProtocol({
                                        tagName: 'openNativePage',
                                        data: {
                                            type: 'login',
                                            url: location.href
                                        }
                                    });

                                    cookie.setCookie('cookie.name.user', '', -1);
                                    cookie.setCookie('oauthToken', '', -1);
                                } else {
                                    window.location.href = _loginLink + _currentLink;

                                    cookie.setCookie('qz_h5_phone', '', -1);
                                    cookie.setCookie('qz_h5_oauthToken', '', -1);
                                }
                            }
                        });
                    } else {

                        // 弹出提醒
                        popWait.run({
                            contStr: data.resultMsg
                        });
                    }
                    return false;
                }
                arg.success && arg.success(data);
            },
            timeout: 10000,
            error: function (xhr, errMsg, error) {
                beforeFunc && beforeFunc();
                arg.error && arg.error(xhr, errMsg, error);
            },
            complete: function (xhr, status) {
                //加载完成,隐藏加载遮罩
                if (!arg.preventLoadHide) {
                    $('#pageLoading').hide()
                }
                arg.complete && arg.complete(xhr, status);
            }
        })
    };
    //--------------------------------------------------【请求加密】

    var encryptedPwd = rsaEncrypt('10001', '9f3b85fce009d6585f5797965e1c59729a6fcbe434cfd42099c2e6e49f1bce5743d73f9678dfcd32518555449f5c5c8917e97c8c7117ad989bd789c5a5121d4cb47d468b66bbdcc547d37f4e82011ab2b20040faebb26926094f5a4a7ea0ac490c2d87aa630e4e47420edb33af88dac8552a5e9ff4062b2b01ad2c0f1d3ad3c7');

    //--------------------------------------------------【全局bug修复】

    // 解决在微信上a标签:active伪类失效的bug
    window.addEventListener('touchstart', function () {
    }, false);

    // fastclick代替zepto的tap,防止点透bug
    fastclick.attach(document.body);

    //--------------------------------------------------【app情况下超链接使用交互协议】

    if (isApp()) {
        require(['module/hyperlink']);
    }

    //--------------------------------------------------【通用谓语函数】

    //判断是否在app中
    //参数选填('ios'或'android'),如果填写则判断是否是app且在指定系统环境下
    function isApp(type) {
        var href = location.href,
            reg1 = /native\_view\=(\w*)[&|]?/ig,
            reg2 = /systemType\=(\d*)[&|]?/ig;

        // 是否需要判断设备类型,systemType的值,23是ios/24是安卓
        if (!type) {
            return !!(reg1.test(href) && RegExp.$1);

        } else {
            var systemType = reg2.test(href) && RegExp.$1;

            return (type == 'ios' && systemType == '23' || type == 'android' && systemType == '24')
        }
    }

    //判断登陆
    function isLogin() {
        var loginStart = false;
        if (USERPHONE && OAUTHTOKEN) {
            $.ajax({
                url: pageUrl.getUserInfoStatus.url,
                type: "post",
                data: {
                    oauthToken: OAUTHTOKEN,
                    appId: pageUrl.appId,
                    service: pageUrl.getUserInfoStatus.service,
                    native_view: isApp()
                },
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.resultCode !== 1) {
                        loginStart = false;
                    } else {
                        loginStart = true;
                    }
                }
            });
        } else {
            loginStart = false;
        }
        return loginStart;
    }

    //--------------------------------------------------【暴露公共方法】
    module.exports = {
        ajax: ajaxAgent,
        isApp: isApp,
        isLogin: isLogin,
        loginLink:_loginLink,
        encryptedPwd: encryptedPwd,
        H5psd:H5psd,
        pageUrl: pageUrl,
        handlebars: Handlebars,
        hybridProtocol: hybridProtocol,
        Dialog: Dialog,
        cookie: cookie,
        userInfo: {
            phone: USERPHONE,
            oauthToken: OAUTHTOKEN
        }
    }
});