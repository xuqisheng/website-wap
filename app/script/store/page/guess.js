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
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter'),
        shareInit = require('module/share-init'),
        Format = require('module/date-format'),
        loadList = require('module/loadList');
    var Id = hrefParameter.get('id');
    var shareDescribe = '最新最好玩这里都有，快快加入，不要错过！', shareIcon = __uri('../../../image/store/banner/shares.png') , shareTitle =  '每日一猜，赚钱就是这么容易。';
    var timeFormat = Format;
    var popWait = new Pop('wait');
        function time(addtime,systime,_this,i){
            var times = 0;
            var iis=0;
            setInterval(function(){
                if(addtime-(systime+times) <= 0){
                    _this.lists[i].activityon = false;
                    if(iis<=0){
                        _this.lists[i].activity = false;
                    }
                    _this.lists[i].addtime = _this.sysTime-1000;
                    iis++;
                }
                times+=1000;
                var form = timeFormat.countdown(addtime-(systime+times));
                _this.lists[i].day = form;
            },1000)
        }
        function addload(items,_this){
            for(var i=0;i<items;i++){
                //系统时间 > 活动开始时间
                if(_this.sysTime > _this.lists[i].addtime){
                    //系统时间 > 活动开始时间 && 是否答题过 && 已登入
                    if(_this.sysTime > _this.lists[i].addtime && _this.lists[i].Answerstate && _this.isLogin){
                        _this.lists[i].activity = true;
                }
                }else{
                    //答题未开始
                    _this.lists[i].activity = true;
                    _this.lists[i].activityon = true;
                    _this.lists[i].Answerstate  = false;
                    var addtime = _this.lists[i].addtime;
                    var systime = parseInt( _this.sysTime,10);
                    time(addtime,systime,_this,i);
                    for(var j=0;j<_this.lists[i].data.length;j++){
                        _this.lists[i].data[j].percentage = '0%';
                    }
                }
                //答题开始 || 答题结束  && 登入 && 答题过 && 未公布答案
                if(_this.sysTime > _this.lists[i].addtime   && _this.isLogin && _this.lists[i].Answerstate  && !_this.lists[i].Answertheanswer){
                    _this.lists[i].Havebeen ='已作答，待揭晓';
                    for(var k=0; k < _this.lists[i].data.length; k++){
                        if(_this.lists[i].answerRewardId != '' && _this.lists[i].answerRewardId == _this.lists[i].data[k].ListId){
                            _this.lists[i].data[k].isIds = true;
                        }else{
                            _this.lists[i].data[k].isId = true;
                        }
                    }
                }
                // 答题已结束   &&  用户未作答  &&  未公布答案
                if(_this.sysTime > _this.lists[i].EndTime && !_this.lists[i].Answerstate && !_this.lists[i].Answertheanswer){
                    _this.lists[i].Havebeen ='已结束，待揭晓';
                    _this.lists[i].activity = true;
                    for(var k=0; k < _this.lists[i].data.length; k++){
                        _this.lists[i].data[k].isId = true;
                    }
                }
                //活动已经结束 && 答案已公布
                if(_this.sysTime > _this.lists[i].EndTime &&  _this.lists[i].Answertheanswer){
                    _this.lists[i].Havebeen ='答案已揭晓';
                    _this.lists[i].activity = true;
                    for(var k=0; k < _this.lists[i].data.length; k++){
                        _this.lists[i].pressure = false;
                        if(_this.lists[i].resultRewardId != '' && _this.lists[i].resultRewardId == _this.lists[i].data[k].ListId){
                            _this.lists[i].data[k].isIds = true;
                            _this.lists[i].data[k].percentage = '正确答案'
                        }else{
                            _this.lists[i].data[k].isId = true;
                            _this.lists[i].data[k].percentage = '不正确'
                        }
                    }
                }
            }
        }
        var curPageUrl = window.location.href;
        var pageUrl =  window.location.href.split('?')[0]+'?id='+Id;
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
      new Vue({
        el:'body',
        data:{
            pageLoading:true,                                                       //加载loading
            money:0,                                                                //用户金额
            isLogin:base.isLogin(),                                                 //是否登入
            sysTime:8,                                                              //系统时间
            Raiders:false,
            indexAdd:null,                                                          //竞猜内循环列表值
            poker:false,
            isYes:false,
            imgsrc: '',
            backgroundColor:{
                backgroundColor :''
            },
            lists:[],
            isApp:false,
            needTip:false
        },
        computed:{
        },
        ready:function(){
            var _this = this;
            _this.isApp = base.isApp('ios') ?  true : false;
            _this.loader();
            _this.onLoad();
            addload(_this.lists.length,_this);
        },
        methods:{
            loader: function(){

                var _this = this;
                if(Id == ''){
                    //popWait.run({
                    //    contStr: '类型错误'
                    //});
                    return ;
                }
                new loadList({
                    wrap:  $('#pageGuess .viewport')[0],
                    ajax: {
                        url: base.pageUrl.topicid.url,
                        type: 'get',
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            appId: base.pageUrl.appId,
                            service: base.pageUrl.topicid.service,
                            id:Id
                        },
                        success: function (data, next) {
                                _this.imgsrc = data.data.bgImg ? data.data.bgImg+'?t=12312312' : __uri('../../../image/store/banner/guess-default.jpg');//背景图
                                _this.backgroundColor.backgroundColor = data.data.bgColor ? '#'+ data.data.bgColor : '#a091d6';              //背景颜色
                                _this.mytheme = data.data.jcTopic;                                          //title标题
                                shareDescribe = data.data.shareDescribe ?  data.data.shareDescribe : shareDescribe ;  //分享描述文案
                                shareIcon = data.data.shareIcon ? data.data.shareIcon : shareIcon ;          //分享图片
                                shareTitle = data.data.shareTitle ? data.data.shareTitle : shareTitle ; //分享标题
                                _this.money = data.data.scoreLeft;                                          //用户积分
                                _this.sysTime = data.data.serverTime;                                       //系统时间
                                _this.needTip = data.data.needTip;
                                var datalength = data.data.itemList.length ;
                                if (datalength <= 0) {
                                    return false;
                                }
                                for (var i = 0; i < datalength; i++) {
                                    var guessStateStr = data.data.itemList[i].userAnswerState,              //用户是否作答过
                                        resultContent = data.data.itemList[i].guessState,                   //竞猜题目状态(0未公布1已公布)
                                        answerStartTime = data.data.itemList[i].answerStartTime,            //题目开始时间
                                        answerStopTime = data.data.itemList[i].answerStopTime,              //题目结束时间
                                        answer_during = data.data.itemList[i].answerDuring,                 //题目答题区段
                                        itemContent = data.data.itemList[i].itemContent,                    //题目内容
                                        scoreMaxStake = data.data.itemList[i].scoreMaxStake,                //最高积分
                                        answerRewardId = data.data.itemList[i].answerRewardId,              //用户选择答案id
                                        resultRewardId = data.data.itemList[i].resultRewardId,              //公布答案id
                                        Numtips = 10,
                                        day = '',
                                        pressure = true;
                                    var dataAdd = {};
                                    var dataarr = [];
                                    for (var j = 0; j < data.data.itemList[i].rewardList.length; j++) {
                                        dataAdd = {};
                                    var optionContent = data.data.itemList[i].rewardList[j].optionContent,    //选项内容
                                        rewardScore = data.data.itemList[i].rewardList[j].rewardScore,        //每注奖励积分
                                        voteScale = data.data.itemList[i].rewardList[j].voteScale,            //投票比例
                                        ListId = data.data.itemList[i].rewardList[j].id,                      //投注id
                                        scorePerStake = data.data.itemList[i].scorePerStake;                  //每注积分
                                        dataAdd.name = optionContent;
                                        dataAdd.title = scorePerStake;
                                        dataAdd.titlein = rewardScore;
                                        dataAdd.percentage = voteScale;
                                        dataAdd.ListId = ListId;
                                        dataAdd.isId = false;
                                        dataAdd.isIds = false;
                                        dataarr.push(dataAdd)
                                    }
                                    var list = {
                                        'title': itemContent,
                                        'time': answer_during,
                                        'addtime': answerStartTime,
                                        'data': dataarr,
                                        'mostmoney': scoreMaxStake,
                                        'Leastmoney': scorePerStake,
                                        'Answertheanswer': resultContent,
                                        'EndTime': answerStopTime,
                                        'Answerstate': guessStateStr,
                                        'answerRewardId': answerRewardId,
                                        'resultRewardId': resultRewardId,
                                        'Numtips':Numtips,
                                        'pressure': pressure,
                                        'day': day,
                                        'isSelectedIndex': null,
                                        'guessing': false,
                                        'activity': false,                                                    //能否点击列表
                                        'activityon': false,                                                  //是否显示倒计时
                                        'coin': '',                                                           //竞猜金额
                                        'coins': '0',                                                         //预计竞猜所得金额
                                        'ismeta': false,                                                      //预计金额是否显示
                                        'empty': false,                                                       //所押金额必须为10的整数倍  是否显示
                                        'nomoney': false,                                                     //您的钱币不足   是否显示
                                        'myLeastmoney': false,                                                //竞猜最低金额   是否显示
                                        'mymostmoney': false,                                                 //竞猜最高金额   是否显示
                                        'Havebeen': ''                                                        //答题展示文案
                                    };
                                    _this.lists.push(list);
                                    setTimeout(next, 500)
                                }
                            addload(_this.lists.length,_this);

                        },
                        beforesend:function(){
                            shareEvent(shareDescribe,shareIcon,shareTitle);
                        },
                        complete:function(){
                            _this.pageLoading = false;
                        }
                    }
                })
            },
            loadajax:function(){
                var _this = this;
                base.ajax({
                    url: base.pageUrl.topicid.url+'/'+Id+'/'+10,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.topicid.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        _this.needTip = data.data.needTip;
                    }
                })
            },
            onLoad:function(){
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
                        _this.loadajax()
                    }
                }, false);

                //生成给android点击返回时触发毁掉函数的交互协议
                base.isApp('android') && base.hybridProtocol({
                    tagName: 'notify',
                    data: {
                        type: 'backCallback',
                        callback: _this.loadajax
                    }
                });
            },
            hidesalse:function(i,index){
                if(!this.lists[i].activity){
                    this.lists[i].isSelectedIndex = index;
                    this.lists[i].guessing = true;
                }
                this.lists[i].empty = false;
                this.lists[i].nomoney = false;
                this.indexAdd = index;
                this.lists[i].ismeta = true;
                this.lists[i].coin = this.lists[i].data[this.indexAdd].title;
                this.lists[i].coins = parseInt(this.lists[i].coin* (parseInt(this.lists[i].data[this.indexAdd].titlein)/parseInt(this.lists[i].data[this.indexAdd].title)));
                this.lists[i].Numtips = this.lists[i].data[this.indexAdd].title;
            },
            goisLogin:function(){
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
            reduce:function(i){
                if((parseInt(this.lists[i].coin)-parseInt(this.lists[i].data[this.indexAdd].title)) > 0){
                    this.lists[i].coin = parseInt(this.lists[i].coin-this.lists[i].data[this.indexAdd].title);
                    this.lists[i].ismeta = true;
                    this.lists[i].coins = parseInt(this.lists[i].coin* (parseInt(this.lists[i].data[this.indexAdd].titlein)/parseInt(this.lists[i].data[this.indexAdd].title)));
                }else{
                    this.lists[i].coin = 0;
                    this.lists[i].ismeta = false;
                    this.lists[i].coins =parseInt(this.lists[i].coin* (parseInt(this.lists[i].data[this.indexAdd].titlein)/parseInt(this.lists[i].data[this.indexAdd].title)));
                }
            },
            plus:function(i){
                this.lists[i].coin = this.lists[i].coin == '' ? parseInt(this.lists[i].coin+this.lists[i].data[this.indexAdd].title) : parseInt(this.lists[i].coin)+parseInt(this.lists[i].data[this.indexAdd].title);
                this.lists[i].ismeta = true;
                if( this.lists[i].coin >= 999999){
                    this.lists[i].coin = 999999;
                }
                this.lists[i].coins = parseInt(this.lists[i].coin* (parseInt(this.lists[i].data[this.indexAdd].titlein)/parseInt(this.lists[i].data[this.indexAdd].title)));
            },
            change:function(i){
                var reg=/[^0-9]/g;
                this.lists[i].coin=this.lists[i].coin.replace(reg,'');
                this.lists[i].coin=this.lists[i].coin.replace(/\b(0+)/gi,"");
                if(this.lists[i].coin != ''){
                    this.lists[i].ismeta = true;
                }
                if( this.lists[i].coin >= 999999){
                    this.lists[i].coin = 999999;
                }
              this.lists[i].coins =parseInt(this.lists[i].coin* (parseInt(this.lists[i].data[this.indexAdd].titlein)/parseInt(this.lists[i].data[this.indexAdd].title)));
            },
            myshare:function(){
                userShareEvent(this,shareDescribe,shareIcon,shareTitle)
            },
            pokeron:function(){
                 this.poker = false;
            },
            myGuess:function(){
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
            gomyGuess:function(){
              if(base.isApp()){
                  base.hybridProtocol({
                      tagName: 'openWebPage',
                      data: {
                          title:'',
                          url:location.href.split('/guess')[0]+'/myGuess.html?id='+Id+'&recordType='+0
                      }
                  });
              } else{
                 location.href = 'myGuess.html?id='+Id+'&recordType='+0;
              }
            },
            Raiderss:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/guess')[0]+'/Raiders.html'
                        }
                    });
                } else{
                    location.href = 'Raiders.html';
                }
            },
            publish:function(){
                //最新揭晓
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/guess')[0]+'/guesspublish.html?id='+Id
                        }
                    });
                } else{
                    location.href = 'guesspublish.html?id='+Id;
                }

            },
            gostatus:function(){
                //我的竞猜
            },
            needTips:function(){
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/guess')[0]+'/myGuess.html?id='+Id+'&recordType='+1
                        }
                    });
                } else{
                    location.href = 'myGuess.html?id='+Id+'&recordType='+1;
                }
            },
            submit:function(index){
                //竞猜的金额为整数
                if(this.lists[index].coin % this.lists[index].data[this.indexAdd].title != 0){
                    this.lists[index].myLeastmoney = false;
                    this.lists[index].mymostmoney = false;
                    this.lists[index].empty = true;
                    this.lists[index].nomoney = false;
                    this.isYes = true;
                }
                //竞猜金额大于拥有金额
                else if(this.lists[index].coin > this.money){
                    this.lists[index].myLeastmoney = false;
                    this.lists[index].mymostmoney = false;
                    this.lists[index].nomoney = true;
                    this.lists[index].empty = false;
                    this.isYes = true;
                }
                //竞猜金额小于起始金额
                else if(this.lists[index].coin < this.lists[index].Leastmoney){
                    this.lists[index].myLeastmoney = true;
                    this.lists[index].mymostmoney = false;
                    this.lists[index].nomoney = false;
                    this.lists[index].empty = false;
                    this.isYes = true;
                }
                //竞猜金额大于可压金额
                else if(this.lists[index].coin > this.lists[index].mostmoney){
                    this.lists[index].mymostmoney = true;
                    this.lists[index].myLeastmoney = false;
                    this.lists[index].nomoney = false;
                    this.lists[index].empty = false;
                    this.isYes = true;
                }else{
                    this.isYes = false;
                }
                if(!this.isYes){
                    var _this = this;
                    var dataid = _this.lists[index].data[_this.indexAdd].ListId;
                    var money = _this.lists[index].coin;
                    base.ajax({
                            url: base.pageUrl.jcItemConfId.url,
                            type: "post",
                            data: {
                                oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                                appId: base.pageUrl.appId,
                                service: base.pageUrl.jcItemConfId.service,
                                rewardId:dataid,
                                stakeScore:money
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
                                _this.money = _this.money - money;
                                _this.lists[index].guessing = false;
                                _this.lists[index].Answerstate = true;
                                _this.lists[index].Havebeen ='已作答，待揭晓';
                                _this.lists[index].activity = true;
                            }
                        }
                    )
                }
            }
        }
    })
});
