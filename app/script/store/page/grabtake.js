define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var types = hrefParameter.get('types');
    var popWait = new Pop('alert');
    var Num =0;
    new Vue({
        el: 'body',
        data: {
            pageLoading: false,
            isShow: false,
            lists:[],
            isMore:true,
            total:0
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            this.loader()
        },
        methods: {
            loader: function () {
                var _this = this;
                Num += 10;
                base.ajax({
                    url: base.pageUrl.join.url+'/'+types+'/'+Num,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.join.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        if(data.data.list.length <= 0){
                            _this.isShow = true;
                            _this.isMore = false;
                            return;
                        }
                        var joinList = data.data.list.length;
                        for(var i=0;i<joinList;i++){
                            var adddata = {};
                            adddata.grabState = data.data.list[i].grabState;
                            adddata.joinTime = data.data.list[i].joinTime;
                            adddata.phoneStr = data.data.list[i].phoneStr;
                            adddata.realNameStr = data.data.list[i].realNameStr;
                            adddata.stakeNumber = data.data.list[i].stakeNumber;
                            _this.lists.push(adddata)
                        }
                        _this.total = data.data.total;
                        if(_this.total - Num <= 0){
                            _this.isMore = false;
                        }
                    }
                })
            },
            isMores:function(){
                var _this = this;
                _this.loader();
            }
        }
    })
});