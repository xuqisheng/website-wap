/**
 * Created by Administrator on 2016/8/30.
 */
define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter'),
        shareInit = require('module/share-init'),
        Format = require('module/date-format'),
        loadList = require('module/loadList');
    var Id = hrefParameter.get('id');
    var shareDescribe = '宝贝齐全，免费拿，还等什么！', shareIcon = __uri('../../../image/store/grab/grabshare.png') , shareTitle =  '没错，免费拿回家！';
    var curPageUrl = window.location.href;
    var pageUrl =  window.location.href.split('?')[0]+'?id='+Id;
    var timeFormat = Format;
    function shareEvent(shareDescribe,shareIcon,shareTitle) {
        shareInit({
            isApp: base.isApp(),
            dataUrl: "",
            imgUrl: shareIcon,
            shareLink: pageUrl,
            curLink: curPageUrl,
            title: shareTitle,
            desc: shareDescribe,
            type: ""
        });
    }
    function userShareEvent(_this,shareDescribe,shareIcon,shareTitle){
        if(base.isApp()){
            base.hybridProtocol({
                tagName: 'getShare',
                data: {
                    dataUrl: "",
                    imgUrl: shareIcon,
                    link: pageUrl,
                    title: shareTitle,
                    desc: shareDescribe,
                    type: ""
                },
                success: function (data) {},
                error: function (data) {}
            });
        }else{
            _this.poker = true;
        }
    }
    function time(addtime,systime,_this,i){
        var times = 0;
        var setval =setInterval(function(){
            if(addtime-(systime+times) > 0){
                _this.lists[i].activity =  addtime-(systime+times) > 0;
                times+=1000;
                var form = timeFormat.countdown(addtime-(systime+times));
                _this.lists[i].day = form;
            }else{
                _this.lists[i].activity = false;
                _this.lists[i].headline =  '立即夺宝';
                _this.lists[i].bgcolor = 'background:#f35c3e';
                clearTimeout(setval);
            }

        },1000)
    }
    function state(grab,grabState,isPublish,_this,i,overTimeState){
        if( grab == 1  && isPublish == 0 && !overTimeState){
            _this.lists[i].headline =  '立即夺宝';
            _this.lists[i].bgcolor = 'background:#f35c3e';
        }
        if(( grab == 2  && isPublish == 0 && !overTimeState) || (overTimeState && grab == 2 && isPublish == 0)){
            _this.lists[i].headline =  '夺宝完成，等待开奖';
            _this.lists[i].bgcolor = 'background:#bbb';
        }
        if(overTimeState && grab == 1){
            _this.lists[i].headline =  '夺宝结束，等待揭晓';
            _this.lists[i].bgcolor = 'background:#bbb';
        }
        if( grab == 2   && isPublish == 1 && !overTimeState){
            _this.lists[i].headline =  '夺宝完成，获奖者揭晓';
            _this.lists[i].bgcolor = 'background:#bbb';
        }
    }
    function addload(items,_this){
        for(var i=0;i<items;i++) {
            var sysTime = _this.sysTime,                             //系统时间
                grabState = _this.lists[i].grabState,                 //夺宝是否成功
                isPublish = _this.lists[i].isPublish,                //商品是否已开奖(0未开奖，1已开奖，2夺宝失败)
                totalNeed = _this.lists[i].totalNeed,                //夺宝总份数
                leftNeed = _this.lists[i].leftNeed,                  //夺宝剩余份数
                overTimeState = _this.lists[i].overTimeState == 1 ? true:false,       //是否已超过结束时间(0否1是)
                grab = leftNeed > 0 ? 1: 2,                         //是否抢夺完成(1未完成，2完成)
                grabStartTime = _this.lists[i].grabStartTime,        //活动开始时间
                grabStopTime = _this.lists[i].grabStopTime;           //夺宝结束时间
            if(grabStartTime == ''  && grabStopTime==''){
                state(grab,grabState,isPublish,_this,i,overTimeState);
                if(grab == 1  && grabState && isPublish == 0 && !overTimeState){
                    _this.lists[i].headline =  '夺宝结束，等待揭晓';
                    _this.lists[i].bgcolor = 'background:#bbb';
                }
            }else if(grabStopTime == ''){
                if (_this.sysTime > _this.lists[i].grabStartTime) {
                    state(grab,grabState,isPublish,_this,i,overTimeState);
                    if(grab == 1  && grabState && isPublish == 0 && !overTimeState){
                        _this.lists[i].headline =  '夺宝结束，等待揭晓';
                        _this.lists[i].bgcolor = 'background:#bbb';
                    }
                } else {
                    time(_this.lists[i].grabStartTime,_this.sysTime,_this,i);
                }
            }else if(grabStartTime ==''){
                state(grab,grabState,isPublish,_this,i,overTimeState);
                if(grab == 1 && sysTime > grabStopTime && grabState && isPublish == 1 && !overTimeState){
                    _this.lists[i].headline =  '夺宝结束，等待揭晓';
                    _this.lists[i].bgcolor = 'background:#bbb';
                }
            }else{
                if (_this.sysTime > _this.lists[i].grabStartTime) {
                    state(grab,grabState,isPublish,_this,i,overTimeState );
                    if(grab == 1  && grabState && isPublish == 0){
                        _this.lists[i].headline =  '夺宝结束，等待揭晓';
                        _this.lists[i].bgcolor = 'background:#bbb';
                    }
                }else{
                    time(_this.lists[i].grabStartTime,_this.sysTime,_this,i);
                }
            }
        }
    }
      var VM = new Vue({
            el: 'body',
            data: {
                pageLoading: true,                                                       //加载loading
                money: 0,                                                                //用户金额
                isLogin:'',                                                 //是否登入
                sysTime: 8,
                imgsrc: '',
                backgroundColor: {
                    backgroundColor: ''
                },
                lists: [],
                needTip:false,
                islists:false,
                poker:false,
                isApp:false,
                aaa:''
            },
            ready: function () {
                var _this = this;
                _this.isApp = base.isApp('ios') ?  true : false;
                _this.loader();
                //_this.onload();
                _this.isLogins();
            },
            computed: {

            },
            methods: {
                loader: function(){
                    var _this = this;
                    new loadList({
                        wrap:  $('#grab .viewport')[0],
                        ajax: {
                            url: base.pageUrl.grab.url,
                            type: 'get',
                            data: {
                                oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                                appId: base.pageUrl.appId,
                                service: base.pageUrl.grab.service,
                                id:Id
                            },
                            success: function (data, next) {
                                _this.imgsrc = data.data.bgImg ? data.data.bgImg :__uri('../../../image/store/grab/banner.jpg');                                             //背景图
                                _this.backgroundColor.backgroundColor =data.data.bgColor ? '#'+data.data.bgColor  : '#f8d851';              //背景颜色
                                shareDescribe = data.data.shareDescribe ?  data.data.shareDescribe : shareDescribe ;  //分享描述文案
                                shareIcon = data.data.shareIcon ? data.data.shareIcon : shareIcon ;          //分享图片
                                shareTitle = data.data.shareTitle ? data.data.shareTitle : shareTitle ;     //分享标题
                                _this.needTip = data.data.needTip;
                                _this.money = data.data.userScoreLeft;                                          //用户积分
                                _this.sysTime = data.data.serverTime;                                       //系统时间
                                var goodsList = data.data.goodsList.length;
                                if(goodsList < 1){
                                    _this.islists = true;
                                }
                                var dataAdd = {};
                                for(var i=0;i<goodsList;i++){
                                    dataAdd = {};
                                    dataAdd.goodsName = data.data.goodsList[i].goodsName;          //商品名称
                                    dataAdd.cornerMark = data.data.goodsList[i].cornerMark;        //角标
                                    dataAdd.MarkShow =  data.data.goodsList[i].cornerMark == '' ?  false : true;
                                    dataAdd.overTimeState = data.data.goodsList[i].overTimeState;  //是否已超过结束时间(0否1是)
                                    dataAdd.goods_url = data.data.goodsList[i].goodsImgUrl;        //商品图片
                                    dataAdd.grabPrice = data.data.goodsList[i].grabPrice;          //夺宝价格
                                    dataAdd.grabStartTime = data.data.goodsList[i].grabStartTime ? data.data.goodsList[i].grabStartTime :'';  //夺宝开始时间
                                    dataAdd.grabStopTime = data.data.goodsList[i].grabStopTime ? data.data.goodsList[i].grabStopTime: '' ;     //夺宝结束时间
                                    dataAdd.id = data.data.goodsList[i].id;                        //夺宝主键id
                                    dataAdd.leftNeed = data.data.goodsList[i].leftNeed;            //剩余份数
                                    dataAdd.totalNeed= data.data.goodsList[i].totalNeed;            //总需份数
                                    dataAdd.apply = dataAdd.totalNeed-dataAdd.leftNeed >= 0 ? dataAdd.totalNeed-dataAdd.leftNeed :0;
                                    dataAdd.grabState = data.data.goodsList[i].grabState;           //夺宝是否成功
                                    dataAdd.isPublish = data.data.goodsList[i].isPublish;           //获奖者是否揭晓
                                    dataAdd.day = '' ;                                              //倒计时
                                    dataAdd.activity = false;                                       //按钮是否显示
                                    dataAdd.bgcolor = '#f35c3e';                                    //按钮背景颜色
                                    dataAdd.headline = '';                                          //按钮文案
                                    _this.lists.push(dataAdd);
                                }
                               setTimeout(next, 500);
                               addload(_this.lists.length,_this)
                            },
                            beforeSend:function(){
                               shareEvent(shareDescribe,shareIcon,shareTitle);
                            },
                            complete:function(){
                                _this.pageLoading = false;
                            }
                        }
                    })
                },
                Raiderss:function(){
                    //跳转规则页面
                    this.skip('grabrule','type',1,Id);
                },

                isLogins:function(){
                    var _this = this;
                    _this.isLogin = base.isLogin() ? true :false;
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
                            //if(!base.isLogin()){
                            //    location.reload()
                            //}
                        }
                    }, false);
                    //生成给android点击返回时触发回调函数的交互协议
                    base.isApp('android') && base.hybridProtocol({
                        tagName: 'notify',
                        data: {
                            type: 'backCallback',
                            callback: function(){
                                location.reload()
                                //if(!base.isLogin()){
                                //    location.reload()
                                //}
                            }
                        }
                    });
                },
                myshare:function(){
                    var _this = this;
                    //分享
                    userShareEvent(_this,shareDescribe,shareIcon,shareTitle)
                },
                gotoLogin:function(){
                    //去登入
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
                },
                publish:function(){
                    this.skip('grabpublish','types',Id,Id)
                },
                gostatus:function(){
                    this.skip('grabrecord','recordType',0,Id)
                },
                needTips:function(){
                    this.skip('grabrecord','recordType',1,Id)
                },
                shoppublish:function(i){
                    var id = this.lists[i].id;
                    this.skip('grabparticulars','types',id,Id);
                },
                sharecard:function(){
                    this.skip('grabsingle','types',Id,Id)
                },
                skip:function(link,types,id,Id){
                    if(base.isApp()){
                        base.hybridProtocol({
                            tagName: 'openWebPage',
                            data: {
                                title:'',
                                url:location.href.split('/grab')[0]+'/'+link+'.html?'+types+'='+id+'&'+'id='+Id
                            }
                        });
                    } else{
                        location.href = link+'.html?'+types+'='+id+'&'+'id='+Id;
                    }
                },
                pokers:function(){
                    var _this = this;
                    _this.poker = false;
                }

            }
        });
});