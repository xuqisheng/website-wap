/**
 * 手机钱庄
 * @name 申购确认页
 * @description 单页js
 * @date 2015-07-30
 */
define(function (require, exports, module) {

    require('zepto');
    var pageUrl = require('module/ajax-map'),
        base = require('module/base'),
        Dialog = require('module/dialog'),
        cookie = require('module/cookie'),
        hrefParameter = require('module/href-parameter'),
        oneSession = require('module/one-session'),
        SubmitIng = require('module/submit-ing'),
        ActivateBtn = require('module/activate-btn'),
        Handlebars = require('module/handlebars-helper');

    module.exports = function () {
        var $pageProBuy = $('#pageProBuy');
        var popAlert = new Dialog('alert');
        var popWait = new Dialog('wait');
        //--------------------------------------------------【按钮激活】
        var activateBtn = new ActivateBtn({
            contain: $pageProBuy[0]
        });
        //--------------------------------------------------【申购数据联动】
        var $buyAmount = $('#buyAmount'),    //余额
            $earnings = $('#earnings'),      //预估收益
            $envelopeBtn = $('#envelopeBtn'),     //红包
            $gift = $('.gift'),                  //现金红包和折扣红包
            $address=$('.address'),              //浮动在底部的选择金额横条
            $ensure = $('.ensure'),       //确定按钮
            $envelopeList = $('#envelopeList'),    //红包的选择折扣
            $investAmount = $('#investAmount'),    // 我要投资的金额
            $bankBuy = $('#bankBuy'),             //银行里拿出的钱
            lowestAccountVal = Number($('#lowestAccount').val()), //最小投资额
            importAmount = 0,   // 输入的金额
            redPacketChecked = 0,  //勾选红包总和
            redPacketLimit = 0, //最大可选红包金额
            redPacketIdArr = [],  //红包id列表
            tenderDayVal = $('#tenderDay').val(), // 实际投资天数
            balanceVal = parseInt($('#balance').html()),    // 账户可用余额
            aprVal = Number($('#normalApr').val()) + Number($('#extraAwardApr').val()), // 最终年化收益率%
            monthsInterest = aprVal / 12 *0.01, // 月利率%
            mostAccount = Number($('#mostAccount').val()), // 最大投资金额
            redPacketUsage = Number($('#redPacketUsage').val()),//投资可用红包比例
            redPacketTotal = Number($('#redPacketTotal').val()),//红包总额
            buyAmount = 0,   // 余额支付金额
            bankBuyAmount = 0,   // 银行卡支付
            repaymentStyle = $('#repaymentStyle').val(),  // 还款方式
            period = $('#period').val(), // 等额本息 还款总期数
            publishDate = $('#publishDate').val(), // 发布日期
        // 计算实际需支付金额
            buyAmountFunc = function () {
                if (importAmount <= balanceVal + redPacketChecked) {
                    buyAmount = importAmount - redPacketChecked;
                    $buyAmount.html(buyAmount);
                    $bankBuy.html(0);
                } else {
                    buyAmount = balanceVal;
                    bankBuyAmount = importAmount - balanceVal - redPacketChecked;
                    $buyAmount.html(buyAmount);
                    $bankBuy.html(bankBuyAmount.toFixed(2));
                }
            };

        // 计算收益
        var income = (function(){
            var calc = null;
            if(repaymentStyle == 1){ // 等额本息
                var nowDate = new Date(),
                    pubDate = new Date(publishDate);
                nowDate.setHours(0);
                nowDate.setMinutes(0);
                nowDate.setSeconds(0);
                nowDate.setMilliseconds(0);
                pubDate.setHours(0);
                pubDate.setMinutes(0);
                pubDate.setSeconds(0);
                pubDate.setMilliseconds(0);
                var dayDiff = parseInt((nowDate - pubDate) / 86400000);

                if(dayDiff > 0){
                    calc = function(amount){
                        var sourceMonthsRepay = amount * monthsInterest * Math.pow((1+monthsInterest), period)/(Math.pow((1+monthsInterest), period) - 1);
                        return (sourceMonthsRepay.toFixed(2) * period -  ((amount * aprVal * 0.01) / 365 * dayDiff).toFixed(2) - amount).toFixed(2)
                    }
                }else{
                    calc = function(amount){
                        var sourceMonthsRepay = amount * monthsInterest * Math.pow((1+monthsInterest), period)/(Math.pow((1+monthsInterest), period) - 1);
                        return (sourceMonthsRepay.toFixed(2) * period - amount).toFixed(2)
                    }
                }

            }else{
                calc = function(amount){
                    return ((amount * aprVal * 0.01) / 365 * tenderDayVal).toFixed(2)
                }
            }
            return calc;
        })();

        var packetstate,
            cash = 0,
            cashone = 0,
            amount = 0,
            valueof = 0,
            amounted = 0,
            valus = $investAmount.val(),
            valusold = $investAmount.val();

        var isNew = $('#isNew').val();   //是否是新手
        var tenderDay = parseInt($('#tenderDay').val());   //实际投资天数
        var leastInterestDays = parseInt($("#leastInterestDays").val());   //最小理财天数
        var interestDays = parseInt($('#interestDays').val());  //投资期限

        // 显示红包列表
        $envelopeBtn.one('click', function () {
            $envelopeList.removeClass('js_hide');
        });
        var nvestment = $('.invest-mold').html().substring(0,3);  //投资类型
        function packet (btn,success){
            var available = [],          //现金红包可用
                notavailable = [];       //现金红包不可用
            for(var i=0;i<globalData[btn].length;i++){
                var leastTenderAmount = globalData[btn][i].leastTenderAmount,   //最小投资金额
                    leastTenderDays = globalData[btn][i].leastTenderDays,       //最短投资天数
                    redPacketAmount = globalData[btn][i].redPacketAmount,       //红包金额
                    productTypeLimit = globalData[btn][i].productTypeLimit,     //产品类型
                    productTypeLimitlist = productTypeLimit.split(","),
                    effectFlag = globalData[btn][i].effectFlag;                 //产品是否有效 0未生效 1生效
                var checkType = true;
                if(productTypeLimit != '' && success == 'resultone'){
                    for(var j=0;j<productTypeLimitlist.length;j++){
                        checkType = false;
                        if(productTypeLimitlist[j] == nvestment){
                            checkType = true;
                            break;
                        }
                    }
                }

                var values =  parseInt(redPacketUsage*parseInt( $('#investAmount').val()));   //投资计算利息的值
                var ableAmount = values >= redPacketAmount;    //投资利息值是否大于红包金额

                //输入的投资金额 > 最小投资金额   **  计息天数 > 最短投资天数   && 投资类型相等  &&  投资利息值大于红包金额  &&   实际投资天数 > 最小理财天数
                if(isNew == 'true'){
                    if( parseInt($investAmount.val()) >= parseInt(leastTenderAmount) && parseInt($('#interestDays').val()) >= parseInt(leastTenderDays) && checkType && ableAmount && effectFlag == 1){
                        available.push(globalData[btn][i]);
                    }else{
                        notavailable.push(globalData[btn][i]);
                    }
                }else{
                    if( parseInt($investAmount.val()) >= parseInt(leastTenderAmount) && parseInt($('#interestDays').val()) >= parseInt(leastTenderDays) && checkType && ableAmount && tenderDay > leastInterestDays && effectFlag == 1){
                        available.push(globalData[btn][i]);
                    }else{
                        notavailable.push(globalData[btn][i]);
                    }
                }

            }
            var arr={
                'available':available,
                'notavailable':notavailable
            };
            //点击为现金红包时
            if(success == 'result'){
                var tpl =__inline('../tpl/cashRedpacketList.tpl');
                var myTemplate = Handlebars.compile(tpl);
                $('.packetboom').eq(0).html(myTemplate(arr));
            }
            //点击为折扣红包时
            if(success == 'resultone'){
                var tpl =__inline('../tpl/deductRedpacketList.tpl');
                var myTemplate = Handlebars.compile(tpl);
                $('.packetboom').eq(1).html(myTemplate(arr));
            }

        }
        $('.popsub .shadeone').on('click',function(){
            $('.address').hide();
            $('.packetboom').hide();
            $('.popsub').hide();
        });
        //选择折扣红包或则现金红包
        var stanrekordu = [],
            stanrekorduone = [],
            stanrekordureturn = [],
            stanrekorduonereturn = [],
            sign = 0;
        $gift.on('click',function(){
           if($(this).find('.conts').is(":visible")){
               if($('#investAmount').val() == '' || $('#investAmount').val() == '0'){
                   popWait.run({
                       contStr: '请输入投资金额'
                   });
                   return ;
               }
               $('.address').show();
               $('.popsub').show();
               packetstate = $(this);
               if($(this).hasClass('on-flow')){         //跳转现金红包
                   var valueone = $investAmount.val();   //输入的金额值
                   var values =  parseInt(redPacketUsage*parseInt( $('#investAmount').val()));   //投资计算利息的值
                   $('.packetboom').eq(0).show();
                   if(valueone != valus){    //投资的金额值不等于前一次投资的金额值
                       packet('cashRedpacketList',"result");  //加载相应的模版
                       valus = valueone;    // 把当次投资的金额值赋值给上次投资的金额值
                   }
                   var money =0;
                   var number = 0;
                   if($('.usable .on-cash').length > 0){
                       for(var i=0;i<$('.usable .on-cash').length;i++){
                           money +=parseInt($('.usable .on-cash').eq(i).find('.money').html());   //红包的值
                       }
                   }

                   number = money > values ? values : money;
                   if(interestDays <= leastInterestDays && !isNew){   //最小理财天数 && 是否新手  == true
                       number = 0;
                   }
                   $('.us-moeney span').html(number);

                   $('.usable .on-cash .triangle').hide();
                   if($('.usable .on-cash').length > 0){
                       stanrekordu = stanrekordureturn;
                       stanrekorduone =  stanrekorduonereturn;
                       for(var i=0;i<$('.usable .on-cash').length;i++){
                           if($('.usable .on-cash').eq(i).find('.triangle').is(':visible')){
                               var money = parseInt($('.usable .on-cash').eq(i).find('.money').html());
                               //stanrekordu.push(i);
                               //stanrekorduone.push(money);
                           }
                       }

                       var inNumberation = 0;
                       for(var i=0;i<stanrekordu.length;i++){
                           $('.usable .on-cash').eq(stanrekordu[i]).find('.triangle').show();
                           inNumberation += stanrekorduone[i];
                       }
                       $('.elect span').html(inNumberation);
                   }
                   sign = inNumberation;

               }
               if($(this).hasClass('on-dis')){         //跳转折扣红包
                   $('.address').hide();
                   var valueone = $investAmount.val();
                   $('.packetboom').eq(1).show();
                   if(valueone != valusold){
                     packet('deductRedpacketList',"resultone");  //加载相应的模版
                       valusold = valueone;
                   }
               }
               for(var i=0;i<$('.service').length;i++){       //替换后台传输的\n替换成</br>
                   $('.service').eq(i).html($('.service').eq(i).html().replace(/\n/,'</br>'));
               }
           }
        });
        //点进现金红包或者折扣的时候显示相对应内容
        //function selecting(btn){
        //    amount = 0;
        //    $('.elect span').html(0);
        //    for(var i=0;i<$('.usable .ticket').length;i++){
        //        if($('.usable .ticket').eq(i).hasClass(btn)){
        //            $('.usable .ticket').eq(i).show();
        //            if($('.usable .ticket').eq(i).find('.triangle').is(":visible")){
        //                amount+=parseInt($('.usable .ticket').eq(i).find('.money').html());
        //            }
        //        }else{
        //            $('.usable .ticket').eq(i).hide();
        //        }
        //    }
        //    if(parseInt(amount) > 0){
        //        $('.elect span').html(amount);
        //    }else{
        //        $('.elect span').html(0);
        //    }
        //}
        //计算展示金额
        function textsum(){
            amounted = 0;
            //余额
            var balance =parseInt($('#balance').html(),10) ;
            for(var i=0;i<$('.font-color-gray-neutrall').length;i++){
                if(parseInt($('.font-color-gray-neutrall').eq(i).html()) >= 0){
                    amounted +=parseInt($('.font-color-gray-neutrall').eq(i).html());
                }
            }
            //如果余额大于等于(投资金额+红包)
            if(balance+amounted >= (parseInt($investAmount.val(),10))){

                $buyAmount.html(parseInt($investAmount.val(),10)-amounted);
                $bankBuy.html(0);
            }
            if(balance+amounted < (parseInt($investAmount.val(),10))){
                $buyAmount.html(balance);
                $bankBuy.html(parseInt($investAmount.val(),10)-balance-amounted);
            }
            stanrekordureturn = [];
            stanrekorduonereturn = [];
        }
        //点击折扣的时候显示的文字内容
        function ticketreturn(_this){
            if(_this.hasClass('discount-one')){
                if(_this.find('.triangle').is(':hidden')){

                    $('.discount-one').find('.triangle').hide();
                    _this.find('.triangle').show();
                    popss = parseInt(_this.find('.hbids').html());
                    cashone = parseInt(_this.find('.money').html());
                    $('.font-color-gray-neutral').eq(2).addClass('font-color-gray-neutrall').html(cashone+'元');
                    $('.packetboom').hide();
                    textsum();
                    amounted = 0;
                    //余额
                    var balance =parseInt($('#balance').html(),10) ;
                    for(var i=0;i<$('.font-color-gray-neutrall').length;i++){
                        if(parseInt($('.font-color-gray-neutrall').eq(i).html()) >= 0){
                            amounted +=parseInt($('.font-color-gray-neutrall').eq(i).html());
                        }
                    }
                    //如果余额大于等于(投资金额+红包)
                    if(balance+amounted >= (parseInt($investAmount.val(),10))){

                        $buyAmount.html(parseInt($investAmount.val(),10)-amounted);
                        $bankBuy.html(0);
                    }
                    if(balance+amounted < (parseInt($investAmount.val(),10))){
                        $buyAmount.html(balance);
                        $bankBuy.html(parseInt($investAmount.val(),10)-balance-amounted);
                    }
                }else{
                    _this.find('.triangle').hide();
                    popss = '';
                    $('.packetboom').hide();
                    $('.font-color-gray-neutral').eq(2).removeClass('font-color-gray-neutrall').html('');
                    textsum();
                }



            }
            var  sum = parseInt($('.us-moeney span').html());   //可用金额
            var  summer = 0;
            if(_this.hasClass('on-cash')){
                var valueofin = parseInt($('.elect span').html());

                if(valueofin == 0){
                    valueof = 0;
                }
                if(_this.find('.triangle').is(':hidden')){
                    sign += parseInt(_this.find('.money').html());
                    valueof =sign;
                    if(valueof > sum ){
                        popAlert.run('本次最多可用'+sum+'元红包');
                        valueof-= parseInt(_this.find('.money').html());
                        sign = valueof;
                        return ;
                    }
                    _this.find('.triangle').show();
                }else{
                    sign -= parseInt(_this.find('.money').html());
                    valueof =sign;
                    _this.find('.triangle').hide();
                }


                $('.elect span').html(valueof);
            }
        }
        //点击红包选中状态
        $('.packetboom').on('click','.ticket',function(){
            if($(this).find('.triangle').hasClass('noclick')){
                return;
            }
            ticketreturn($(this));
        });
        //点击红包确定按钮
        var pops=[];
        var popss = '';
        $ensure.on('click',function(){
            pops = [];
            stanrekordureturn = [];
            stanrekorduonereturn = [];
            for(var i=0;i<$('.on-cash').length;i++){
                if($('.on-cash').eq(i).find('.triangle').is(":visible")){
                    var ids = parseInt($('.on-cash').eq(i).find('.hbids').html());  //获取红包id
                    stanrekordureturn.push(i);
                    var money = parseInt($('.on-cash').eq(i).find('.money').html());
                    stanrekorduonereturn.push(money);
                        pops.push(ids);
                }
            }

            var tletmoney;
            tletmoney = parseInt($('.elect').find('span').html());
            $('.packetboom').hide();
            $('.popsub').hide();
            $address.hide();
            if(tletmoney == 0){
                packetstate.find('.font-color-gray-neutral').eq(0).removeClass('font-color-gray-neutrall').html('');
            }else{
                packetstate.find('.font-color-gray-neutral').eq(0).addClass('font-color-gray-neutrall').html(tletmoney+'元');
            }

            //投资的金额在可投的金额内
                amounted = 0;
            //余额
            var balance =parseInt($('#balance').html(),10) ;

            for(var i=0;i<$('.font-color-gray-neutrall').length;i++){
                if(parseInt($('.font-color-gray-neutrall').eq(i).html()) >= 0){
                    amounted +=parseInt($('.font-color-gray-neutrall').eq(i).html());
                }
            }
            //如果余额大于等于(投资金额+红包)
            if(balance+amounted >= (parseInt($investAmount.val(),10))){

                $buyAmount.html(parseInt($investAmount.val(),10)-amounted);
                $bankBuy.html(0);
            }
            if(balance+amounted < (parseInt($investAmount.val(),10))){
                $buyAmount.html(balance);
                $bankBuy.html(parseInt($investAmount.val(),10)-balance-amounted);
            }

        });




        // 勾选红包
        //$envelopeList.find('input').on('change', function () {
        //    var $this = $(this);
        //
        //    // 如果未输入投资金额,提示
        //    if (!$investAmount.val()) {
        //        $this[0].checked = false;
        //        redPacketChecked -= $this.data('amount');
        //        popAlert.run('请输入投资金额');
        //        return false;
        //    }
        //
        //    // 产品可投金额小于最小投资额时(即将满标状态)不可使用红包
        //    if (mostAccount < lowestAccountVal) {
        //        popAlert.run('本次最多可用0元红包');
        //    }
        //
        //    // 根据是否勾选计算红包总和
        //    if ($this[0].checked) {
        //        redPacketChecked += $this.data('amount');
        //        // 存入红包id
        //        redPacketIdArr.push($this.val());
        //    } else {
        //        redPacketChecked -= $this.data('amount');
        //        redPacketIdArr.forEach(function (val, index) {
        //            if (val == $this.val()) {
        //                redPacketIdArr.splice(index, 1);
        //            }
        //        });
        //
        //    }
        //
        //    // 超过最大可选红包金额时取消勾选,并提示
        //    if (redPacketChecked > redPacketLimit) {
        //        $this[0].checked = false;
        //        redPacketChecked -= $this.data('amount');
        //        redPacketIdArr.pop();
        //        popAlert.run('本次最多可用' + redPacketLimit + '元红包');
        //    }
        //
        //    // 已选择红包金额显示
        //  //  $envelopeBtn.find('.conts').html('已选择' + redPacketChecked + '元');
        //
        //    buyAmountFunc();
        //});
        // 预估收益计算
        $investAmount.on('input', function () {
            var $this = $(this);

            importAmount = Number($this.val().replace(/\D/g, ''));

            // 重置红包列表
            $envelopeBtn.find('input').each(function () {
                this.checked = false;
            });

            if (!$envelopeList.hasClass('js_hide')) {
               // $envelopeBtn.find('.conts').html('已选择0元');
            }
            redPacketIdArr.length = 0;

            // 重置勾选的红包总计
            redPacketChecked = 0;

            // 禁止输入非数字
            $this.val(importAmount);

            // 超过最大投资金额,则替换成最大投资金额
            if (importAmount > mostAccount) {
                importAmount = mostAccount;
                $this.val(mostAccount);
            }

            // 计算逾期收益
            //$earnings.html(((importAmount * aprVal * 0.01) / 365 * tenderDayVal).toFixed(2));
            $earnings.html(income(importAmount));

            // 最大可选红包金额
            redPacketLimit = parseInt(importAmount * redPacketUsage);

            // 投资金额大于最低可投,显示红包可用大小
            //if (mostAccount >= lowestAccountVal && importAmount >= lowestAccountVal) {
            //    $('#redPacketLimit').html('红包(本次可用' + (redPacketTotal < redPacketLimit ? redPacketTotal : redPacketLimit) + '元)');
            //} else {
            //    $('#redPacketLimit').html('红包(本次可用0元)');
            //}

            // 重置红包列表
            $envelopeList.find('input').each(function () {
                this.checked = false;
            });
            //如果余额大于投资金额
            buyAmountFunc();
            textsum();
            $('.font-color-gray-neutrall').html("");
            $('.elect span').html('0');
            $('.ticket .triangle').hide();
        });

        // 需要一次性投资完的情况
        if ($investAmount.val()) {
            $investAmount.trigger('input');
        }

        //--------------------------------------------------【绑卡流程】
        var $bankCard = $('#bankCard');
        $('#bindBank').on('change', function () {
            var $this = $(this);
            $('#bankCardNo').val('');
            if ($this.val()) {
                $bankCard.removeClass('js_hide');
            } else {
                $bankCard.addClass('js_hide');
            }
        });
        $('#bankCardNo').on('input', function () {
            var $this = $(this);
            $this.val($this.val().replace(/\D/g, ''));
        });
        //--------------------------------------------------【表单提交】

        var popDealPassword = new Dialog('confirm'),
            htmlStr = '';


        // 防重复提交
        var submitIng = new SubmitIng({
            elmBtn: $pageProBuy.find('.js-submit')[0]
        });
        $pageProBuy.find('.js-submit').on('click', function () {
            var poin=[];
            for(var i=0;i<pops.length;i++){
                poin.push(pops[i]);
            }
            if(popss != ''){
                poin.push(popss);
            }
            var dealPasswordVal = '',   // 获取交易密码
                bankCardNoVal = $('#bankCardNo').val(),   // 获取银行卡卡号
                buyType = $bankBuy.html() == '0' ? 0 : 1, // 根据dom上的余额标签显示判断支付类别,0为余额支付,1为跳转连连支付
                isBindBank = $('#hiddenCardNo').html() ? 1 : 0;   //根据dom上的是否有银行卡尾号标签,判断是否绑定银行卡

            // 提交中则跳出
            if (submitIng.state) {
                return false
            } else {
                submitIng.start('支付中...');
            }

            if (mostAccount > lowestAccountVal) {
                if (lowestAccountVal > importAmount) {
                    popAlert.run('投资金额不能少于起投金额');
                    submitIng.end();
                    return false;
                }
            }

            htmlStr = '<div class="ui-pop-cont-deal-password"><input id="dealPassword" class="ui-input-text" type="password" /><a class="font-color-gray-neutral" href="forgetTransPassword.html" data-ajax="false">忘记</a></div>';
            popDealPassword.run({
                titStr: '请输入交易密码',
                contStr: htmlStr,
                confirmFunc: function () {
                    dealPasswordVal = $('#dealPassword').val();
                    if (!dealPasswordVal) {
                        popAlert.run('请输入交易密码');
                        submitIng.end();
                        return false;
                    }
                    if (!buyType) {
                        base.ajax({
                            type: "post",
                            url: pageUrl.tender.url,
                            async: true,
                            dataType: "json",
                            data: {
                                appId: pageUrl.appId,
                                borrowId: hrefParameter.get('borrowId'),
                                money: importAmount,
                                oauthToken: cookie.getCookie('qz_h5_oauthToken'),
                                payPwd: base.encryptedPwd(dealPasswordVal),
                                redpacketIds: poin.join(','),
                                service: pageUrl.tender.service,
                                useMoney: buyAmount
                            },
                            success: function (data) {
                                location.href = hrefParameter.create(location.href.split('#')[0]).set('orderNo', data.resultData.orderNo) + '#&pageBuyResult';
                            },
                            beforeFunc: function () {
                                submitIng.end();
                            }
                        });
                    } else {
                        if (!isBindBank) {
                            base.ajax({
                                type: "post",
                                url: pageUrl.addBankCard.url,
                                async: true,
                                dataType: "json",
                                data: {
                                    appId: pageUrl.appId,
                                    service: pageUrl.addBankCard.service,
                                    bankCardNo: base.encryptedPwd(bankCardNoVal),
                                    oauthToken: cookie.getCookie('qz_h5_oauthToken')
                                },
                                success: function (data) {
                                    if (data.resultCode == 1) {
                                        checkTenderForCard(dealPasswordVal, base.encryptedPwd(bankCardNoVal));
                                    }
                                },
                                beforeFunc: function () {
                                    submitIng.end();
                                }
                            });
                            return false;
                        }
                        checkTenderForCard(dealPasswordVal, base.encryptedPwd(bankCardNoVal));
                    }
                },
                cancelFunc: function () {
                    // 取消回调
                    submitIng.end();
                },
                callback: function () {
                    // 添加session做页面返回的重定向
                    $('#uiPopFrame .ui-pop-cont-deal-password a').on('click', function () {
                        oneSession.set('redirectURL', location.href);
                    });

                    // 交易密码输入框获得焦点
                    $('#dealPassword').focus();
                }
            });
        });
        function checkTenderForCard(dealPasswordVal, bankCardNoVal) {
            var poin=[];
            for(var i=0;i<pops.length;i++){
                poin.push(pops[i]);
            }
            if(popss != ''){
                poin.push(popss);
            }
            bankBuyAmount = parseInt($bankBuy.html());
            base.ajax({
                type: "post",
                url: pageUrl.checkTenderForCard.url,
                async: true,
                dataType: "json",
                data: {
                    appId: pageUrl.appId,
                    bankCardNo: bankCardNoVal,
                    bankMoney: bankBuyAmount,
                    borrowId: hrefParameter.get('borrowId'),
                    money: importAmount,
                    oauthToken: cookie.getCookie('qz_h5_oauthToken'),
                    payPwd: base.encryptedPwd(dealPasswordVal),
                    redpacketIds: poin.join(','),
                    service: pageUrl.checkTenderForCard.service,
                    useMoney: buyAmount
                },
                success: function (data) {
                    var newData = $.extend(this.data, {
                        service: pageUrl.tenderForCard.service
                    });

                    location.href = pageUrl.tenderForCard.url + '?' + $.param(newData);
                },
                beforeFunc: function () {
                    submitIng.end();
                }
            });
        }

        //--------------------------------------------------【暴露接口内存回收】
        return function () {

            //$envelopeBtn.off('click');
            $envelopeList.find('input').off('change');
            $investAmount.off('input');
            $('#bindBank').off('change');
            $pageProBuy.find('.js-submit').off('click');

            popAlert.destroy();
            activateBtn.destroy();
            popDealPassword.destroy();
            submitIng.destroy();
        }
    };
});