define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var types = hrefParameter.get('types');
    var popWait = new Pop('alert');
    new Vue({
        el: 'body',
        data: {
            pageLoading: false,
            isShow: false,
            lists: {
                luckyNumber:0,
                fivePeriod:'',
                lottoPeriod: '',
                lottoNumber:'',
                fiveNumber:""
            },
            isMore: true
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            this.loader()
        },
        methods: {
            loader: function () {
                var _this = this;
                base.ajax({
                    url: base.pageUrl.calc.url + '/' + types,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.calc.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        _this.lists.fiveNumber = data.data.fiveNumber;
                        _this.lists.fivePeriod = data.data.fivePeriod;
                        _this.lists.lottoNumber = data.data.lottoNumberCalc;
                        _this.lists.lottoPeriod = data.data.lottoPeriod;
                        _this.lists.luckyNumber = data.data.luckyNumber;
                    }
                })
            },
            dlt:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:'http://www.lottery.gov.cn/dlt/index.html'

                        }
                    });
                } else{
                    location.href = 'http://www.lottery.gov.cn/dlt/index.html'
                }
            },
            pls:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:'http://www.lottery.gov.cn/plwf/index.html'
                        }
                    });
                } else{
                    location.href = 'http://www.lottery.gov.cn/plwf/index.html'
                }
            }
        }
    })
});