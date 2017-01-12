/**
 * 手机钱庄
 * @name 申购结果
 * @description 单页js
 * @date 2015-08-03
 */
define(function (require, exports, module) {

    require('zepto');
    var base = require('module/base'),
        pageUrl = require('module/ajax-map'),
        cookie = require('module/cookie'),
        Dialog = require('module/dialog'),
        hrefParameter = require('module/href-parameter');

    module.exports = function () {

        var $pageBuyResult = $('#pageBuyResult');

        var popAlert = new Dialog('alert');

        //--------------------------------------------------【用于支付回调回来给按钮添加添加borrowId(投资失败的时候)】
        var borrowId = hrefParameter.get('borrowId');
        if (borrowId) {
            $('#revestBtn').attr('href', 'product.html?borrowId=' + borrowId + '#&pageProDetails');
        }

        //--------------------------------------------------【根据渠道id做不同的展示】
        var source = $('#sourceFrom').val();

        if (source == '白领') {

            var img = __uri('../../../image/master/buy-result/source-gift.png');
            $pageBuyResult.append('' +
                '<div class="ui-pop-frame" id="uiPopFrame">' +
                '<div class="ui-pop-main" style="padding:1.6875rem 0">' +
                '<div style="text-align: center"><i style="position: relative;display: inline-block;width: 8.7187499891rem;height: 8.7187499891rem;background-color: #eee;border-radius: 100%"><img src="' + img + '" style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width:5.2312499346rem;height:4.3312499459rem" alt=""/></i></div>' +
                '<div style="text-align: center;margin-top: 1.6875rem;color:#333;font-size:1.57499998rem">惊喜正在加载中... </div>' +
                '</div>' +
                '</div>'
            );

            var searchCount = 0,
                searchMax = 3,
                searchResult = function () {    //递归做查询
                    base.ajax({
                        url: pageUrl.getCdKeys.url,
                        type: "post",
                        data: {
                            appId: pageUrl.appId,
                            service: pageUrl.getCdKeys.service,
                            oauthToken: cookie.getCookie('qz_h5_oauthToken')
                        },
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            /*
                             * 接口说明:
                             * `data.resultCode==2`是没有查询到cdKey,因为下单后到生成cdKey有一定延迟,所以要做轮询获取.
                             **/
                            if (data.resultCode == 2) {
                                if (searchCount < searchMax - 1 && hrefParameter.get('orderNo')) {
                                    searchCount++;
                                    setTimeout(searchResult, 3000);
                                    return false;
                                }else{
                                    // 显示已兑完
                                    popAlert.run('来晚了，兑换码已领完~');
                                    return false;
                                }
                            }

                            // 显示兑换码
                            popAlert.run({
                                contStr: '<div style="font-size: 1.6875rem;color:#333">送您10元话费 </div>' +
                                '<div style="font-size:2.25rem;color:#f35c3f;line-height: 1.7;">' + data.resultData.cdKey + '</div>' +
                                '<div style="font-size: 1.349999983rem;color:#999">长按复制兑换码，进入白领聚乐部公众号<br />“我的”—“话费充值 ”领取</div>'
                            });

                            // 调整弹框样式
                            var $uiPopFrame = $('#uiPopFrame');

                            $uiPopFrame.find('.ui-pop-main').css({
                                'top': '41%'
                            });

                            var img = __uri('../../../image/master/buy-result/source-gift-succeed.png');
                            $uiPopFrame.find('.ui-pop-cont').css({
                                'background-image': 'url("' + img + '")',
                                'background-repeat': 'no-repeat',
                                'background-position': 'center .843749999rem',
                                'background-size': '18.337499977rem auto',
                                'padding-top': '12rem',
                                'padding-bottom': '1rem'
                            });

                        },
                        timeout: 1000,
                        error: function () {
                            if (searchCount < searchMax) {
                                $('#uiPopFrame').remove();
                            }
                        }
                    });
                };

            searchResult();

        }

        //--------------------------------------------------【暴露接口内存回收】
        return function () {

        }
    };
});