/**
 * 积分商城
 * @name 商品列表
 * @description 单页js
 * @date 2015-12-04
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        LoadDate = require('module/load-data'),
        hrefParameter=require('qianModule/href-parameter');

    //--------------------------------------------------【数据加载】
    $('#pageLoading').hide();

    var loadDate = new LoadDate({
        url: base.pageUrl.scoreGoodsList.url, // 接口地址(必须)
        container: '#goodsList', // load-container 容器对象(必须)
        noListStr: '暂无记录', // 无记录时，显示的文本(缺省)
        // 默认发送的data数据(缺省)  去除了page :1，不可为null
        sendData: {
            appId: base.pageUrl.appId,
            service: base.pageUrl.scoreGoodsList.service,
            oauthToken:base.userInfo.oauthToken,
            classes: hrefParameter.get('classes'),
            currentPage: 1,
            perNum: 12
        },
        tplFn: function (data) {
            var tpl = __inline('../tpl/goodListShop.tpl'),
                template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异

            return template(data.resultData);
        },   // 传入data解析成html函数
        callback: null   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)
    });

    var headslide=$('.headslide li ');
    var headslidebottom = $('.headslide  span');
    var type = hrefParameter.get('classes');
    var typeul = $('.headslide ul li').width();
    $('.headslide').scrollLeft((type-1)*typeul);
    headslidebottom.removeClass('iconin').eq(type-1).addClass('iconin');
    headslide.on('click',function(){
        var index = headslide.index(this)+1;
        headslidebottom.removeClass('iconin').eq(index-1).addClass('iconin');
         new LoadDate({
            url: base.pageUrl.scoreGoodsList.url, // 接口地址(必须)
            container: '#goodsList', // load-container 容器对象(必须)
            noListStr: '暂无记录', // 无记录时，显示的文本(缺省)

            // 默认发送的data数据(缺省)  去除了page :1，不可为null
            sendData: {
                appId: base.pageUrl.appId,
                service: base.pageUrl.scoreGoodsList.service,
                oauthToken:base.userInfo.oauthToken,
                classes: index,
                currentPage: 1,
                perNum: 12
            },
            tplFn: function (data) {
                var tpl = __inline('../tpl/goodListShop.tpl'),
                    template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异
                return template(data.resultData);
            },   // 传入data解析成html函数
            callback: null   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)
        });
    });

    //--------------------------------------------------【产品列表图片懒加载】
    require('lazyload');
    $("#goodsList img").lazyload({
        container: $("#pageGoodsList .viewport"),
        data_attribute:'src',
        effect : "fadeIn"
    });
});