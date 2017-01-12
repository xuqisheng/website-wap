define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Format = require('module/date-format'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var types = hrefParameter.get('types');
    var popWait = new Pop('alert');
    var Slider = require('module/slider');
    var slide; // slide的实例占位
    var timeFormat = Format;
    function slider(slideImgList){
        var imgList = [];
        for (var i = 0; i < slideImgList.length; i++) {
            imgList.push({
                content: slideImgList[i].fullShowUrl,
                href: slideImgList[i].fullRedirectUrl
            });
        }
        new Slider({
            dom: document.getElementById('scene'),
            data: imgList,
            isAutoplay: true,
            isLooping: true,
            isAutoScale: true,
            isVertical: false,
            isDestroyCon: false,
            type: 'pic',
            animateType: 'default',
            duration: 5000,
            onSlideChange: function (page) {
                var liList = document.querySelectorAll('#scene ol li'),
                    liLength = liList.length;
                for (var i = 0; i < liLength; i++) {
                    liList[i].classList.remove('on');
                }
                liList[page].classList.add('on');
            },
            onSlideInto: function () {
                var imgLength = imgList.length,
                    slideBox = document.getElementById('scene'),
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
            },
            onDestroy: function () {
                if (document.querySelector('#scene ol')) {
                    document.querySelector('#scene ol').remove();
                }
            }
        });
    }
    function grabstate(grabState,isPublish,leftNeed,grabPrice,_this,overTimeState,userAccountLeft){
        if(isPublish == 0 && leftNeed > 0){
            _this.day = '立即夺宝';
            _this.backgroundColor.backgroundColor = '#f35c3e';
            _this.isconvert = true;
        }
        if(overTimeState){
            _this.isconvert = false;
            _this.day = '夺宝结束，等待揭晓';
            _this.backgroundColor.backgroundColor = '#bbbbbb'
        }
        if( isPublish == 2 ){
            _this.isconvert = false;
            _this.day = '夺宝失败';
            _this.backgroundColor.backgroundColor = '#bbbbbb'
        }
        if( isPublish == 0 && leftNeed == 0){
            _this.isconvert = false;
            _this.day = '夺宝完成，等待开奖';
            _this.backgroundColor.backgroundColor = '#bbbbbb'
        }
        if(isPublish == 1 && leftNeed == 0){
            _this.isconvert = false;
            _this.day = '夺宝完成，获奖者揭晓';
            _this.backgroundColor.backgroundColor = '#bbbbbb';
            _this.off = true;
        }
        if(grabPrice > _this.userScoreLeft && userAccountLeft < 1 && base.isLogin()){
            _this.isconvert = false;
            _this.day = '钱币不足';
            _this.backgroundColor.backgroundColor = '#f5c7be'
        }
    }
    var vm = new Vue({
        el: 'body',
        data: {
            pageLoading: true,                                                       //加载loading
            money: 0,                                                                //用户金额
            isLogin: base.isLogin(),
            shopImgs:[],
            costPrice:'',
            goodsContent:'',
            grabStartTime:'',
            grabPrice:'',
            id:'',
            leftNeed:'',
            totalNeed:'',
            apply:'',
            goodsName:'',
            serverTime:'',
            grabState:'',
            isPublish:'',
            userScoreLeft:'',
            day:'',
            poker:false,
            isconvert:false,
            coin:1,
            fund:'',
            isOk:false,
            off:false,
            payoff:'确认支付',
            grabUserShareId:'',
            luckyNumber:'',
            phoneStr:'',
            realNameStr:'',
            stakeNumber:'',
            overTimeState:'',
            userAccountLeft:'',
            ShowCls:false,
            ShowClsp:false,
            backgroundColor: {
                backgroundColor: '#f35c3e'
            },
            styleObject:{
                background:'#e2e2e2'

            },
            styleObjectIn:{
                background:'#eeeeee'
            },
            goodsUrlArray:''
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            this.loader();
            this.onload();

        },
        methods: {
            loader: function () {
                var _this = this;
                _this.poker = false;
                _this.coin = 1;
                base.ajax({
                    url: base.pageUrl.grabGoodsId.url+'/'+types,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.grabGoodsId.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        _this.costPrice = data.data.costPrice;
                        _this.overTimeState = data.data.overTimeState;
                        _this.goodsContent = data.data.goodsContent;
                        _this.goodsName = data.data.goodsName;
                        _this.grabPrice = data.data.grabPrice;
                        _this.id = data.data.id;
                        _this.leftNeed = data.data.leftNeed;
                        _this.totalNeed = data.data.totalNeed;
                        _this.userScoreLeft = data.data.userScoreLeft;
                        _this.userAccountLeft = data.data.userBalanceLeft;
                        _this.apply = _this.totalNeed-_this.leftNeed > 0 ? _this.totalNeed - _this.leftNeed : 0;
                        var goodsUrlArrayLength = data.data.goodsUrlArray.length;
                        for(var i=0;i<goodsUrlArrayLength;i++){
                            _this.shopImgs.push(data.data.goodsUrlArray[i].img);
                        }
                        if(data.data.luckyUserInfo){
                            _this.grabUserShareId = data.data.luckyUserInfo.grabUserShareId ? data.data.luckyUserInfo.grabUserShareId : '';
                            _this.luckyNumber = data.data.luckyUserInfo.luckyNumber ? data.data.luckyUserInfo.luckyNumber : '';
                            _this.phoneStr = data.data.luckyUserInfo.phoneStr ? data.data.luckyUserInfo.phoneStr : '';
                            _this.realNameStr = data.data.luckyUserInfo.realNameStr ? data.data.luckyUserInfo.realNameStr : '';
                            _this.stakeNumber = data.data.luckyUserInfo.stakeNumber ? data.data.luckyUserInfo.stakeNumber : '';
                        }
                        _this.grabStartTime = data.data.grabStartTime ? data.data.grabStartTime : '';
                        _this.serverTime = data.data.serverTime;
                        _this.grabState = data.data.grabState;
                        _this.isPublish = data.data.isPublish;
                        _this.count(_this.grabStartTime,_this.serverTime,_this.grabState,_this.isPublish,_this.totalNeed,_this.leftNeed,_this.grabPrice,_this.overTimeState,_this.userAccountLeft);
                        _this.goodsUrlArray = data.data.goodsUrlArray;
                        slider(_this.goodsUrlArray)
                    }
                })
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
                        _this.loader()
                    }
                }, false);

                //生成给android点击返回时触发毁掉函数的交互协议
                base.isApp('android') && base.hybridProtocol({
                    tagName: 'notify',
                    data: {
                        type: 'backCallback',
                        callback: _this.loader
                    }
                });
            },
            count:function(starttime,sertime,grabState,isPublish,totalNeed,leftNeed,grabPrice,overTimeState){
                var _this = this;
                    //夺宝失败
                    if(isPublish == 2){
                        grabstate(grabState,isPublish,leftNeed,grabPrice,_this,overTimeState)
                        return;
                    }
                    //夺宝开始时间为空
                    if(starttime == ''){
                        grabstate(grabState,isPublish,leftNeed,grabPrice,_this,overTimeState)
                    }else{
                        //开始时间   系统时间
                        if( starttime < sertime){
                            //活动已经开始
                            grabstate(grabState,isPublish,leftNeed,grabPrice,_this,overTimeState)
                        }else{
                            //活动未开始                 //starttime:夺宝开始时间  sertime:系统时间
                            var times = 0;
                            var setval =setInterval(function(){
                                if(starttime-(sertime+times) > 0){
                                    times+=1000;
                                    var form = timeFormat.countdown(starttime-(sertime+times));
                                    _this.day = form;
                                }else{
                                    _this.isconvert = true;
                                    _this.day = '立即夺宝';
                                    clearTimeout(setval);
                                }
                            },1000)
                        }
                    }
            },
            convert:function(){
                //点击兑换
                var _this = this;
                if(_this.isLogin){
                    if(_this.isconvert){
                        //_this.fund = _this.grabPrice;
                        //_this.poker = true;
                        //_this.isOk = true;
                        if(base.isApp()){
                            base.hybridProtocol({
                                tagName: 'openWebPage',
                                data: {
                                    title:'',
                                    url:location.href.split('/grabparticulars')[0]+'/grabdetails.html?types='+types+'&id='+Id
                                }
                            });
                        } else{
                            location.href = 'grabdetails.html?types='+types+'&id='+Id;
                        }
                    }
                }else{
                    var _loginLink = base.loginLink,
                        _currentLink = location.href;
                    if (base.isApp()) {
                        base.hybridProtocol({
                            tagName: 'openNativePage',
                            data: {
                                type: 'login',
                                url: location.href
                            }
                        });
                    } else {
                        window.location.href = _loginLink + _currentLink;
                    }
                }
            },
            all:function(){
                //所有参与记录
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabparticulars')[0]+'/grabtake.html?types='+types+'&id='+Id
                        }
                    });
                } else{
                    location.href = 'grabtake.html?types='+types+'&id='+Id;
                }
            },
            bathe:function(){
                //计算详情
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabparticulars')[0]+'/grabbathe.html?types='+types+'&id='+Id
                        }
                    });
                } else{
                    location.href = 'grabbathe.html?types='+types+'&id='+Id;
                }
            },
            grabbask:function(){
                //晒单分享
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabparticulars')[0]+'/grabbask.html?types='+types+'&id='+Id
                        }
                    });
                } else{
                    location.href = 'grabbask.html?types='+types+'&id='+Id;
                }
            }
        }
    })
});