/**
 * 手机钱庄
 * @name 绑定银行卡
 * @description 单页js
 * @date 2015-08-12
 */
define(function (require, exports, module) {

    //--------------------------------------------------【模块导入】
     require('module/vue');
    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter'),
        Pop = require('qianModule/dialog');
    var id =  hrefParameter.get('Id');
    var recordType = hrefParameter.get('recordType');
    var popWait = new Pop('wait');
    var Num = 10;
    new Vue({
        el:'body',
        data:{
            Record:false,
            more:true,
            arrs:[],
            isband:true,
            message:'',
            istrue:true,
            cut:false,
            cat:false
        },
        computed:{

        },
        ready:function(){
            var _this = this;
            if(recordType == 1){
                _this.istrue = false;
            }
            base.ajax({
                url: base.pageUrl.history.url+'/'+id+'/'+recordType+'/'+10,
                type: "get",
                data: {
                    oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.checkInH5.service
                },
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                success: function (data) {
                    if(data.code != 'success'){
                        popWait.run({
                            contStr: data.msg
                        });
                        return ;
                    }
                    var dataAdd={};
                    var datalist = data.data.list.length;
                    var total = data.data.total;                                //总条数
                    if(datalist <= 0){
                        _this.Record = true;
                        _this.isband = false;
                        return ;
                    }else{
                        _this.Record = false;
                        _this.isband = true;
                    }
                    for(var i=0;i<datalist;i++){
                        dataAdd={};
                        dataAdd.title = data.data.list[i].itemContent;            //题目内容
                        dataAdd.resultContent = data.data.list[i].resultContent;          //正确答案
                        dataAdd.stakeScore = data.data.list[i].stakeScore;             //所压积分
                        dataAdd.rewardScore = data.data.list[i].rewardScore;            //猜中获得积分
                        dataAdd.answerContent = data.data.list[i].answerContent;          //所猜答案
                        dataAdd.answerTime = data.data.list[i].answerTime;             //时间区段
                        dataAdd.answerState = data.data.list[i].answerState;            //是否猜中
                        _this.arrs.push(dataAdd)
                    }
                    if(total - 10 <= 0){
                        _this.more = false;
                    }
                }
            });
            _this.pageLoading = false;
        },
        methods:{
            addmore:function(){
                var _this = this;
                Num+=10;
                base.ajax({
                    url: base.pageUrl.history.url+'/'+id+'/'+recordType+'/'+Num,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.checkInH5.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    beforeSend:function(){

                        _this.more = false;
                    },
                    success: function (data) {
                        if(data.code != 'success'){
                            popWait.run({
                                contStr: '类型错误'
                            });
                            return ;
                        }
                        if(_this.cut || _this.cat){
                            _this.arrs = [];
                            _this.cut = false;
                            _this.cat = false;
                        }
                        var dataAdd={};
                        var datalist = data.data.list.length;
                        if(datalist <= 0){
                            _this.Record = true;
                            _this.isband = false;
                            return ;
                        }else{
                            _this.Record = false;
                            _this.isband = true;
                        }
                        var total = data.data.total;                                //总条数
                        for(var i=0;i<datalist;i++){
                            dataAdd={};
                            dataAdd.title = data.data.list[i].itemContent;            //题目内容
                            dataAdd.resultContent = data.data.list[i].resultContent;          //正确答案
                            dataAdd.stakeScore = data.data.list[i].stakeScore;             //所压积分
                            dataAdd.rewardScore = data.data.list[i].rewardScore;            //猜中获得积分
                            dataAdd.answerContent = data.data.list[i].answerContent;          //所猜答案
                            dataAdd.answerTime = data.data.list[i].answerTime;             //时间区段
                            dataAdd.answerState = data.data.list[i].answerState;            //是否猜中
                            _this.arrs.push(dataAdd)
                        }
                        _this.more = true;
                        if(total-Num <= 0){
                            _this.more = false;
                        }
                    }
                })
            },
            underway:function(){
                //进行中
                var _this = this;
                if(recordType == 0){
                    return ;
                }else{
                    _this.istrue = true
                }
                recordType = 0 ;
                Num = 0;
                _this.cut = true;
                _this.cat = false;
                _this.addmore();
            },
            announce:function(){
                //已揭晓
                var _this = this;
                if(recordType == 1){
                    return ;
                }else{
                    _this.istrue = false
                }
                recordType = 1 ;
                Num = 0;
                _this.cut = false;
                _this.cat = true;
                _this.addmore();
            }
        }
    });
});
