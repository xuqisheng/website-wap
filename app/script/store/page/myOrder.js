/**
 * 积分商城
 * @name 我的订单
 * @description 单页js
 * @date 2015-12-08
 */
define(function (require, exports, module) {
    require('jquery');

    var base=require('module/base'),
        LoadDate = require('module/load-data');
    var hrefParameter = require('qianModule/href-parameter');
    //--------------------------------------------------【商品列表的数据】
    var loadDate = new LoadDate({
        url: base.pageUrl.myOrderList.url, // 接口地址(必须)
        container: '#goodsList', // load-container 容器对象(必须)
        noListStr: '暂无记录', // 无记录时，显示的文本(缺省)
        // 默认发送的data数据(缺省)  去除了page :1，不可为null
        sendData: {
            appId: base.pageUrl.appId,
            service: base.pageUrl.myOrderList.service,
            oauthToken:base.userInfo.oauthToken,

            currentPage: 1,
            perNum: 12
        },
        tplFn: function (data) {
            base.handlebars.registerHelper("checkAddress", function (hasAddress,type) {
                var _html = 'orderDetail.html?orderNo=';
                if(hasAddress ==0 && type ==2){
                    _html = 'myaddin.html?orderNo='
                }
                return new base.handlebars.SafeString(_html);
            });
            var tpl = __inline('../tpl/myOrderList.tpl'),
                template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异

            return template(data.resultData);
        },   // 传入data解析成html函数
        callback: function(){   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)

            //加载完成,隐藏加载遮罩
            $('#pageLoading').hide();
            //页面跳转填写收货地址
            var btn = $('.btn');
            btn.on('click',function(){
                var orderNo = $(this).next().attr('data-id');
                if (base.isApp()) {
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            url: location.origin + '/myaddin.html?orderNo='+orderNo,
                            title: ''
                        }
                    });
                } else {
                    location.href = 'myaddin.html?orderNo='+orderNo
                }
            })
        }
    });

    //iOS ViewController更新积分和新纪录红点
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
            location.reload();
        }
    }, false);

    //生成给android点击返回时触发毁掉函数的交互协议
    base.isApp('android') && base.hybridProtocol({
        tagName: 'notify',
        data: {
            type: 'backCallback',
            callback: function(){
                location.reload();
            }
        }
    });

});