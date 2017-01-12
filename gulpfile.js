//--------------------------------------------------------------------【引入依赖】
var gulp = require('gulp'),                         //引入gulp
    rapMock = require('rap-mock');

//--------------------------------------------------------------------【任务配置】
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});

gulp.task('store-mock', function () {
    rapMock({
        rapDomain: 'http://10.0.0.3:7777',
        apiDomain: 'http://wap.qian360.com:8080',
        projectId: 1,
        createPath: './app/script/store/module/ajax-map.js',
        isAnnotation: true,
        isLog: false,
        ignore: {
            moduleList: ['活动相关', '公共接口', '交易接口', '首页接口'],
            pageList: [],
            interfaceList: ['公用参数']
        },
        writeBefore: "define(function (require, exports, module) {\nrequire('mock');\nvar pageUrl = require('module/url-map');\n\n",
        writeAfter: '//--------------------------------------------------【收货地址填写】\n\n//收货地址 \nMock.mock(pageUrl.checkAddress.url, {"resultCode|1": 1, "resultData": {"name|0-1": \'王英俊\', "tel": \'18857874159\', "province": \'浙江省\', "city": \'杭州\', "address": \'华星路96号互联网科技大厦9层 钱庄网\'}, "errorCode": "TOKEN_EXPIRED", "resultMsg": "返回信息"}); \n\n// 省份数据 \nMock.mock(pageUrl.getProvinceList.url, {"resultCode": 1, "resultData": [{"id": 561, "name": "辽宁省", "nid": "liaoningsheng", "order": 10, "pid": 0 }, {"id": 690, "name": "吉林省", "nid": "jilinsheng", "order": 10, "pid": 0 }, {"id": 768, "name": "黑龙江省", "nid": "heilongjiangsheng", "order": 10, "pid": 0 }, {"id": 924, "name": "江苏省", "nid": "jiangsusheng", "order": 10, "pid": 0 }, {"id": 1057, "name": "浙江省", "nid": "zhejiangsheng", "order": 11, "pid": 0 } ], "resultMsg": "服务器返回信息"}); \n\n// 省份对应城市数据 \nMock.mock(pageUrl.showArea.url, [{"id": 925, "name": "杭州", "nid": "nanjing", "order": 10, "pid": 924 }, {"id": 940, "name": "无锡", "nid": "wuxi", "order": 10, "pid": 924 } ]); \n\n//---------------------------------------------【用户】\n\nMock.mock(pageUrl.getUserInfoStatus.url, {"resultCode": 1, "resultData": {"bankCardStatus": 1, "cardID": "3326**********0018", "newHandStatus": 0, "payPwdStatus": 1, "phone": "18767154147", "realName": "*豪", "realNameStatus": 1, "userScore|1-1000": 5000 }, "errorCode": "TOKEN_EXPIRED", "resultMsg": "返回信息"});\n\n//---------------------------------------------【测试结果】 \n\n// 返回true的接口 \npageUrl.resultTrue = \'resultTrue.html\'; \nMock.mock(pageUrl.resultTrue, true); \n\n// 返回false的接口 \npageUrl.resultFalse = \'resultTrue.html\'; \nMock.mock(pageUrl.resultFalse, false); \n\n// 暴露api接口 \nreturn pageUrl; });'
    });
});



