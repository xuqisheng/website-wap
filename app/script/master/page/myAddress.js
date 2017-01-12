/**
 * 手机钱庄
 * @name 绑定银行卡
 * @description 单页js
 * @date 2015-08-12
 */
define(function (require, exports, module) {

    require('zepto');
    var pageUrl = require('module/ajax-map'),
        base = require('module/base'),
        cookie = require('module/cookie'),
        Mobilebone = require('mobilebone'),
        Pop = require('module/dialog'),
        Verifyfrom = require('module/verifyfrom'),
        verifyRule = require('module/validate-rule'),
        hrefParameter = require('module/href-parameter'),
        hybridProtocol = require('module/native-calls'),
        Handlebars = require('module/handlebars-helper');

    //单页js
    //module.exports = function () {
    var alertPop = new Pop('wait');

    var isApp = hrefParameter.get('native_view'),
        token = hrefParameter.get('oauthToken') || hrefParameter.get('access_token');

    if(!isApp){
        token = cookie.getCookie('qz_h5_oauthToken');
    }

    var pageMyAddress = $('#pageMyAddress'),
        pageSetAddress = $('#pageSetAddress');
    var AddressTpl =__inline('../tpl/pageMyAddress.tpl');
    var addressTemplate = Handlebars.compile(AddressTpl);

    var addressData = {};

    var provinceOption = '<option selected disabled value="">选择所在省份</option>';
    var cityOption = '';
    var $province = $('#province'),
        $city = $('#city'),
        $userName = $('#username'),
        $userPhone = $('#userphone'),
        $address = $('#address'),
        $submitAddress = $('#submitAddress');
    //--------------------------------------------------【地址展示 判断是否存在默认地址 填写或者修改地址事件绑定】
    function ajaxAddress(datajson, callback){
        $.ajax({
            url: pageUrl.address.url,
            type: "post",
            data: datajson,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            async: false,
            timeout: 10000,
            success: function (data) {
                if (data.resultCode == 0) {
                    if (data.errorCode == 'TOKEN_EXPIRED') {
                        // 登录过期 直接去登录
                        var curPageUrl = location.href;
                        var h5loginUrl = location.protocol + '//' + location.host + '/interlayer.html?redirectURL=' + curPageUrl;
                        // 删除登录标识cookie
                        cookie.setCookie('qz_h5_phone', '', -1);
                        cookie.setCookie('qz_h5_oauthToken', '', -1);
                        // 登录跳转
                        if(isApp){
                            hybridProtocol({
                                tagName: 'openNativePage',
                                data: {
                                    type:'login',
                                    url:curPageUrl
                                }
                            });
                        }else{
                            window.location.href = h5loginUrl;
                        }
                    } else {
                        // 弹出提醒
                        alertPop.run(data.resultMsg);
                    }
                    return false;
                }else if(data.resultCode == 1){
                    addressData = data.resultData || addressData;
                    callback && callback(data);
                }
            }
        });
    }
    ajaxAddress({
        native_view: (isApp ? 'app' : ''),
        oauthToken: token
    },function(){
        pageMyAddress.html(addressTemplate(addressData))
    });
    // 编辑或者填写地址
    pageMyAddress.on('click', function(e){
        var target = $(e.target);
        if(target.hasClass('j-addAddress')){
            showSetAddress();
        }
    });
    //--------------------------------------------------【填写地址】
    //获取省份option
    $.ajax({
        url: pageUrl.getProvinceList.url,
        type: "post",
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        async:false,
        success: function (data) {
            if (data.resultCode == 1) {
                var resultData = data.resultData,
                    count = 0;
                for(var l = resultData.length; count < l; count++){
                    provinceOption += "<option value='"+resultData[count].id+"'>"+resultData[count].name+"</option>";
                }
                $province.html(provinceOption);
            }
        }
    });
    //获取省份对应城市option
    function changeCity(){
        cityOption = '<option selected disabled value="">选择所在城市</option>';
        $.ajax({
            url: pageUrl.showArea.url,
            type: "post",
            data:"pid="+$province.val(),
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            async:false,
            success: function (data) {
                $(data).each(function(i, item){
                    cityOption += "<option value='"+item.id+"'>"+item.name+"</option>";
                });
                $city.html(cityOption);
            }
        });
    }
    var verifyfrom = new Verifyfrom();
    verifyfrom.add($userName[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请输入收货人姓名'
    }, {
        strategy: verifyRule.realName,
        errorMsg: '姓名格式不正确'
    },{
        strategy: 'minLength:2',
        errorMsg: '收货人姓名为2-15位'
    },{
        strategy: 'maxLength:15',
        errorMsg: '收货人姓名为2-15位'
    }]);
    verifyfrom.add($userPhone[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请输入收货人手机号'
    }, {
        strategy: verifyRule.phone,
        errorMsg: '请输入正确的手机号'
    }]);
    verifyfrom.add($province[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请选择所在省份'
    }]);
    verifyfrom.add($city[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请选择所在城市'
    }]);
    verifyfrom.add($address[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请填写详细地址'
    }]);
    function submitForm(){
        // 表单校验
        var msg = verifyfrom.start();
        if(msg){
            alertPop.run(msg);
            return false;
        }
        ajaxAddress({
            native_view: (isApp ? 'app' : ''),
            oauthToken: token,
            actionType: 'modify',
            address: $address.val(),
            cityStr: optionHtml($city),
            name: $userName.val(),
            provinceStr: optionHtml($province),
            tel: $userPhone.val()
        },function(){
            showMyAddress();
        });
    }
    // 存在默认地址的情况填入
    function defaultData(){
        //判断默认名字 不存在则直接返回
        if(!addressData.name){return false}
        var provinceList = $province.find('option');
        for(var i=0,ilen=provinceList.length; i < ilen; i++){
            if(provinceList.eq(i).text() == addressData.province){
                $province[0].selectedIndex = i;
                break;
            }
        }
        changeCity();
        var cityList = $city.find('option');
        for(var j=0,jlen=cityList.length; j < jlen; j++){
            if(cityList.eq(j).text() == addressData.city){
                $city[0].selectedIndex = j;
                break;
            }
        }
        $userName.val(addressData.name);
        $userPhone.val(addressData.tel);
        $address.val(addressData.address);
    }
    function optionHtml($obj){
        var index = $obj[0].selectedIndex;
        return $obj.find('option').eq(index).text();
    }
    // 保存按钮状态方法
    function submitBtnState(){
        if($userName.val() && $userPhone.val() && $province.val() && $city.val() && $address.val()){
            $submitAddress.removeClass('disabled')
        }else{
            $submitAddress.addClass('disabled')
        }
    }
    // 省份切换联动城市数据加载
    $province.on('change', changeCity);
    // 保存按钮状态事件
    $('input,textarea,select').on('input change', submitBtnState);
    $submitAddress.on('click',submitForm);
    //--------------------------------------------------【地址展示 和 填写地址 场景切换】
    //填写地址
    function showSetAddress(){
        defaultData();
        submitBtnState();
        submitBtnState();
        Mobilebone.transition(pageSetAddress[0], pageMyAddress[0], {
            history: false
        });
    }
    //地址展示
    function showMyAddress(){
        pageMyAddress.html(addressTemplate(addressData));
        Mobilebone.transition(pageMyAddress[0], pageSetAddress[0], {
            history: false
        });
    }
    Mobilebone.classAnimation = "fade";
    Mobilebone.init();
    //--------------------------------------------------【暴露接口内存回收】
    //return function () {
    //    pageAddBankCard.find('.add-card-link').off('click', routeAddBankCardForm);
    //    bandCard.off('input', checkInput);
    //    pageAddBankCardForm.find('.js-submit').off('click', addBank);
    //};
    //};
});
