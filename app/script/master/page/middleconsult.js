/**
 * Created by Administrator on 2016/8/29.
 */
define(function (require, exports, module) {
    var Slider = require('module/slider'); // 部分安卓APP内无法捕获click 做了兼容性处理
    var base=require('module/base'),
        hybridProtocol = require('module/native-calls');
    var slide; // slide的实例占位
    require('zepto');
    var pageLoading = $('#pageLoading');
    pageLoading.hide();
    var slideImgList = [{
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl": __uri('../../../image/master/middleconsult/01.jpg')
    }, {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/02.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/03.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/04.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/05.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/06.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/07.jpg')
    },
    {
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/08.jpg')
    },{
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/09.jpg')
    },{
        "fileName": 1,
        "fileTypeName": "",
        "franchiseeId": 1,
        "fullRedirectUrl": "javascript:;",
        "fullShowUrl":  __uri('../../../image/master/middleconsult/10.jpg')
    }],
        imgList = [];
    for (var i = 0; i < slideImgList.length; i++) {
        imgList.push({
            content: slideImgList[i].fullShowUrl,
            href: slideImgList[i].fullRedirectUrl
        });
    }
    var slide = new Slider({
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
    $('a').on('click',function(){
        var _href = $(this).attr('href-data');
        goWebPage(_href)
    });
    // 跳转web页面 app 和 web 兼容
    function goWebPage(url, title){
        if(base.isApp()){
            hybridProtocol({
                tagName: 'openWebPage',
                data: {
                    title: title || '',
                    url: url
                }
            });
        }else{
            window.location.href = url;
        }
    }
});