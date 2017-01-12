define(function (require, exports, module) {

    //--------------------------------------------------【模块导入】
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter'),
        loadList = require('module/loadList');
    var Id = hrefParameter.get('id');
    var popWait = new Pop('wait');
    new Vue({
        el: 'body',
        data: {
            pageLoading: true,                                                       //加载loading
            money: 0,                                                                //用户金额
            isLogin: base.isLogin(),                                                 //是否登入
            sysTime: 8,                                                              //系统时间
            Raiders: false,
            indexAdd: null,                                                          //竞猜内循环列表值
            poker: false,
            isYes: false,
            imgsrc: __uri('../../../image/store/banner/guess-default.png'),
            backgroundColor: {
                backgroundColor: '#a091d6'
            },
            lists: [],
            isApp: false,
            needTip: true
        },
        computed: {},
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            _this.loader();
        },
        methods: {
            loader: function () {
                var _this = this;
                if (Id == '') {
                    //popWait.run({
                    //    contStr: '类型错误'
                    //});
                    return;
                }
                new loadList({
                    wrap: $('#guessrpublish .viewport')[0],
                    ajax: {
                        url: base.pageUrl.lastpublish.url,
                        type: 'get',
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            appId: base.pageUrl.appId,
                            service: base.pageUrl.topicid.service,
                            id: Id
                        },
                        success: function (data, next) {
                            var datalength = data.data.list.length ;
                            if (datalength <= 0) {
                                return false;
                            }
                            for (var i = 0; i < datalength; i++) {
                                var answer_during = data.data.list[i].answerDuring,                 //题目答题区段
                                    resultContent = data.data.list[i].guessState,                   //竞猜题目状态(0未公布1已公布)
                                    itemContent = data.data.list[i].itemContent,                    //题目内容
                                    resultRewardId = data.data.list[i].resultRewardId;              //公布答案id
                                var dataAdd = {};
                                var dataarr = [];
                                for (var j = 0; j < data.data.list[i].rewardList.length; j++) {
                                    dataAdd = {};
                                    var optionContent = data.data.list[i].rewardList[j].optionContent,    //选项内容
                                        ListId = data.data.list[i].rewardList[j].id;                      //投注id
                                        dataAdd.ListId = ListId;
                                        dataAdd.optionContent = optionContent;
                                        dataarr.push(dataAdd)
                                }
                                var list = {
                                    'title': itemContent,
                                    'time': answer_during,
                                    'Answertheanswer': resultContent,
                                    'resultRewardId': resultRewardId,
                                    'data': dataarr
                                };
                                _this.lists.push(list);
                                setTimeout(next, 500)
                            }
                        },
                        complete:function(){

                        }
                    }
                })
            }
        }
    })
});