/**
 * 积分商城
 * @name 积分明细
 * @description 单页js
 * @date 2015-12-07
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter'),
        LoadDate = require('module/load-data');

    //--------------------------------------------------【渲染页面】

    $('#pageLoading').hide();
    var activityCode =  hrefParameter.get('activityCode');

    var loadDate = new LoadDate({
        url: base.pageUrl.drawRecord.url, // 接口地址(必须)
        container: '#prizeRecordList', // load-container 容器对象(必须)
        noListStr: '暂无记录', // 无记录时，显示的文本(缺省)
        // 默认发送的data数据(缺省)  去除了page :1，不可为null
        sendData: {
            appId: base.pageUrl.appId,
            service: base.pageUrl.drawRecord.service,
            oauthToken: base.userInfo.oauthToken,
            activityCode: activityCode
        },
        tplFn: function (data) {   // 传入data解析成html函数
            var tpl = __inline('../tpl/prizeRecord.tpl'),
                template = base.handlebars.compile(tpl); // 特别注明该处模版编译方法调用方式因版本而异
            // 兑换按钮
            base.handlebars.registerHelper("helper-target", function () {
                var htmlStr = '';
                switch (this.type) {
                    case 2:
                        htmlStr = '已增加至钱币总数';
                        break;
                    case 3:
                        htmlStr = '已发放至“资产-我的红包”';
                        break;
                    case 4:
                    case 5:
                        htmlStr = '去“我的订单”查看具体信息';
                }

                return new base.handlebars.SafeString(htmlStr);
            });

            return template(data.resultData);
        },
        callback: null   // 载入完成后的回调函数(缺省)(用于绑定事件，注意尽量事件委托，并注意先off，免得重复绑定)
    });

    //--------------------------------------------------【返回按钮】
    $('#backBtn').on('click', function () {
        if (base.isApp()) {
            base.hybridProtocol({
                tagName: 'history',
                data: {
                    go: '-1'
                }
            });
        } else {
            history.go(-1);
        }
    });
});