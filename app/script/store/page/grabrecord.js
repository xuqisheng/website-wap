define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var recordType = hrefParameter.get('recordType');
    var Num = 0;
    new Vue({
        el: 'body',
        data: {
            pageLoading: true,                                                       //加载loading
            money: 0,                                                                //用户金额
            isLogin: base.isLogin(),
            arrs: [],
            showData:true,
            more:true,
            istrue:true,
            cut:false,
            cat:false,
            joinId:'',
            number:0
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            _this.istrue = recordType == 1 ?  false : true;
            this.loader()
        },
        methods:{
            loader: function(){
                var _this = this;
                Num += 10;
                base.ajax({
                    url: base.pageUrl.record.url+'/'+Id+'/'+recordType+'/'+Num,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.record.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        if(_this.cut || _this.cat){
                            _this.arrs =[];
                            _this.cut = false;
                            _this.cat = false;
                        }
                        var dataAdd={};
                        var datadetailList = [];
                        var datadetailListArr = {};
                        var datalist = data.data.list.length;
                        var total = data.data.total;                                //总条数
                        if(datalist <= 0){
                            _this.showData = false;
                            return ;
                        }else{
                               _this.showData = true;
                        }
                        for(var i=0;i<datalist;i++){
                            dataAdd={};
                            datadetailList = [];
                            dataAdd.myGrabState = data.data.list[i].myGrabState;           //用户夺宝状态(-1夺宝结束，等待揭晓,0等待揭晓1中奖2未中奖3夺宝失败,钱币返还)
                            dataAdd.goodsName = data.data.list[i].goodsName;               //商品名称
                            dataAdd.luckyNumber = data.data.list[i].luckyNumber;           //中奖号码
                            dataAdd.publishTime = data.data.list[i].publishTime;           //揭晓时间
                            dataAdd.grabGoodsId = data.data.list[i].grabGoodsId;            //中奖id
                            if(data.data.list[i].detailList){        //多条记录
                               var detailList = data.data.list[i].detailList.length;
                               for(var j=0;j<detailList;j++){
                                   datadetailListArr = {};
                                   datadetailListArr.joinTime = data.data.list[i].detailList[j].joinTime;                 //参与时间
                                   datadetailListArr.stakeNumber = data.data.list[i].detailList[j].stakeNumber;           //参与份数
                                   datadetailListArr.stakeScore = data.data.list[i].detailList[j].realPayScore;             //实付钱币
                                   datadetailListArr.joinId =  data.data.list[i].detailList[j].joinId;                     //参与id
                                   datadetailListArr.isShow = true;
                                   if(data.data.list[i].detailList[j].grabNumber.split('，').length > 5){
                                       var grablength = data.data.list[i].detailList[j].grabNumber.split('，').length;
                                       datadetailListArr.front = '';
                                       datadetailListArr.after = '';
                                       //前6个夺宝号码
                                       for(var k=0;k<grablength;k++){
                                           if(k<6){
                                               datadetailListArr.front += data.data.list[i].detailList[j].grabNumber.split('，')[k]+'，';
                                           }else{
                                               //datadetailListArr.after += data.data.list[i].detailList[j].grabNumber.split('，')[k]+'，';
                                           }
                                       }
                                       datadetailListArr.grabNumber = datadetailListArr.front;
                                       datadetailListArr.all = true;
                                   }else{
                                       datadetailListArr.grabNumber = data.data.list[i].detailList[j].grabNumber;           //夺宝号码
                                       datadetailListArr.all = false;
                                   }
                                   datadetailList.push(datadetailListArr)
                               }
                                var list ={
                                    'datadetailList':datadetailList,
                                    'myGrabState': dataAdd.myGrabState,
                                    'goodsName': dataAdd.goodsName,
                                    'luckyNumber': dataAdd.luckyNumber,
                                    'publishTime': dataAdd.publishTime,
                                    'grabGoodsId':dataAdd.grabGoodsId,
                                    'layers':true
                                };
                                _this.arrs.push(list);
                            }else{
                                dataAdd.joinTime = data.data.list[i].joinTime;                 //参与时间
                                dataAdd.stakeNumber = data.data.list[i].stakeNumber;           //参与份数
                                dataAdd.stakeScore = data.data.list[i].realPayScore;             //实付钱币
                                dataAdd.isShow = true;
                                if(data.data.list[i].grabNumber.split('，').length > 5 ){
                                    var grablength = data.data.list[i].grabNumber.split('，').length;
                                    dataAdd.front='';
                                    dataAdd.after = '';
                                    for(var j=0;j<grablength;j++){
                                        if(j<6){
                                            dataAdd.front += data.data.list[i].grabNumber.split('，')[j]+'，';
                                        }else{
                                            //dataAdd.after += data.data.list[i].grabNumber.split('，')[j]+'，';
                                        }
                                    }
                                    dataAdd.grabNumber = dataAdd.front;
                                    dataAdd.all = true;
                                } else{
                                    dataAdd.grabNumber = data.data.list[i].grabNumber;           //夺宝号码
                                    dataAdd.all = false;
                                }
                                dataAdd.layers = false;
                                _this.arrs.push(dataAdd);
                            }
                        }
                        _this.more = total - Num <= 0 ? false:true
                    }
                });
                _this.pageLoading = false;

            },
            all:function(i,j){
                var _this = this;
                    base.ajax({
                        url: base.pageUrl.grabnumber.url + '/' + _this.arrs[i].datadetailList[j].joinId,
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
                            //var dataAdd = '';
                            //var length = data.data.allGrabNumber.split('，').length;
                            //for(var k=0;k<length;k++){
                            //    dataAdd += data.data.allGrabNumber.split('，')[k]+'，';
                            //}
                            //_this.arrs[i].after = dataAdd;
                            _this.arrs[i].grabNumber = data.data.allGrabNumber;
                            _this.arrs[i].all = true;
                            _this.arrs[i].isShow = false;
                        }
                    });
            },
            allup:function(i){
                var _this = this;
                _this.arrs[i].grabNumber = _this.arrs[i].front ;
                _this.arrs[i].all = true;
                _this.arrs[i].isShow = true;
            },
            alls:function(i,j){
                var _this = this;
                //剩下的夺宝号码
                    base.ajax({
                        url: base.pageUrl.grabnumber.url + '/' + _this.arrs[i].datadetailList[j].joinId,
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
                            _this.number++;
                            //var dataAdd = '';
                            //var length = data.data.allGrabNumber.split('，').length;
                            //for(var k=0;k<length;k++){
                            //    dataAdd += data.data.allGrabNumber.split('，')[k]+'，';
                            //}
                            //_this.arrs[i].datadetailList[j].after = dataAdd;
                            _this.arrs[i].datadetailList[j].grabNumber =data.data.allGrabNumber;
                            _this.arrs[i].datadetailList[j].all = true;
                            _this.arrs[i].datadetailList[j].isShow = false;
                        }
                    });
            },
            allsup:function(i,j){
                var _this = this;
                _this.arrs[i].datadetailList[j].grabNumber = _this.arrs[i].datadetailList[j].front;
                _this.arrs[i].datadetailList[j].all = true;
                _this.arrs[i].datadetailList[j].isShow = true;
            },
            mores:function(){
                var _this = this;
                _this.loader()
            },
            underway:function(){
                var _this = this;
                if(recordType == 0){
                    return ;
                }else{
                    _this.istrue = true
                }
                _this.cut = true;
                _this.cat = false;
                recordType = 0 ;
                Num = 0;
                _this.loader()
            },
            announce:function(){
                var _this = this;
                if(recordType == 1){
                    return ;
                }else{
                    _this.istrue = false
                }
                _this.cat = true;
                _this.cut = false;
                recordType = 1 ;
                Num = 0;
                _this.loader()
            },
            grabbask:function(i){
                var _this = this;
                var grabGoodsId = _this.arrs[i].grabGoodsId;
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabrecord')[0]+'/grabbask.html?types='+grabGoodsId+'&id='+Id
                        }
                    });
                } else{
                    location.href = 'grabbask.html?types='+grabGoodsId+'&id='+Id;
                }
            },
            gotodetails:function(i){
                //跳转商品详情
                var _this = this;
                var grabGoodsId = _this.arrs[i].grabGoodsId;
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabrecord')[0]+'/grabparticulars.html?types='+grabGoodsId+'&id='+Id
                        }
                    });
                } else{
                    location.href = 'grabparticulars.html?types='+grabGoodsId+'&id='+Id;
                }
            }
        }
    })
});