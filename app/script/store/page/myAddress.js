/**
 * 手机钱庄
 * @name 绑定银行卡
 * @description 单页js
 * @date 2015-08-12
 */
define(function (require, exports, module) {

    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        Verifyfrom = require('qianModule/verifyfrom'),
        verifyRule = require('qianModule/validate-rule'),
        hrefParameter = require('qianModule/href-parameter');

    //单页js
    var alertPop = new Pop('alert');
    var confirm = new Pop('confirm');
    var provinceOption = '<option selected disabled value="">选择所在省份</option>';
    var cityOption = '';
    var $province = $('#province'),
        $city = $('#city'),
        $userName = $('#username'),
        $userPhone = $('#userphone'),
        $address = $('#address'),
        $submitAddress = $('#submitAddress');
   // var Pop = require('qianModule/dialog');
    //--------------------------------------------------【页面渲染】
    addressLinkage();   // 城市联动的ajax必须优先执行

    base.ajax({
        url: base.pageUrl.checkAddress.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.checkAddress.service
        },
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.resultData) {
                defaultData(data.resultData);
            }
        }
    });

    //--------------------------------------------------【按钮激活】

    // 保存按钮状态方法
    function submitBtnState() {
        if ($userName.val() && $userPhone.val() && $province.val() && $city.val() && $address.val()) {
            $submitAddress.removeClass('disabled')
        } else {
            $submitAddress.addClass('disabled')
        }
    }

    // 立即判断状态
    submitBtnState();

    // 保存按钮状态事件
    $('input,textarea,select').on('input change', submitBtnState);

    //--------------------------------------------------【填写地址】

    function addressLinkage() {
        //获取省份option
        $.ajax({
            url: base.pageUrl.getProvinceList.url,
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.resultCode == 1) {
                    var resultData = data.resultData,
                        count = 0;
                    for (var l = resultData.length; count < l; count++) {
                        provinceOption += "<option value='" + resultData[count].id + "'>" + resultData[count].name + "</option>";
                    }
                    $province.html(provinceOption);
                }
            }
        });

        // 省份切换联动城市数据加载
        $province.on('change', changeCity);
    }

    //获取省份对应城市option
    function changeCity() {
        cityOption = '<option selected disabled value="">选择所在城市</option>';
        $.ajax({
            url: base.pageUrl.showArea.url,
            type: "post",
            data: "pid=" + $province.val(),
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            async: false,
            success: function (data) {
                $(data).each(function (i, item) {
                    cityOption += "<option value='" + item.id + "'>" + item.name + "</option>";
                });
                $city.html(cityOption);
            }
        });
    }

    //--------------------------------------------------【格式校验】

    var verifyfrom = new Verifyfrom();
    verifyfrom.add($userName[0], [{
        strategy: 'isNonEmpty',
        errorMsg: '请输入收货人姓名'
    }, {
        strategy: verifyRule.realName,
        errorMsg: '姓名格式不正确'
    }, {
        strategy: 'minLength:2',
        errorMsg: '收货人姓名为2-15位'
    }, {
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

    //--------------------------------------------------【存在默认地址的情况填入】

    function defaultData(addressData) {
        //判断默认名字 不存在则直接返回
        if (!addressData.name) {
            return false
        }
        var provinceList = $province.find('option');
        for (var i = 0, ilen = provinceList.length; i < ilen; i++) {
            if (provinceList.eq(i).text() == addressData.province) {
                $province[0].selectedIndex = i;
                break;
            }
        }
        changeCity();
        var cityList = $city.find('option');
        for (var j = 0, jlen = cityList.length; j < jlen; j++) {
            if (cityList.eq(j).text() == addressData.city) {
                $city[0].selectedIndex = j;
                break;
            }
        }
        $userName.val(addressData.name);
        $userPhone.val(addressData.tel);
        $address.val(addressData.address);
    }
    //先请求是否有地址信息
    base.ajax({
        url: base.pageUrl.updateAddress.url,
        type: "post",
        data: {
            oauthToken: base.userInfo.oauthToken,
            appId: base.pageUrl.appId,
            service: base.pageUrl.updateAddress.service,
            pageType: 'only'
        },
        dataType: "json",
        async: false,
        success: function (data) {
            if(data.resultData.name){
                confirm.run('是否使用默认地址');
            }
        }
    });

    var orderNo = hrefParameter.get('orderNo');
    var firm = $('.ui-pop-operation').find('a').eq(1);      //确定
    //使用默认地址，跳转商品详情
    firm.on('click',function(){
        firmaj(orderNo);
    });
    //--------------------------------------------------【表单提交】
    function optionHtml($obj) {
        var index = $obj[0].selectedIndex;
        return $obj.find('option').eq(index).text();
    }

    $submitAddress.on('click', function () {

        var errorMsg = verifyfrom.start();
        if (errorMsg) {
            alertPop.run(errorMsg);
            return false;
        }
       firmaj(orderNo)

    });
    function firmaj(orderNo){
        if(orderNo){
            //跳转详情页面
            base.ajax({
                url: base.pageUrl.awardsAddress.url,
                type: "post",
                data: {
                    oauthToken: base.userInfo.oauthToken,
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.awardsAddress.service,
                    address: $address.val(),
                    cityStr: optionHtml($city),
                    name: $userName.val(),
                    provinceStr: optionHtml($province),
                    tel: $userPhone.val(),
                    orderNo:orderNo
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    console.log(data);
                    if (base.isApp()) {
                        base.hybridProtocol({
                            tagName: 'openWebPage',
                            data: {
                                url: location.origin + '/orderDetail.html?orderNo='+orderNo,
                                title: ''
                            }
                        });
                    } else {
                        location.replace('orderDetail.html?orderNo='+orderNo);
                    }
                }
            })
        }else{
            base.ajax({
                url: base.pageUrl.updateAddress.url,
                type: "post",
                data: {
                    oauthToken: base.userInfo.oauthToken,
                    appId: base.pageUrl.appId,
                    service: base.pageUrl.updateAddress.service,
                    address: $address.val(),
                    cityStr: optionHtml($city),
                    name: $userName.val(),
                    provinceStr: optionHtml($province),
                    tel: $userPhone.val()
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    var redirectURL = decodeURIComponent(hrefParameter.get('redirectURL'));
                    if (redirectURL) {
                        if (hrefParameter.create(redirectURL).get('confirmPay')) {
                            location.replace(redirectURL);
                        } else {
                            location.replace(redirectURL + '&confirmPay=true');
                        }
                    } else {

                        if (base.isApp()) {
                            base.hybridProtocol({
                                tagName: 'openWebPage',
                                data: {
                                    url: location.origin + '/index.html',
                                    title: ''
                                }
                            });
                        } else {
                            location.replace('index.html');
                        }
                    }
                }
            });
        }
    }
});
