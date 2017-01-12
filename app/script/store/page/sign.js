define(function (require, exports, module) {
    require('jquery');
    var base = require('module/base'),
        LoadDate = require('module/load-data');
    var tpl = __inline('../tpl/sign.tpl');
    var myTemplate = base.handlebars.compile(tpl);

    $('#sign').html(myTemplate(''));
    var referIntegral = function () {
        base.ajax({
            url: base.pageUrl.checkInH5.url,
            type: "post",
            data: {
                oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                appId: base.pageUrl.appId,
                service: base.pageUrl.checkInH5.service
            },
            dataType: "json",
            success: function (data) {
                $('.total em').html(data.resultData.score);
                var signCount = data.resultData.signCount;  //签到天数
                var signHistory = data.resultData.signHistory;  //签到历史记录
                var signInMark = data.resultData.signInMark;    //是否本次签到
                sign(signInMark,signCount); //是否本次签到&签到天数
                arrmonthsDay(signHistory, data.resultData.systemTime);  //日历
            }
        });
    };
    referIntegral();
    //签到

    function sign(quantity,signday){    //是否本次签到&签到天数
        var lis='';

       if(signday  == 1){
           lis += '<li><div class="round roundout"><div class="round-in round-in-out"></div></div><span><b></b></span></li><li><div class="round roundout"><div class="round-in round-in-out"></div></div><span><b></b></span></li>';
           for(var i=1;i<4;i++){
               if(i ==1){
                    lis += '<li class="thisday"><div class="round roundcolor"><div class="bling"><div class="inner"></div></div><div class="loading"><div class="loading-round"></div></div><div class="round-in round-in-color">+'+(i+1)+'</div></div><span><b>'+i+'</b>天</span></li>';
               }else{
                   lis += '<li><div class="round roundcolor"><div class="round-in round-in-color">+'+(i+1)+'</div></div><span><b>'+i+'</b>天</span></li>';
               }
           }
       }
       if(signday  == 2){
           lis += '<li><div class="round roundout"><div class="round-in round-in-out"></div></div><span><b></b></span></li>';
           for(var i=1;i<5;i++){
               if(i == 2){
                   lis +=  '<li class="thisday"><div class="round roundcolor"><div class="bling"><div class="inner"></div></div><div class="loading"><div class="loading-round"></div></div><div class="round-in round-in-color">+'+(i+1)+'</div></div><span><b>'+i+'</b>天</span></li>';
               }
               if(i< 2){
                   lis +=  '<li ><div class="round"><div class="round-in">+'+(i+1)+'</div></div><span><b>'+i+'</b>天</span></li>';
               }
               if(i>2){
                   lis +=  '<li><div class="round roundcolor"><div class="round-in round-in-color">+'+(i+1)+'</div></div><span><b>'+i+'</b>天</span></li>';
               }
           }
       }
       if(signday > 2){
           for(var i=1;i<6;i++){
               var days = (signday-2+i) > 8 ? 8 : (signday-2+i);
               if(i ==3){
                   lis +=  '<li class="thisday"><div class="round roundcolor"><div class="bling"><div class="inner"></div></div><div class="loading"><div class="loading-round"></div></div><div class="round-in round-in-color">+'+days+'</div></div><span><b>'+(signday-3+i)+'</b>天</span></li>';
               }
               if(i>3){
                   lis +=  '<li><div class="round roundcolor"><div class="round-in round-in-color">+'+days+'</div></div><span><b>'+(signday-3+i)+'</b>天</span></li>';
               }
               if(i<3){
                   lis +=  '<li><div class="round"><div class="round-in">+'+days+'</div></div><span><b>'+(signday-3+i)+'</b>天</span></li>';
               }

           }
       }

        $('.sign-site ul').html(lis);
        if(quantity == 1){
            $('.thisday .loading').css('display', 'none');

            setTimeout(function(){

                $('.thisday .round').removeClass('roundcolor');
                $('.thisday .round-in').removeClass('round-in-color');
                $('.thisday .loading').css('display', 'block');

                $('.thisday').addClass('bb');
            },300);
            setTimeout(function(){
                var win = '<div class="win">签到成功</div>';
                $('.thisday .round').append(win).find('.round-in').addClass('round-important');
                //$('.thisday .win').hide().prev('.round-in').removeClass('round-important');
            },1100)
        }else{
            var win = '<div class="win">签到成功</div>';
            $('.thisday .round').append(win).removeClass('roundcolor').find('.round-in').addClass('round-important');
            $('.thisday .round-in').removeClass('round-in-color');
        }

    }


    //打开签到说明
    var signstate = $('.sign-state');
    var poker = $('.poker');
    signstate.on('click',function(){
        poker.show();
    });
    //日历
    function arrmonthsDay(arr,time){    //
        //var targets = [0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1]
        var targets = arr.split('');
        var monthsDay = [31,28,31,30,31,30,31,31,30,31,30,31],
            dayNames = ['日','一','二','三','四','五','六'];
        var today = new Date(time),
            year = today.getFullYear(),
            month = today.getMonth(),
            date = today.getDate(),
            day = today.getDay();
        var isBissextile = year%400==0 || (year%4==0 && year%100!=0);
        monthsDay[1] = isBissextile ? 29 : 28;

        // 获取当月1号是周几
        // var firstDay = date%7 - day - 1;

        var firstDay = (new Date(year,month,1)).getDay();
        if(firstDay == 0){
            firstDay += 7;
        }
        var prevMonth = month == 0 ? monthsDay.length -1 : month - 1;
        var prevResidue = monthsDay[prevMonth] - firstDay;
        var nextResidue = 0;
        var html = '<table>';
        html += '<caption class="caption">'+year + '年'+ (month+1)+'月'+'</caption>';
        html += '<thead class="daysold"><tr >';
        for(var j = 0,dayNamesLen = dayNames.length; j < dayNamesLen; j++){
            html += '<td class="day1-7">'+dayNames[j]+'</td>'
        }
        html += '</tr></thead>';
        var _date = 0;
        for(var i = 0; i<42; i++){
            if(i == 0 || i%7==0){
                html += '<tr>'
            }
            if(i < firstDay){
                html += '<td class="empty">'+(++prevResidue)+'</td>'
            }else if(i >= firstDay && _date < monthsDay[month]){
                var className = '';
                if(targets[_date] == '1'){
                    className += 'tg'
                }
                if(_date == (date-1)){
                    className += ' today';
                }
                if(className){
                    html += '<td class="'+className+'">'+(++_date)+'</td>'
                }else{
                    html += '<td>'+(++_date)+'</td>'
                }
            }else{
                html += '<td class="empty">'+(++nextResidue)+'</td>'
            }
            if((i+1)%7==0 && i != 0){
                html += '</tr>'
            }
        }
        html += '</table>';
        document.getElementById('signlist').innerHTML = html;
    }


});
