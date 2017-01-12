/**
 * Created by Administrator on 2016/11/18.
 */
define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter');
    var types = hrefParameter.get('types');
    var Id = hrefParameter.get('id');
    var Pop = require('qianModule/dialog');
    var popWait = new Pop('alert');
    new Vue({
        el: 'body',
        data: {
            pageLoading:true,
            coin:1,
            styleObject:{
                background:'#e2e2e2'
            },
            styleObjectIn:{
                background:'#eeeeee'
            },
            stateStyle:{
                background:'#bbb'
            },
            styleOutIn:{
                background:'#f35c3e'
            },
            stylePoP:{
                background:'#f5c7be'
            },
            topay: {
                costPrice: 0,
                grabPrice:0,
                id:0,
                leftNeed:0,
                scorePayDiscount:0,
                userAmountLeft:0,
                userAmountLeft1:0,
                userScoreLeft:0,
                fund:0,
                integral:0,

                price:0,
                Discount:0

            },
            isActive:true,
            isActive1:false,
            title:'确认支付',
            isOk:true,
            poker:false,
            pasd:'',
            showradio:true,
            off:true,
            amount:'钱币',
            switch:true,
            confirm:'确认',
            joinQueueId:'',
            Num:0,
            stop:false,
            showState:true,
            nostate:'',
            abort:'',
            support:true
        },
        ready:function(){
            var _this = this;
            _this.onload();
            _this.loader();
            _this.pageLoading = false;
        },
        methods:{
            //leftNeed:剩余份数,ShowClsp:加减按钮颜色,grabPrice:夺宝价,userScoreLeft:自己拥有的钱币
            loader:function(){
                var _this = this;
                base.ajax({
                    url: base.pageUrl.topay.url + '/' + types,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.topay.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        _this.topay.costPrice = data.data.costPrice;                     //原价
                        if(data.data.scorePayDiscount){
                            _this.topay.grabPrice =  data.data.scorePayDiscount == '' ?  Math.round(data.data.grabPrice) :  Math.round(data.data.grabPrice * (data.data.scorePayDiscount/10));  //夺宝价
                            _this.topay.scorePayDiscount = data.data.scorePayDiscount;      //折扣(空表示没折扣 )
                            _this.topay.Discount = data.data.scorePayDiscount;
                        }else{
                            _this.topay.grabPrice =  Math.round(data.data.grabPrice);   //夺宝价
                            _this.topay.Discount = '';
                        }
                        _this.topay.price = data.data.grabPrice;
                        _this.topay.integral = data.data.grabPrice;                     //实际夺宝价
                        _this.topay.fund = _this.topay.grabPrice;                       //夺宝价
                        _this.topay.id = data.data.id;                                  //商品id
                        _this.topay.leftNeed = data.data.leftNeed;                      //剩余份数
                        _this.topay.userAmountLeft = data.data.userBalanceLeft;
                        _this.topay.userAmountLeft1 = data.data.userBalanceLeft % 1 == 0 ? data.data.userBalanceLeft+'.00' : data.data.userBalanceLeft;
                        _this.topay.userScoreLeft = data.data.userScoreLeft;             //用户积分余额
                        if(data.data.grabPrice != 200 || !data.data.canBalancePay){
                            _this.showradio = false;
                            _this.support = false;
                        }
                        var discount = _this.topay.Discount == '' ? 1:_this.topay.Discount/10;
                        if(data.data.grabPrice*discount >  _this.topay.userScoreLeft){
                            _this.title = '钱币不足';
                            _this.styleOutIn.background = '#f5c7be';
                            _this.isOk = false
                        }
                        if(data.data.overTimeState){
                            _this.nostate = '夺宝结束，等待揭晓';
                            _this.showState = false;
                        } else if(data.data.isPublish == 0 && data.data.leftNeed == 0){
                            _this.nostate = '夺宝完成，等待开奖';
                            _this.showState = false;
                        }else if(data.data.isPublish == 1 ){
                            _this.nostate = '夺宝完成，获奖者揭晓';
                            _this.showState = false;
                        }else if(data.data.isPublish == 2){
                            _this.nostate = '夺宝失败';
                            _this.showState = false;
                        }
                    }
                });
            },
            radio:function(){
                //夺宝方式  :   钱币
                var _this = this;
                if( _this.isActive && !_this.isActive1) return;
                _this.isActive = true;
                _this.isActive1 = false;
                _this.amount = '钱币';
                var discount = _this.topay.Discount == '' ? 1:_this.topay.Discount/10;
                if(_this.topay.price*discount > _this.topay.userScoreLeft){
                    _this.topay.grabPrice = Math.round(_this.coin* _this.topay.price*discount);
                    _this.title = '钱币不足';
                    _this.styleOutIn.background = '#f5c7be';
                    _this.isOk = false;
                }else{
                    _this.topay.grabPrice = Math.round(_this.coin* _this.topay.price*discount);
                    _this.title = '确认支付';
                    _this.styleOutIn.background = '#f35c3e';
                    _this.isOk = true;
                }
            },
            radio1:function(){
                //夺宝方式  :  余额
                var _this = this;
                if( _this.isActive1 && !_this.isActive) return;
                _this.isActive1 = true;
                _this.isActive = false;
                _this.amount = '元';
                _this.topay.grabPrice = _this.coin;
                if(parseInt(_this.coin) > parseInt(_this.topay.userAmountLeft)){
                    _this.title = '余额不足';
                    _this.styleOutIn.background = '#f5c7be';
                    _this.isOk = false;
                }else{
                    _this.title = '确认支付';
                    _this.styleOutIn.background = '#f35c3e';
                    _this.isOk = true;
                }
            },
            reduce:function(){
                //减
                var _this = this;
                if(_this.coin <= 1){
                    return
                }
                _this.coin -= 1;
                if(_this.coin >= _this.topay.leftNeed){
                    _this.ShowClsp = true;
                    _this.styleObject.background = '#eeeeee';
                }else{
                    _this.styleObject.background = '#e2e2e2';
                    _this.ShowClsp = false;
                }
                if(parseInt(_this.coin) > 1){
                    _this.styleObjectIn.background = '#e2e2e2';
                    _this.ShowCls = true;
                }else{
                    _this.styleObjectIn.background = '#eeeeee';
                    _this.ShowCls = false;
                }
                if( _this.isActive && !_this.isActive1){
                        //积分
                    var discount = _this.topay.Discount == '' ? 1:_this.topay.Discount/10;
                    if(_this.coin* _this.topay.price*discount > _this.topay.userScoreLeft){
                        _this.topay.grabPrice = Math.round(_this.coin* _this.topay.price*discount);
                        _this.title = '钱币不足';
                        _this.styleOutIn.background = '#f5c7be';
                        _this.isOk = false;
                    }else{
                        _this.styleOutIn.background = '#f35c3e';
                        _this.topay.grabPrice = Math.round(_this.coin* _this.topay.price*discount);
                        _this.title  = '确认支付';
                        _this.isOk = true;
                    }
                }
                if( _this.isActive1 && !_this.isActive){
                        //余额
                    if(_this.coin > _this.topay.userAmountLeft){
                        _this.topay.grabPrice = _this.coin ;
                        _this.title = '余额不足';
                        _this.styleOutIn.background = '#f5c7be';
                        _this.isOk = false;
                    }else{
                        _this.styleOutIn.background = '#f35c3e';
                        _this.topay.grabPrice = _this.coin ;
                        _this.title  = '确认支付';
                        _this.isOk = true;
                    }
                }

            },
            plus:function(){
                //加
                var _this = this;
                if(_this.coin >= _this.topay.leftNeed){
                    _this.styleObject.background = '#eeeeee';
                    _this.ShowClsp = true;
                    return
                }else{
                    _this.ShowClsp = false;
                    _this.styleObject.background = '#e2e2e2';
                }
                _this.coin = _this.coin ? _this.coin :0;
                _this.coin  = parseInt(_this.coin)+1;
                if(parseInt(_this.coin) > 1){
                    _this.ShowCls = true;
                    _this.styleObjectIn.background = '#e2e2e2'
                }else{
                    _this.ShowCls = false;
                    _this.styleObjectIn.background = '#eeeeee'
                }
                if( _this.isActive && !_this.isActive1){
                    //积分
                    var discount = _this.topay.Discount == '' ? 1:_this.topay.Discount/10;
                    if(_this.coin * _this.topay.price*discount > _this.topay.userScoreLeft){
                        _this.topay.grabPrice = Math.round(_this.coin * _this.topay.price*discount);
                        _this.title = '钱币不足';
                        _this.styleOutIn.background = '#f5c7be';
                        _this.isOk = false;
                    }else{
                        _this.styleOutIn.background = '#f35c3e';
                        _this.topay.grabPrice = Math.round(_this.coin * _this.topay.price*discount);
                        _this.title  = '确认支付';
                        _this.isOk = true;
                    }
                  }
                if( _this.isActive1 && !_this.isActive){
                    //余额
                    if(_this.coin > _this.topay.userAmountLeft){
                        _this.topay.grabPrice = _this.coin ;
                        _this.title = '余额不足';
                        _this.styleOutIn.background = '#f5c7be';
                        _this.isOk = false;
                    }else{
                        _this.styleOutIn.background = '#f35c3e';
                        _this.topay.grabPrice = _this.coin ;
                        _this.title  = '确认支付';
                        _this.isOk = true;
                    }
                }
            },
            change:function(){
                //增加或者减少
                var _this = this;
                var reg=/[^0-9]/g;
                _this.coin = _this.coin.replace(reg,'');
                _this.coin =  _this.coin.replace(/^(0+)/gi,"");
                if( _this.isActive && !_this.isActive1){
                    //积分
                    var discount = _this.topay.Discount == '' ? 1:_this.topay.Discount/10;
                    if(_this.coin * _this.topay.price*discount >= _this.topay.userScoreLeft){
                        _this.title = '钱币不足';
                        _this.topay.grabPrice = Math.round(_this.coin * _this.topay.price*discount);
                        _this.styleOutIn.background = '#f5c7be';
                    }else{
                        _this.topay.grabPrice = Math.round(_this.coin * _this.topay.price*discount);
                        _this.styleObjectIn.background = '#e2e2e2';
                        _this.styleOutIn.background = '#f35c3e';
                        _this.title  = '确认支付';
                    }
                }
                if( _this.isActive1 && !_this.isActive){
                    //余额
                    if(parseInt(_this.coin)  >= parseInt(_this.topay.userAmountLeft)){
                        _this.title = '余额不足';
                        _this.topay.grabPrice = _this.coin;
                        _this.styleOutIn.background = '#f5c7be';
                        _this.isOk = false;
                    }else{
                        _this.topay.grabPrice = _this.coin;
                        _this.title  = '确认支付';
                        _this.styleOutIn.background = '#f35c3e';
                        _this.styleObjectIn.background = '#e2e2e2';
                        _this.isOk = true;
                    }
                }
            },
            defray:function(){
                //支付
                var _this = this;
                if( _this.isOk){
                    if(_this.coin > _this.topay.leftNeed){
                        _this.isOk = true;
                        popWait.run({
                            contStr:'数量超出范围~'
                        });
                        return
                    }
                    if(_this.topay.grabPrice > _this.userScoreLeft){
                        _this.isOk = true;
                        popWait.run({
                            contStr:'钱币不足~'
                        });
                        return
                    }
                    if(!_this.switch){
                        return;
                    }
                    if( _this.isActive && !_this.isActive1){
                        //积分
                        _this.poker = false;
                        base.ajax({
                            url: base.pageUrl.pay.url + '/' + types,
                            type: "post",
                            data: {
                                oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                                appId: base.pageUrl.appId,
                                service: base.pageUrl.pay.service,
                                payType:0,                                                              //类型
                                realPayScore:_this.topay.grabPrice,                                     //实际支付积分
                                stakeScore:_this.topay.integral*_this.coin                               //折扣前积分
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            dataType: "json",
                            beforeSend:function(){
                                _this.switch = false;
                                _this.title = '确认中...';
                            },
                            complete:function(){
                            },
                            error:function(){
                                _this.switch = true;
                                _this.title = '确认';
                            },
                            success: function (data) {
                                if(data.code != 'success') {
                                    _this.switch = true;
                                    _this.title = '确认';
                                    _this.loader();
                                    popWait.run({
                                        contStr: data.msg
                                    });
                                }else{
                                    _this.Num =0;
                                    _this.joinQueueId =  data.data.joinQueueId;
                                    var ajaxrequest = setInterval(function(){
                                        _this.Num++;
                                        if(_this.Num<=3 && _this.Num != 'err'){
                                            if(_this.stop){
                                                return;
                                            }
                                            _this.ajaxpay();
                                        }
                                        if(_this.Num > 3 && _this.Num != 'err'){
                                            if(_this.stop){
                                                return;
                                            }
                                            clearInterval(ajaxrequest);
                                            if(base.isApp()){
                                                base.hybridProtocol({
                                                    tagName: 'openWebPage',
                                                    data: {
                                                        title:'',
                                                        url:location.href.split('/grabdetails')[0]+'/grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId
                                                    }
                                                });
                                            } else{
                                                location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                                                location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                                            }
                                        }
                                        if(_this.Num == 'err'){
                                            clearInterval(ajaxrequest);
                                        }
                                    },1000)
                                }
                            }
                        });
                    }
                    if( _this.isActive1 && !_this.isActive){
                        //余额
                        _this.poker = true;
                    }
                }
            },
            details:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabdetails')[0]+'/grabProtocol.html'
                        }
                    });
                } else{
                    location.href = 'grabProtocol.html';
                }
            },
            closepoker:function(){
                var _this = this;
                _this.poker = false;
                _this.pasd = '';
            },
            close:function(){
                var _this = this;
                _this.poker = false;
                _this.pasd = '';
            },
            changepsd:function(){
                var _this = this;
                if(_this.pasd.length >=6){
                    _this.stylePoP.background = '#f35c3e';
                }else{
                    _this.stylePoP.background = '#f5c7be';
                }
            },
            gotoPoP:function(){
                var _this = this;
                var money;
                if(_this.pasd.length >=6){
                    if( _this.isActive1 && !_this.isActive){
                        //余额
                        money = _this.coin;
                    }
                    if(!_this.off){
                        return;
                    }
                    base.ajax({
                        url: base.pageUrl.pay.url + '/' + types,
                        type: "post",
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            appId: base.pageUrl.appId,
                            service: base.pageUrl.pay.service,
                            exchangeMoney:money,            //金额
                            payPassword:base.encryptedPwd(_this.pasd),         //密码
                            payType:1                       //类型
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        dataType: "json",
                        beforeSend:function(){
                            //请求前
                            _this.off = false;
                            _this.Num = '';
                            _this.confirm = '确认中...';
                        },
                        complete:function(){
                            //请求完成
                            //_this.off = true;
                            //_this.confirm = '确认';
                        },
                        error:function(){
                            //请求失败
                            _this.off = true;
                            _this.confirm = '确认';
                        },
                        success: function (data) {
                            if(data.code != 'success') {
                                _this.off = true;
                                _this.confirm = '确认';
                                _this.loader();
                                popWait.run({
                                    contStr: data.msg
                                });
                            }else{
                                var Number = 0;
                                _this.joinQueueId  = data.data.joinQueueId;
                                var ajaxrequest = setInterval(function(){
                                        Number++;
                                    if(Number<=3 && _this.Num != 'err'){
                                        if(_this.stop){
                                            return;
                                        }
                                        _this.ajaxpay();
                                    }
                                    if(Number > 3 && _this.Num != 'err'){
                                        if(_this.stop){
                                            return;
                                        }
                                        clearInterval(ajaxrequest);
                                        if(base.isApp()){
                                            base.hybridProtocol({
                                                tagName: 'openWebPage',
                                                data: {
                                                    title:'',
                                                    url:location.href.split('/grabdetails')[0]+'/grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId
                                                }
                                            });
                                        } else{
                                            location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                                            location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                                        }
                                    }
                                    if(_this.Num == 'err'){
                                        clearInterval(ajaxrequest);
                                    }
                                },1000)
                            }
                        }
                    });
                }
            },
            ajaxpay:function(){
                var _this = this;
                _this.abort = base.ajax({
                    url: base.pageUrl.paydetail.url+'/'+ _this.joinQueueId,
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
                    beforeSend:function(){
                        //请求前
                        _this.off = false;
                        _this.switch = false;
                    },
                    complete:function(){
                        //请求完成
                        //_this.off = true;
                        //_this.switch = true;
                        //_this.confirm = '确认';
                    },
                    error:function(){
                        //请求失败
                        _this.off = true;
                        _this.switch = true;
                        _this.confirm = '确认';
                    },
                    success: function (data) {
                        if(data.code == 'success'){
                            //处理成功
                            _this.stop = true;
                            _this.off = true;
                            _this.switch = true;
                            _this.confirm = '确认';
                            if(base.isApp()){
                                base.hybridProtocol({
                                    tagName: 'openWebPage',
                                    data: {
                                        title:'',
                                        url:location.href.split('/grabdetails')[0]+'/grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId
                                    }
                                });
                            } else{
                                location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                                location.href = 'grabpaywin.html?types='+types+'&id='+Id+'&joinQueueId='+_this.joinQueueId;
                            }
                            return;
                        }
                        if(data.code == 'processing'){
                            //处理中
                            _this.confirm = '确认中...';
                            return;
                        }
                        if(data.code != 'success' && data.code != 'processing'){
                            //处理失败
                            _this.off = true;
                            _this.switch = true;
                            _this.Num = 'err';
                            _this.confirm = '确认';
                            _this.title = '确认';
                            _this.loader();
                            popWait.run({
                                contStr: data.msg
                            });
                        }
                    }})
            },
            forget:function(){
                var H5psd = base.H5psd,
                    _currentLink = location.href;
                //window.location.href = H5psd + _currentLink;
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:H5psd + _currentLink
                        }
                    });
                } else{
                    location.href = H5psd + _currentLink;
                }
            },
            onload:function(){
                var _this = this;
                //iOS ViewController更新积分和新纪录红点
                var hidden, state, visibilityChange;
                if (typeof document.hidden !== "undefined") {
                    hidden = "hidden";
                    visibilityChange = "visibilitychange";
                    state = "visibilityState";
                } else if (typeof document.mozHidden !== "undefined") {
                    hidden = "mozHidden";
                    visibilityChange = "mozvisibilitychange";
                    state = "mozVisibilityState";
                } else if (typeof document.msHidden !== "undefined") {
                    hidden = "msHidden";
                    visibilityChange = "msvisibilitychange";
                    state = "msVisibilityState";
                } else if (typeof document.webkitHidden !== "undefined") {
                    hidden = "webkitHidden";
                    visibilityChange = "webkitvisibilitychange";
                    state = "webkitVisibilityState";
                }
                document.addEventListener(visibilityChange, function () {
                    if (document[state] == "visible") {
                        location.reload()
                    }
                }, false);

                //生成给android点击返回时触发毁掉函数的交互协议
                base.isApp('android') && base.hybridProtocol({
                    tagName: 'notify',
                    data: {
                        type: 'backCallback',
                        callback: function(){
                            location.reload()
                        }
                    }
                });
            }
        }
    });
});