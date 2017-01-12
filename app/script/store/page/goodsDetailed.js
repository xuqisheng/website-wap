/**
 * 积分商城
 * @name 商品详情页
 * @description 单页js
 * @date 2015-12-04
 */
define(function (require, exports, module) {
    require('jquery');
    var Pop = require('qianModule/dialog');
    var base = require('module/base'),
        Event = require('qianModule/event'),

        hrefParameter = require('qianModule/href-parameter');

    //--------------------------------------------------【渲染页面事件挂载】
    var alertPop = new Pop('alert');
    // 无数据
    Event.one("noData",function(){
        // 页面上的`查看其它商品`挂载返回事件
        $('#backBtn').on('click',function(){
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

    // 有数据
    Event.one("hasData",function(){
        //--------------------------------------------------【焦点图】
        var Slider = require('iSlider');
        var slideImgList = eval($('#slideImgList').val()),
            imgList = [];

        for (var i = 0, l = slideImgList.length; i < l; i++) {
            imgList.push({
                content: slideImgList[i],
                href: ''
            });
        }

        //生成焦点图的点
        slideDot();

        var slide = new Slider({
            dom: document.getElementById('goodsSlide'),
            data: imgList,

            onslidechange: function (page) {
                var liList = document.querySelectorAll('#goodsSlide ol li'),
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
                slideBox = document.getElementById('goodsSlide'),
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

        //--------------------------------------------------【马上兑换】
        var $payBtn = $('#payBtn'),
            $confirmPayBtn = $('#confirmPayBtn'),
            $confirmPop = null;

        $payBtn.on('click', function () {
            var tpl = __inline('../tpl/confirmPay.tpl');
            var myTemplate = base.handlebars.compile(tpl);

            $payBtn.text('兑换中...').addClass('disabled');


            //显示隐藏确认框
            function isShow() {
                $confirmPop.toggleClass('js_hide');
                $('#confirmMask').toggleClass('js_hide');
            }

            // DOM已经生成则直接显示
            if ($confirmPop) {
                isShow();
                $payBtn.text('马上兑换').removeClass('disabled');

                return false;
            }

            base.ajax({
                url: base.pageUrl.checkAddress.url,
                type: "post",
                data: {
                    oauthToken: base.userInfo.oauthToken,
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.checkAddress.service,

                    goodsId: goodsId
                },
                dataType: "json",
                async: false,
                success: function (data) {

                    // 没有收获地址,跳转到填写地址页
                    if (hrefParameter.get('type') == 2 && data.resultCode == 1 && !data.resultData) {
                        jumpMyAddress();

                        return false;
                    }

                    // 生成复合对象,tpl文件除了`resultData`的值还需要商品所需积分等信息
                    var compositeObj = $.extend(data.resultData, {
                        goodsId: goodsId,
                        goodsScore: goodsScore,
                        type: hrefParameter.get('type')
                    });

                    $('#payBtn').before(myTemplate(compositeObj));

                    $confirmPop = $('#confirmPop');

                    //关闭按钮
                    $confirmPop.find('.hd .close').on('click', isShow);

                    // 修改地址
                    $('#addressBtn a').on('click', function () {
                        jumpMyAddress();
                    });

                    //确认支付
                    $('#confirmPayBtn').on('click', function () {
                        $confirmPayBtn.text('支付中...').addClass('disabled');

                        base.ajax({
                            url: base.pageUrl.addScoreOrder.url,
                            type: "post",
                            data: {
                                oauthToken: base.userInfo.oauthToken,
                                appId: base.pageUrl.appId,
                                service: base.pageUrl.addScoreOrder.service,

                                goodsId: goodsId
                            },
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                location.href = 'orderDetail.html?orderNo=' + data.resultData.orderNo;
                            },
                            complete: function () {
                                $confirmPayBtn.text('确认支付').removeClass('disabled');
                            }
                        });
                    });
                },
                complete: function () {
                    $payBtn.text('马上兑换').removeClass('disabled');
                }
            });
        });

        //跳转到填写地址页
        function jumpMyAddress() {

            /* 页面原先就存在的参数(webview的通用参数),要带给下一个页面.
             * 客户端会判断url是否包含通用参数,如果没有则添加.但是这里的`redirectURL`参数已经带通用参数了.所以客户端不会再添加了.
             * 所以需要手动添加,app内嵌这个页面时需要做hack处理
             **/
            var originalParameter = '';

            if (base.isApp()) {
                originalParameter = location.href.split('?')[1] + '&';
            }

            location.href = 'myAddress.html?' + originalParameter + 'redirectURL=' + encodeURIComponent(location.href);
        }


        // 如果url参数带confirmPay=true,则自动触发马上兑换
        if (hrefParameter.get('confirmPay') == 'true') {
            $payBtn.trigger('click');
        }
    });

    //--------------------------------------------------【渲染页面】

    //存储商品id和所需积分,给生成订单请求时使用
    var goodsId = hrefParameter.get('id'),
        goodsScore = '';

    var hadDataTpl = __inline('../tpl/pageGoodsDetailed.tpl'),  // 未下架时用的模板
        noDataTpl = __inline('../tpl/pageGoodsOut.tpl');        // 已下架时用的模板

    var hadDataTemplate = base.handlebars.compile(hadDataTpl),
        noDataTemplate = base.handlebars.compile(noDataTpl);
    base.ajax({
        url: base.pageUrl.scoreGoodsDetail.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.scoreGoodsDetail.service,
            id: goodsId
        },
        dataType: "json",
        async: false,
        success: function (data) {
            // 兑换按钮
            base.handlebars.registerHelper("helper-buyBtn", function () {
                var self = this,
                    htmlStr = '';

                // 判断商品是否兑完
                if (self.quantity <= 0) {
                    htmlStr = '<a id="payBtn" class="ui-btn red off" href="javascript:;">已兑完</a>';
                    return new base.handlebars.SafeString(htmlStr);
                }

                //判断机会是否用完   0未用完   1用完
                if(self.overBuy == 1){
                    htmlStr = '<a id="payBtn" class="ui-btn red off" href="javascript:;">机会已用完</a>';
                    //alertPop.run('被人抢先一步啦，看看其他的吧~');
                    return new base.handlebars.SafeString(htmlStr);
                }

                // 判断是否已到下架时间
                if(self.autoOff && self.systemTime && self.systemTime >= self.autoOff){
                    htmlStr = '<a id="payBtn" class="ui-btn red off" href="javascript:;">您晚了一步，商品已下架</a>';
                    return new base.handlebars.SafeString(htmlStr);
                }

                //判断用户状态显示按钮
                base.ajax({
                    url: base.pageUrl.getUserInfoStatus.url,
                    type: "post",
                    data: {
                        oauthToken: base.userInfo.oauthToken,
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.getUserInfoStatus.service
                    },
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.resultData.userScore >= self.score) {
                            htmlStr = '<a id="payBtn" class="ui-btn red" href="javascript:;">马上兑换</a>';
                        } else {
                            htmlStr = '<a id="payBtn" class="ui-btn red disabled" href="javascript:;">钱币不足</a>';
                        }
                    }
                });

                return new base.handlebars.SafeString(htmlStr);
            });

            // 判断是否已下架
            if (data.resultCode !== 2) {
                goodsScore = data.resultData.score;
                $('#pageGoodsDetailed').html(hadDataTemplate(data.resultData));
                Event.trigger('hasData');

                var isPreSale = data.resultData.isPreSale,//是否预售 0 不是预售，1是预售
                    systemTime = data.resultData.systemTime, //系统时间
                    saleTime = data.resultData.saleTime,    //预售开始时间
                    number = 0;
                if(isPreSale  == 1 && saleTime > systemTime){
                    count();
                    var setInt = setInterval(function(){count()},1000)
                }
            } else {
                $('#pageGoodsDetailed').html(noDataTemplate(data.resultData));
                Event.trigger('noData');
            }
            function count(){
                number+=1000;
                var date = (new Date(saleTime)) - (new Date(systemTime))-number,//计算剩余的毫秒数
                    dd = Math.floor(date / 1000 / 60 / 60 / 24),//计算剩余的天数
                    hh = Math.floor(date / 1000 / 60 / 60 % 24),//计算剩余的小时数
                    mm = Math.floor(date / 1000 / 60 % 60);//计算剩余的分钟数
                    mm = mm < 10 ? "0"+mm : mm;
                var ss = Math.floor(date / 1000 % 60);//计算剩余的秒数
                    ss = ss < 10 ? "0"+ss : ss;
                if(date < 0 ){
                    clearInterval(setInt);
                    location.reload();
                    return ;
                }

                var htmlStr = '<a id="payBtn" class="ui-btn red" href="javascript:;"><p class="count">距离开始还剩</p><p class="count count-in">';
                if(dd > 0){
                    htmlStr += dd+'天';
                }
                htmlStr += hh+'时'+mm+'分钟'+ss+'秒'+'</p></a>';
                $('.operate-con').html(htmlStr)
            }
        }
    });
});