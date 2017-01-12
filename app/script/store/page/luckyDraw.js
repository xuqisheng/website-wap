/**
 * 积分商城
 * @name 积分明细
 * @description 单页js
 * @date 2015-12-07
 */
define(function (require, exports, module) {
    require('jquery');

    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter'),
        slotMachine = require('qianModule/raffle-slotMachine');


    var code =  hrefParameter.get('code'),
        popAlert = new base.Dialog('alert'),
        popWait = new base.Dialog('wait');
    //--------------------------------------------------【变量】

    var isIosApp = hrefParameter.get('native_view') ? /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
    //remainFreeTimes   freeTimesType:免费(0,1,2)         remainPlayTimes,playTimesType可抽(0,1,2)
    var playTimesType,      // 抽奖次数类型 0 无限 1 每天 2 永久
        freeTimesType,      // 免费抽奖次数类型 0 无限 1 每天 2 永久
        remainPlayTimes,    // 抽奖次数
        remainFreeTimes;    // 免费抽奖次数

    //--------------------------------------------------【渲染页面】
    var tpl = __inline('../tpl/pageLuckyDraw.tpl');

    base.handlebars.registerHelper("drawtiem", function (playTimesType,freeTimesType,remainPlayTimes,remainFreeTimes) {
        var _html = timesHtml(playTimesType,freeTimesType,remainPlayTimes,remainFreeTimes);
        return new base.handlebars.SafeString(_html);
    });
    function timesHtml(playTimesType,freeTimesType,remainPlayTimes,remainFreeTimes){
        var _html='';
        if(playTimesType == 0){ //抽奖类型无限
            if(freeTimesType == 0){ //免费类型未设置
            }else if(freeTimesType == 1){ //免费类型每天
                _html = '您今天还有<span>'+remainFreeTimes+'</span>免费次机会';
            }else if(freeTimesType == 2){ //免费类型永久
                _html = '您还有<span>'+remainFreeTimes+'</span>免费次机会';
            }
        }else if(playTimesType == 1){ //抽奖类型每天
            if(freeTimesType == 0){ //免费类型未设置
                _html = '您今天还有<span>'+remainPlayTimes+'</span>次机会';
            }else if(freeTimesType == 1){ //免费类型每天
                _html = '您今天还有<span>'+(remainPlayTimes+remainFreeTimes)+'</span>次机会,<span>'+remainFreeTimes+'</span>次免费机会';
            }else if(freeTimesType == 2){ //免费类型永久
                _html = '您今天还有<span>'+(remainPlayTimes+remainFreeTimes)+'</span>次机会';
                if(remainFreeTimes > 0){
                    _html += ',<span>'+remainFreeTimes+'</span>次免费机会';
                }
            }
        }else if(playTimesType == 2){ //抽奖类型永久
            if(freeTimesType == 0){ //免费类型未设置
                _html = '您还有<span>'+remainPlayTimes+'</span>次机会';
            }else if(freeTimesType == 1){ //免费类型每天
                _html = '您还有<span>'+(remainPlayTimes+remainFreeTimes)+'</span>次机会,<span>'+remainFreeTimes+'</span>次免费机会';
            }else if(freeTimesType == 2){ //免费类型永久
                _html = '您还有<span>'+(remainPlayTimes+remainFreeTimes)+'</span>次机会';
            }
        }
        return _html;
    }
    var myTemplate = base.handlebars.compile(tpl);
    var $integralTotal,
        $raffleStartBtn,
        integralTotal = 0,
        minLimit,
        floor = true,
        number = 0;
     //基本信息
    base.ajax({
        url:base.pageUrl.getScoreLotteryParam.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.getScoreLotteryParam.service,
            activityCode:code
        },
        dataType: "json",
        async: false,
        success:function(data){
            if(data.resultCode != 1){
                return;
            }
            var _data = $.extend(data.resultData,{isIosApp:isIosApp, activityCode:code});

            playTimesType = _data.playTimesType;
            freeTimesType = _data.freeTimesType;
            remainPlayTimes = _data.remainPlayTimes;
            remainFreeTimes = _data.remainFreeTimes;

            $('#pageLuckyDraw').html(myTemplate(_data));
            $integralTotal = $('#integralTotal');
            $raffleStartBtn = $('#raffleStartBtn');
            minLimit = parseInt($('.info').attr('data-spend'));        // 抽奖消耗积分

            var systemTime = data.resultData.systemTime,    //系统时间
                startDate = data.resultData.startDate,      //活动开始时间
                endDate = data.resultData.endDate;          //活动结束时间
            if(data.resultData.status == 0){    //0是活动关闭  1开启
                floor = false;
                popAlert.run({
                    contStr: '活动未开启',
                    confirmFunc: function () {

                        if (base.isApp()) {
                            hybridProtocol({
                                tagName: 'history',
                                data: {
                                    go:-1
                                }
                            });

                        } else {
                            window.history.go(-1)
                        }
                    }});
            }else{
                if(startDate && endDate){
                    if(systemTime < startDate){
                        $raffleStartBtn.addClass('btn-nodate').text('活动未开始');
                        count();
                        var setInt = setInterval(function(){count()},1000);
                        floor = false;return;
                    }
                    if(systemTime > endDate){$raffleStartBtn.addClass('btn-over').text('活动已结束');floor = false;return;}

                }
                if(startDate){
                    if(systemTime < startDate){
                        $raffleStartBtn.addClass('btn-nodate').text('活动未开始');
                        count();
                        var setInt = setInterval(function(){count()},1000);
                        floor = false;return;
                    }
                }
                if(endDate){
                    if(systemTime > endDate){$raffleStartBtn.addClass('btn-over').text('活动已结束'); floor = false;return;}
                }

                if(playTimesType!=0 && (remainPlayTimes+remainFreeTimes)<=0){
                    $raffleStartBtn.addClass('btn-end').text('机会已用完');
                    floor = false;
                }
            }

            function count(){
                number+=1000;
                var date = (new Date(startDate)) - (new Date(systemTime))-number,//计算剩余的毫秒数
                    dd = Math.floor(date / 1000 / 60 / 60 / 24),//计算剩余的天数
                    hh = Math.floor(date / 1000 / 60 / 60 % 24),//计算剩余的小时数
                    mm = Math.floor(date / 1000 / 60 % 60);//计算剩余的分钟数
                mm = mm < 10 ? "0"+mm : mm;
                var ss = Math.floor(date / 1000 % 60);//计算剩余的秒数
                ss = ss < 10 ? "0"+ss : ss;
                $('.lotternumber').hide();
                if(date < 0 ){
                    clearInterval(setInt);
                    location.reload();
                    return ;
                }
                var htmlStr = '<a id="payBtn" class="ui-btn red" href="javascript:;"><p class="count">距离开始还剩';
                if(dd > 0){
                    htmlStr += '<span>'+dd+'</span>天';
                }
                htmlStr += '<span>'+hh+'</span>时<span>'+mm+'</span>分钟<span>'+ss+'</span>秒</p></a>';
                $('.countadd').html(htmlStr)
            }
        },
        error: function(){
            popAlert.run({
                contStr: '服务器繁忙请稍后再试!',
                confirmFunc: function () {
                    isIng = false;
                    $raffleCon.removeClass('ing');
                }
            });
        }
    });

    //查询积分数
    base.ajax({
        url: base.pageUrl.getUserInfoStatus.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.getUserInfoStatus.service
        },
        dataType: "json",
        async: false,
        success: function (data) {
            integralTotal = data.resultData.userScore;
            if (integralTotal < minLimit) {
                $raffleStartBtn.addClass('disabled').text('钱币不足');
            }
            $integralTotal.text(integralTotal);
        },
        complete: function () {
            $('#pageLoading').hide();
        }
    });
    // 大转盘抽奖
    var $raffleCon=$('#raffleCon'),
        $raffleLi = $raffleCon.find('li');
    var raffle = new slotMachine({
        awardsArr: [$raffleLi[0], $raffleLi[1], $raffleLi[2], $raffleLi[5], $raffleLi[8], $raffleLi[7], $raffleLi[6], $raffleLi[3]],  //必填,循环的元素数组,按顺序点亮
        cycleIndex: 2,      //选填,开始定位到目标元素之前的旋转次数,默认为'2'
        currentClass: 'on'  // 选填,选中元素的class样式,默认为'on'
    });
    var isIng = false;
    $raffleStartBtn.on('click', function () {
        if (isIng) { //正在抽中
            return false;
        }
        if(!floor){ //按钮不可点击状态
            return false;
        }

        if(freeTimesType!=0 && remainFreeTimes>0){ //有免费次数 则减去免费次数
            remainFreeTimes -= 1;
        }else if(playTimesType!=0 && remainPlayTimes>0){
            remainPlayTimes -= 1;

            // 没有免费次数的时候扣除积分
            integralTotal -= minLimit;
            $integralTotal.text(integralTotal);
        }else{
            // 没有免费次数的时候扣除积分
            integralTotal -= minLimit;
            $integralTotal.text(integralTotal);
        }

        $('.lotternumber').html(timesHtml(playTimesType,freeTimesType,remainPlayTimes,remainFreeTimes));
        base.ajax({
            url: base.pageUrl.lotterynew.url,
            type: "post",
            data: {
                oauthToken: base.userInfo.oauthToken,
                appId: base.pageUrl.appId,
                service: base.pageUrl.lottery.service,
                activityCode:code
            },
            dataType: "json",
            async: false,
            beforeSend: function () {
                isIng = true;
                $raffleStartBtn.addClass('starting').text('抽奖中');
                $raffleCon.addClass('ing'); // 背景图添加ing样式,样式里做了背景的闪烁灯动画
            },
            success: function (data) {
                var lotteryCode = data.resultData.position,
                    lotteryPrize = data.resultData.awardsName,
                    lotteryScore = data.resultData.score;

                //结果弹窗
                raffle.run(lotteryCode, function () {

                    //重新获取剩余积分并赋值
                    integralTotal = lotteryScore;
                    $integralTotal.text(integralTotal);

                    $raffleStartBtn.removeClass('starting');

                    if(playTimesType!=0 && (remainPlayTimes+remainFreeTimes)<=0){
                        $raffleStartBtn.addClass('btn-end').text('机会已用完');
                        floor = false;
                    }
                    if (integralTotal < minLimit) {
                        $raffleStartBtn.addClass('disabled').text('钱币不足');
                        floor = false;
                    }else{
                        $raffleStartBtn.text('抽奖');
                    }

                    $raffleCon.removeClass('ing');

                    if (lotteryCode != undefined && !isNaN(lotteryCode)) {
                        popAlert.run({
                            contStr: '' +
                            '<p style="font-size:.36rem;color:#d03a0b;font-weight:bold">中奖了</p>' +
                            '<p style="margin-top:.3rem;font-size:.3rem;color:#333">恭喜您获得' + lotteryPrize + '</p>',
                            confirmFunc: function () {
                                isIng = false;
                            }
                        });
                    } else {
                        popAlert.run({
                            contStr: '' +
                            '<p style="font-size:.36rem;color:#333;font-weight:bold">没中奖</p>' +
                            '<p style="margin-top:.3rem;font-size:.28rem;color:#666">加油，继续努力~</p>',
                            confirmFunc: function () {
                                isIng = false;
                            }
                        });
                    }
                    $('#uiPopFrame').addClass('ui-pop-boom');
                });
            },
            error: function () {
                popAlert.run({
                    contStr: '服务器繁忙请稍后再试!',
                    confirmFunc: function () {
                        isIng = false;
                        $raffleCon.removeClass('ing');
                    }
                });
            },
            complete: function (xhr, status) {
                // resultCode 为0的时候 还原按钮状态
                if(xhr.responseJSON.resultCode == 0){
                    if (integralTotal < minLimit) {
                        $raffleStartBtn.removeClass('starting').addClass('disabled').text('钱币不足');
                    }else{
                        $raffleStartBtn.removeClass('starting').text('抽奖');
                    }
                    isIng = false;
                    $raffleCon.removeClass('ing');
                }
            }
        });
    });
});