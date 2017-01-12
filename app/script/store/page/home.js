/**
 * 积分商城
 * @name 首页
 * @description 单页js
 * @date 2015-12-03
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        LoadDate = require('module/load-data');

    var Slider = require('module/iSlider'); // 部分安卓APP内无法捕获click 做了兼容性处理
    var slide; // slide的实例占位
    // slider 部分安卓APP内无法捕获click 做了兼容性处理 页面跳转 暴露出去全局事件
    window.jumpPage = function(url){
        if(url == 'javascript:;'){
            return;
        }
        if(base.isApp()){
            base.hybridProtocol({
                tagName: 'openWebPage',
                data: {
                    title: '',
                    url: url
                }
            });
        }else{
            location.href = url;
        }
    };
    //--------------------------------------------------【渲染页面】

    var tpl = __inline('../tpl/pageHome.tpl');
    var myTemplate = base.handlebars.compile(tpl);
    var tplin = __inline('../tpl/goodsList.tpl'),
        template = base.handlebars.compile(tplin); // 特别注明该处模版编译方法调用方式因版本而异

    // 在iphone的app环境下添加特定的描述文字,不然不给上架..
    base.handlebars.registerHelper("helper-ftText", function () {
        if(base.isApp('ios')){
            return new base.handlebars.SafeString('<p>积分商城活动由钱庄网提供，与设备生产商Apple Inc.无关</p><p>最终解释权归杭州乾庄互联网金融服务有限公司所有</p>');
        }else{
            return new base.handlebars.SafeString('<p>积分商城活动由钱庄网提供</p><p>最终解释权归杭州乾庄互联网金融服务有限公司所有</p>');
        }
    });

    //--------------------------------------------------【查询积分数】
    var referIntegral = function () {
        base.ajax({
            url: base.pageUrl.home.url,
            type: "post",
            data: {
                oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                appId: base.pageUrl.appId,
                service: base.pageUrl.home.service
            },
            dataType: "json",
            success: function (data) {
                $('#pageHome').html(myTemplate(data.resultData));
                $('#goodsList').html(template(data.resultData));
                $('#integralTotal').text(data.resultData.score);
                //sign == 0 未签到    sign == 1 已签到
                if(data.resultData.sign != 0){
                    $('.sign').hide();
                    $('.signtwo').show();
                }

                if(slide){ // slide存在的时候 要销毁这个实例 否则切换页面重新生成 slide 会有焦点错误
                    slide.destroy();
                }
                var slideImgList = eval($('#slideImgList').val()),
                    imgList = [];

                if (slideImgList) {
                    for (var i = 0, l = slideImgList.length; i < l; i++) {
                        var _url = slideImgList[i].fullRedirectUrl ?
                            slideImgList[i].fullRedirectUrl :
                            'javascript:;';
                        imgList.push({
                            content: '<a bind-event="jumpPage" hybrid-prevent="true" data-href="' + _url + '"><img src="' + slideImgList[i].fullShowUrl + '" alt=""/></a>'
                        });
                    }
                }
                slideDot();
                slide = new Slider({
                    dom: document.getElementById('homeSlide'),
                    data: imgList,
                    isVertical: false,
                    isLooping: true,
                    isAutoplay: true,
                    duration: 5000,
                    onslidechanged: function (page) {
                        var liList = document.querySelectorAll('#homeSlide ol li'),
                            liLength = liList.length;
                        for (var i = 0; i < liLength; i++) {
                            liList[i].classList.remove('on');
                        }
                        liList[page].classList.add('on');
                    }
                });

                // 生成焦点图的点
                function slideDot() {
                    var imgLength = imgList.length,
                        slideBox = document.getElementById('homeSlide'),
                        noneOl = null,
                        nodeLi = null;
                    if (imgLength > 1) {
                        noneOl = document.createElement("ol");
                        slideBox.appendChild(noneOl);
                        for (var i = 0; i < imgLength; i++) {
                            nodeLi = document.createElement("li");
                            nodeLi.appendChild(document.createTextNode(i));
                            noneOl.appendChild(nodeLi);
                        }
                        noneOl.querySelectorAll('li')[0].classList.add('on');
                    }
                }

            }
        });
    };
    referIntegral();

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
            referIntegral();
        }
    }, false);

    //生成给android点击返回时触发毁掉函数的交互协议
    base.isApp('android') && base.hybridProtocol({
        tagName: 'notify',
        data: {
            type: 'backCallback',
            callback: referIntegral
        }
    });

    //--------------------------------------------------【商品列表的数据】

    var loadDate = new LoadDate({
        url: base.pageUrl.home.url, // 接口地址(必须)
        container: '#goodsList', // load-container 容器对象(必须)
        noListStr: '暂无记录', // 无记录时，显示的文本(缺省)
        scrollBox: 'body',

        // 默认发送的data数据(缺省)  去除了page :1，不可为null
        sendData: {
            appId: base.pageUrl.appId,
            service: base.pageUrl.home.service,
            oauthToken: base.userInfo.oauthToken,
            type: 0,
            currentPage: 1,
            perNum: 12
        },
        tplFn: function (data) {
            var tpl = __inline('../tpl/goodsList.tpl'),
                template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异
            return template(data.resultData);
        },   // 传入data解析成html函数
        callback: null   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)
    });

    //--------------------------------------------------【产品列表图片懒加载】
    //require('lazyload');
    //$("#goodsList img").lazyload({
    //    container: $("#pageHome .viewport"),
    //    data_attribute: 'src',
    //    effect: "show",
    //    placeholder: __inline('../../../image/common/banner-default.png')
    //});


});