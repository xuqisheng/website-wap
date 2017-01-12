/**
 * 积分商城
 * @name 积分明细
 * @description 单页js
 * @date 2015-12-07
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        Tab = require('qianModule/tab'),
        LoadDate = require('module/load-data');

    var loadCount = 0;

    function loadingHide() {
        loadCount++;
        if (loadCount >= 2) {
            $('#pageLoading').hide();
        }
    }

    //--------------------------------------------------【查询积分数】
    base.ajax({
        url: base.pageUrl.getUserInfoStatus.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.getUserInfoStatus.service
        },
        dataType: "json",
        preventLoadHide: true,
        success: function (data) {
            $('#integralTotal').text(data.resultData.userScore);
        },
        complete: function () {
            loadingHide();
        }
    });

    //--------------------------------------------------【渲染页面】

    var tab = new Tab({
        $ctrl: $('#tabBtns a'),
        $item: $('#tabCont .cont'),
        itemIndex: 0,
        activateCls: 'on',
        beforeFn: '',
        afterFn: function (itemIndex) {

            /*
             *  对应html文件中`#tabCont .cont`的dom放了个看似多余的`.main`标签.这是个hack!
             *
             *  `LoadDate`模块中绑定的`下拉无限加载`模块的滚动条监听默认为`loadDate模块的container接口`元素的父级,
             *  如果直接把`.cont`作为`loadDate模块的container接口`则`#tabCont`是滚动条监听的层级,
             *  这样会导致两个`.cont`公用一个滚动条容器,其中`.cont`滚动了滚动条,切换到另一个会发现它也被滚动了.
             **/

            var $cont = $('#tabCont .cont').eq(itemIndex).find('.main');

            if ($cont.html()) {
                return false;
            }

            $('#pageLoading').show();

            var loadDate = new LoadDate({
                url: base.pageUrl.scoreRecordList.url, // 接口地址(必须)
                container: $cont,           // load-container 容器对象(必须)
                noListStr: '暂无记录',       // 无记录时，显示的文本(缺省)

                // 默认发送的data数据(缺省)  去除了page :1，不可为null
                sendData: {
                    oauthToken: base.userInfo.oauthToken,
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.scoreRecordList.service,

                    inOut: itemIndex == 0 ? 1 : 2   //1是转入,2是转出
                },
                tplFn: function (data) {

                    var tpl = __inline('../tpl/integralDetailList.tpl'),
                        template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异

                    return template(data.resultData);
                },   // 传入data解析成html函数
                callback: function(){   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)

                    loadingHide();
                }
            });
        }
    });
});