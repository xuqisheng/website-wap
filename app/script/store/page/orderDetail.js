/**
 * 积分商城
 * @name 积分明细
 * @description 单页js
 * @date 2015-12-07
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter');

    //--------------------------------------------------【渲染页面】
    var tpl = __inline('../tpl/pageOrderDetail.tpl');
    var myTemplate = base.handlebars.compile(tpl);

    var searchCount = 0,
        popAlert = new base.Dialog('alert'),
        searchResult = function () {    //递归做查询
            base.ajax({
                url: base.pageUrl.myOrderDetail.url,
                type: "post",
                data: {
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.myOrderDetail.service,
                    oauthToken: base.userInfo.oauthToken,
                    orderNo: hrefParameter.get('orderNo')
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.resultCode == 2) {
                        if (searchCount < 2 && hrefParameter.get('orderNo')) {
                            searchCount++;
                            setTimeout(searchResult, 3000);
                            return false;
                        }
                    }

                    if (data.resultCode != 1) {
                        popAlert.run({
                            contStr: data.resultMsg,
                            confirmFunc: function () {
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
                            }
                        });
                        return false;
                    }
                    $('#pageBuyResult').html(myTemplate(data.resultData));
                }
            });
        };

    searchResult();

});