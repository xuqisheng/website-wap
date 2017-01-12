define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var types = hrefParameter.get('types');
    var joinQueueId = hrefParameter.get('joinQueueId');
    var popWait = new Pop('alert');
    new Vue({
        el: 'body',
        data: {
            pageLoading:false,
            stakeScore:'',
            stakeNumber:'',
            grabNumberArray:'',
            isshow:false,
            dataAdd:'',
            isrela:true,
            front:'',
            successcome:true,
            err:false,
            processed:false,
            joinId:''
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
                    url: base.pageUrl.paydetail.url+'/'+joinQueueId,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.paydetail.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        if(data.code != 'success' && data.code != 'processing'){
                            //失败
                            _this.err = true;
                            _this.successcome = false;
                            _this.processed = false;
                        }
                        if(data.code == 'processing'){
                            //处理中
                            _this.err = false;
                            _this.successcome = false;
                            _this.processed = true;
                        }
                        if(data.code == 'success'){
                            _this.joinId = data.data.joinId;
                            if(data.data.grabNumberArray.split('，').length > 5){
                                var grablength = data.data.grabNumberArray.split('，').length;
                                _this.dataAdd='';
                                _this.front='';
                                for(var j=0;j<grablength;j++){
                                    if(j<6){
                                        _this.front += data.data.grabNumberArray.split('，')[j]+'， ';
                                        _this.isshow = true;
                                    }else{
                                        //_this.dataAdd += data.data.grabNumberArray.split('，')[j]+'， ';
                                        _this.isshow = true;
                                    }
                                }
                                _this.grabNumberArray = _this.front;
                                _this.stakeNumber = data.data.stakeNumber;
                                _this.stakeScore = data.data.realPayScore;
                            }else{
                                _this.grabNumberArray =data.data.grabNumberArray;
                                _this.stakeNumber = data.data.stakeNumber;
                                _this.stakeScore = data.data.realPayScore;
                                _this.isshow = false;
                            }
                        }

                }})
            },
            allshow:function(){
                var _this = this;
                    base.ajax({
                        url: base.pageUrl.grabnumber.url + '/' + _this.joinId,
                        type: "get",
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            appId: base.pageUrl.appId,
                            service: base.pageUrl.grabnumber.service
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        dataType: "json",
                        success: function (data) {
                            var dataAdd = '';
                            var length = data.data.allGrabNumber.split('，').length;
                            for(var k=0;k<length;k++){
                                dataAdd += data.data.allGrabNumber.split('，')[k]+'， ';
                            }
                            _this.dataAdd = dataAdd;
                            _this.grabNumberArray =  _this.dataAdd;
                            _this.isrela = false;
                        }
                    });
            },
            allshowup:function(){
                var _this = this;
                _this.grabNumberArray = _this.front ;
                _this.isrela = true;
            },
            gotohome:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabpaywin')[0]+'/grab.html?id='+Id
                        }
                    });
                } else{
                    location.href = 'grab.html?id='+Id;
                }
            },
            gotobrecord:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabpaywin')[0]+'/grabrecord.html?id='+Id+'&recordType=0'
                        }
                    });
                } else{
                    location.href = 'grabrecord.html?id='+Id+'&recordType=0'
                }
            },
            gotoduobao:function(){
                //继续夺宝
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabpaywin')[0]+'/grabdetails.html?id='+Id+'&types='+types
                        }
                    });
                } else{
                    location.href = 'grabdetails.html?id='+Id+'&types='+types
                }
            },
            brack:function(){
                //刷新
                location.reload()
            }
        }
    })
});