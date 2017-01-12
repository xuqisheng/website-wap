define(function (require, exports, module) {
    require('mock');
    var pageUrl = require('module/url-map');

// 首页商品详情，红包详情，实物详情
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreGoods/scoreGoodsDetail.html', {
        "resultMsg": "",
        "resultCode": 1,
        "resultData": {
            "nameRemark": "@WORD(1,30)",
            "goodsId": 80038,
            "type|1": [2, 3],
            "goodsRemark": "@paragraph(2)",
            "realPrice|1-100": 52348,
            "name": "@WORD(1,10)",
            "score|1-250": 71844,
            "quantity|1-100": 76562,
            "showRealPrice": 1,
            "picUrls|1-5": ["/image/goods-picture/roomba.png"],
            "isPreSale|1":[0, 1],
            "systemTime": 1451474560000,
            "saleTime": 1451574560000
        }
    });

// 我的订单列表
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/myOrderList.html', {
        "resultCode": 1,
        "resultData": {
            "pages|1-5": 23702,
            "total|1-100": 74271,
            "list|20": [{
                "hasAddress|1": [0, 1],
                "goodId|1-100": 16462,
                "score|1-1000": 56875,
                "validTime": 1451474560000,
                "nameRemark": "@word(1,10)",
                "name": "@title(1,5)",
                "picUrl": "\/image\/goods-picture\/roomba.png",
                "addTime": 1451474560000,
                "type|1": [2, 3],
                "orderNo": "SS1512151606993033"
            }],
            "currentPage": 1
        },
        "resultMsg": ""
    });

// 首页商品列表，红包列表，实物列表
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreGoods/scoreGoodsList.html', {
        "resultCode": 1,
        "resultMsg": "",
        "resultData": {
            "list|20": [{
                "quantity|1-100": 34548,
                "goodsId|1-10": 75680,
                "picUrl|1": ["/image/goods-picture/roomba.png", "/image/goods-picture/roomba.png", "/image/goods-picture/roomba.png"],
                "name|1": ["\u7ea2\u9152\u4e00\u74f6", "ak47", "AWP", "\u7ea2\u5305100\u5143", "111", "11", "ak47\u7ea2\u5305", "AWP", "\u98de\u673a", "\u5766\u514b1111"],
                "type|1-2": 65307,
                "nameRemark|1": ["\u554a\u554a", "1111", "111\u8fdd\u53cd11", "\u963f\u5927\u7684\u98ce\u554a\u6253\u53d1", "111", "", "111", "11", "11", "111"],
                "score|1-100": 35222,
                cornerMark:"你好"
            }], "total": 1, "pages": 1, "currentPage": 1
        },
        "errorCode": "\u6d4b\u8bd5\u5185\u5bb9238b"
    });

// 抽奖
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreDraw/lottery.html', {
        "resultData": {
            "code|1": [1, 2, 3, 4, 5, 6, 7, 8],
            "prize": "50\u79ef\u5206",
            "type|1-3": 22038,
            "score|1-1000": 50164,
            "number": "100"
        }, "resultMsg": "", "resultCode": 1
    });

//基本信息
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreActivity/getScoreLotteryParam.html', {
        "resultData": {
            "code|1": [1, 2, 3, 4, 5, 6, 7, 8],
            "spend|1-100": 23632,
            "prize": "50\u79ef\u5206",
            "type|1-3": 22038,
            "score|1-1000": 50164,
            "number": "100"
        }, "resultMsg": "", "resultCode": 1
    });
// 中奖纪录
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreDraw/drawRecord.html', {
        "resultMsg": "",
        "resultCode": 1,
        "resultData": {
            "total|1-100": 55315,
            "pages|1-5": 77818,
            "list|20": [{
                "addTime|1": [1449815715000, 1449815647000, 1449815642000, 1449815473000, 1449815446000, 1449815376000],
                "type|1": [2, 3, 4],
                "prizeName|1": ["50\u79ef\u5206", "10\u5143\u7ea2\u5305", "100\u79ef\u5206", "10\u5143\u7ea2\u5305", "100\u79ef\u5206", "5\u5143\u7ea2\u5305"]
            }],
            "currentPage": 1
        }
    });
//首页签到信息
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreGoods/home.html', {
        "resultCode": 1,
        "resultMsg": "",
        "resultData": {
            "mallBanner": [{
                "addTime": 1464935757000,
                "color": "",
                "fileName": "情浓端午，粽享六月",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://bbs.qian360.com/posts/list/2580.page",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1464935757623.png",
                "id": 201,
                "intro": "",
                "locationUrl": "https://bbs.qian360.com/posts/list/2580.page",
                "url": "/data/images/banner/1464935757623.png"
            }, {
                "addTime": 1462933395000,
                "color": "",
                "fileName": "呼朋唤友来钱庄 新手注册送108元红包",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://www.qian360.com/activity/monthlyActivity/index.html?returnUrl=m20160408/index",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1462933395767.png",
                "id": 161,
                "intro": "",
                "locationUrl": "https://www.qian360.com/activity/monthlyActivity/index.html?returnUrl=m20160408/index",
                "subType": " ",
                "url": "/data/images/banner/1462933395767.png"
            }, {
                "addTime": 1463456653000,
                "color": "",
                "fileName": "恒丰银行资金存管",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://www.qian360.com/api/user/noticeDetail.html?noticeId=631",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1463453680332.png",
                "id": 191,
                "intro": "",
                "locationUrl": "https://www.qian360.com/api/user/noticeDetail.html?noticeId=631",
                "subType": " ",
                "url": "/data/images/banner/1463453680332.png"
            }, {
                "addTime": 1462443072000,
                "color": "",
                "fileName": "积分抽大奖 嗨到手抽筋",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://mall.qian360.com/luckyDraw.html",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1460699905923.png",
                "id": 167,
                "intro": "",
                "locationUrl": "https://mall.qian360.com/luckyDraw.html",
                "subType": " ",
                "url": "/data/images/banner/1460699905923.png"
            }, {
                "addTime": 1453444189000,
                "color": "",
                "fileName": "安全保障",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://www.qian360.com/api/common/securityDetail.html",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1451524182982.png",
                "id": 21,
                "intro": "",
                "locationUrl": "/api/common/securityDetail.html",
                "subType": " ",
                "url": "/data/images/banner/1451524182982.png"
            }, {
                "addTime": 1452067707000,
                "color": "",
                "fileName": "了解钱庄网",
                "fileTypeName": "手机端banner图",
                "franchiseeId": 1,
                "fullRedirectUrl": "https://www.qian360.com/forward.html?returnUrl=aboutus",
                "fullShowUrl": "https://www.qian360.com/data/images/banner/1452067707409.png",
                "id": 31,
                "intro": "",
                "locationUrl": "/forward.html?returnUrl=aboutus",
                "subType": " ",
                "url": "/data/images/banner/1452067707409.png"
            }],
            "score|1": [100, 500],
            "sign|1": [true, false],
            "hotOrder|20": [{
                "quantity|1-100": 34548,
                "goodsId|1-10": 75680,
                "picUrl|1": ["/image/goods-picture/roomba.png", "/image/goods-picture/roomba.png", "/image/goods-picture/roomba.png"],
                "name|1": ["\u7ea2\u9152\u4e00\u74f6", "ak47", "AWP", "\u7ea2\u5305100\u5143", "111", "11", "ak47\u7ea2\u5305", "AWP", "\u98de\u673a", "\u5766\u514b1111"],
                "type|1-2": 65307,
                "nameRemark|1": ["\u554a\u554a", "1111", "111\u8fdd\u53cd11", "\u963f\u5927\u7684\u98ce\u554a\u6253\u53d1", "111", "", "111", "11", "11", "111"],
                "score|1-100": 35222,
                'cornerMark':'我是'
            }],
            "total": 1,
            "pages": 1,
            "currentPage": 1
        },
        "errorCode": "\u6d4b\u8bd5\u5185\u5bb9238b"
    });
//签到页面信息
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreRecord/checkInH5.html', {
        "resultData": {
            "redPacketUsage": 0.02,
            "score|1": [100, 500],
            "signCount|1": [1, 2, 3, 4, 5, 6, 7],
            "signHistory": [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            "signInMark|1": [0, 1]
        }
    });
// 规则说明
    Mock.mock('http://wap.qian360.com:8080/scoreStore/ruleExplain/getParams.html', {"resultData": {"redPacketUsage": 0.02}});
//填写个人地址
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/awardsAddress.html', {"resultData": {"redPacketUsage": 0.02}});
// 个人积分记录列表
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreRecord/scoreRecordList.html', {
        "resultCode": 1,
        "resultMsg": "",
        "resultData": {
            "currentPage": 1,
            "total|1-100": 11802,
            "pages|1-5": 50723,
            "list|20": [{
                "inOut|1-2": 40870,
                "addTime": 1449563963000,
                "remark": "@TITLE(1,5)",
                "typeName|1": ["\u6ce8\u518c", "\u5e73\u53f0\u8d60\u9001", "\u5e73\u53f0\u8d60\u9001", "\u6295\u8d44"],
                "number|1-100": 36152
            }]
        }
    });

// 地址修改
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/updateAddress.html', {
        "resultCode": 1,
        "resultMsg": "",
        "resultData": {
            "tel": "18767154144",
            "province": "@province()",
            "city": "@city()",
            "name": "@cname()",
            "id|1-100": 35522,
            "userId|1-100": 26677,
            "address": "@WORD(1,10)",
            "updateTime": 1449750240000
        }
    });

// 地址判断
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/checkAddress.html', {
        "resultCode": 1,
        "resultMsg": "",
        "resultData": {
            "updateTime": 1449728835000,
            "userId|1-100": 23632,
            "id|1-10": 28015,
            "address": "@WORD(1,10)",
            "province": "@province()",
            "tel": "18767154144",
            "city": "@city()",
            "name": "@cname()"
        }
    });

// 订单详情 和  下单结果查询
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/myOrderDetail.html', {
        "resultMsg": "",
        "resultCode": 1,
        "resultData": {
            "validTime": 1450149335000,
            "expressInfo": "@WORD(1,10)",
            "realPay|1-100": 32048,
            "cdkey": "@WORD(20,30)",
            "type|1-4": 4,
            "score|1-10": 66808,
            "orderId|1-10": 42752,
            "orderNo": "SS1512151606993033",
            "address": "@WORD(1,10)",
            "receiverName": "@cname",
            "goodsId|1-10": 43007,
            "addTime": 1450149335000,
            "picUrl": "\/image\/goods-picture\/roomba.png",
            "receiverPhone": "18767154144",
            "nameRemark": "@WORD(1,10)",
            "name": "@TITLE(1,5)",
            "status": 1
        }
    });

// 下单
    Mock.mock('http://wap.qian360.com:8080/scoreStore/scoreOrder/addScoreOrder.html', {
        "resultData": {"orderNo": "SS1512151606993033"},
        "resultMsg": "",
        "resultCode": 1
    });

//--------------------------------------------------【收货地址填写】

//收货地址 
    Mock.mock(pageUrl.checkAddress.url, {
        "resultCode|1": 1,
        "resultData": {
            "name|0-1": '王英俊',
            "tel": '18857874159',
            "province": '浙江省',
            "city": '杭州',
            "address": '华星路96号互联网科技大厦9层 钱庄网'
        },
        "errorCode": "TOKEN_EXPIRED",
        "resultMsg": "返回信息"
    });

// 省份数据 
    Mock.mock(pageUrl.getProvinceList.url, {
        "resultCode": 1,
        "resultData": [{"id": 561, "name": "辽宁省", "nid": "liaoningsheng", "order": 10, "pid": 0}, {
            "id": 690,
            "name": "吉林省",
            "nid": "jilinsheng",
            "order": 10,
            "pid": 0
        }, {"id": 768, "name": "黑龙江省", "nid": "heilongjiangsheng", "order": 10, "pid": 0}, {
            "id": 924,
            "name": "江苏省",
            "nid": "jiangsusheng",
            "order": 10,
            "pid": 0
        }, {"id": 1057, "name": "浙江省", "nid": "zhejiangsheng", "order": 11, "pid": 0}],
        "resultMsg": "服务器返回信息"
    });

// 省份对应城市数据 
    Mock.mock(pageUrl.showArea.url, [{"id": 925, "name": "杭州", "nid": "nanjing", "order": 10, "pid": 924}, {
        "id": 940,
        "name": "无锡",
        "nid": "wuxi",
        "order": 10,
        "pid": 924
    }]);

//---------------------------------------------【用户】

    Mock.mock(pageUrl.getUserInfoStatus.url, {
        "resultCode": 1,
        "resultData": {
            "bankCardStatus": 1,
            "cardID": "3326**********0018",
            "newHandStatus": 0,
            "payPwdStatus": 1,
            "phone": "18767154147",
            "realName": "*豪",
            "realNameStatus": 1,
            "userScore|1-1000": 5000
        },
        "errorCode": "TOKEN_EXPIRED",
        "resultMsg": "返回信息"
    });
    //竞猜活动
    Mock.mock(new RegExp('^'+pageUrl.topicid.url+'[\\/\\d]+$'),{
        data:{
            'itemList':[
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920005000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessState':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920010000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessState':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920005000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessState':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920010000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessState':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920005000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessState':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920010000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessStateStr':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920005000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessStateStr':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920010000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessStateStr':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920005000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessStateStr':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                },
                {
                    "answerDuring":"05-17 10:00~05-17 20:00",       //答题时间区段
                    'answerStartTime':1465920010000,                            //活动开始时间
                    'answerStopTime':147054043847612222,                            //活动结束时间
                    'guessStateStr':true,                          //竞猜题目状态(0未公布1已公布)
                    'itemContent':'fdsaf',                          //题目内容
                    'rewardList':[
                        {
                            'id':1,
                            'optionContent':'对',                    //选项内容
                            'rewardScore':11,                        //每注奖励积分
                            'voteScale':'10%'                        //	投票比例
                        },
                        {
                            'id':2,
                            'optionContent':'对',                //选项内容
                            'rewardScore':11,                    //每注奖励积分
                            'voteScale':'10%'                    //	投票比例
                        }
                    ],
                    'scoreMaxStake':100,                             //最高积分
                    'scorePerStake':10,                              //每注积分
                    'userAnswerState':true,                          //用户是否作答过
                    'answerRewardId':'2',                              //用户作答的id
                    'resultRewardId':'1'                               //公布答案的id

                }
            ],
            code:'success',
            total:100,
            bgColor:'#a091d6',
            bgImg:'image/banner/guess-default.jpg',
            jcTopic:'竞猜主题',
            needTip:1,
            scoreLeft:1000,
            serverTime:'1465920000000',
            shareDescribe:'你是傻逼',
            shareIcon:'http://img.baidu.com/img/iknow/erciyuan270170.PNG?t=1470194591',
            shareTitle:'分享文案'
        }

    });
    Mock.mock(new RegExp('^'+pageUrl.history.url+'[\\/\\d]*$'),{
        code:'success',
        data:{
            list:[
                {
                    answerContent:'用户答案内容',
                    answerState:'1',
                    answerTime:'用户作答时间',
                    itemContent:'题目内容',
                    resultContent:'	答案（公布的）',
                    rewardScore:'奖励积分',
                    stakeScore:'抵押积分'
                }

            ],
            total:15                                   //总记录数
        },
        msg:'success'
    });
    Mock.mock(pageUrl.jcItemConfId.url,{
        code:'success',
        currentPage:1,                                  //当前页
        data:{

        }});
    Mock.mock(new RegExp('^'+pageUrl.lastpublish.url+'[\\/\\d]*$'), {
        'code':'执行结果编码',
        data:{
            list:[
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },{
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },{
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },{
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },{
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                },
                {
                    answerDuring:'答题时间区段',
                    guessState:'竞猜题目状态(0未公布1已公布)',
                    itemContent:'题目内容',
                    'resultRewardId':'2',
                    rewardList:[
                        {
                            id:'1',
                            optionContent:'	选项内容'
                        },
                        {
                            id:'2',
                            optionContent:'	选项内容'
                        }
                    ]
                }

            ],
            total:11
        },
        msg:'提示信息'
    });
    //一元夺宝首页
    Mock.mock(new RegExp(pageUrl.grab.url+'.*'),{
        data:{
            'goodsList':[
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'50',
                    'grabStartTime':1465920010000,
                    'grabStopTime':6,
                    'id':'1',
                    'leftNeed':200,
                    'totalNeed':200,
                    'grabState':1,
                    'isPublish':0
                },
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'20',
                    'grabStartTime':1465900000000,
                    'grabStopTime':1465960000000,
                    'id':'10',
                    'leftNeed':200,
                    'totalNeed':500,
                    'grabState':1,
                    'isPublish':0
                },
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'20',
                    'grabStartTime':1465910000000,
                    'grabStopTime':1465930000000,
                    'id':'3',
                    'leftNeed':500,
                    'totalNeed':500,
                    'grabState':1,
                    'isPublish':0
                },
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'20',
                    'grabStartTime':1465910000000,
                    'grabStopTime':1465915000000,
                    'id':'4',
                    'leftNeed':300,
                    'totalNeed':500,
                    'grabState':1,
                    'isPublish':0
                },
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'20',
                    'grabStartTime':1465910000000,
                    'grabStopTime':1465915000000,
                    'id':'5',
                    'leftNeed':500,
                    'totalNeed':500,
                    'grabState':1,
                    'isPublish':1
                },
                {
                    'goodsName':'商品名称',
                    'goodsImgUrl':'image/grab/shop.jpg',
                    'grabPrice':'20',
                    'grabStartTime':1465910000000,
                    'grabStopTime':1465915000000,
                    'id':'6',
                    'leftNeed':200,
                    'totalNeed':500,
                    'grabState':1,
                    'isPublish':0
                }
            ],
            needTip:true,
            code:'success',
            total:5,
            bgColor:'f8d851',
            bgImg:'image/grab/banner.jpg',
            userScoreLeft:1000,
            serverTime:1465920000000,
            shareDescribe:'你是傻逼',
            shareIcon:'http://img.baidu.com/img/iknow/erciyuan270170.PNG?t=1470194591',
            shareTitle:'分享文案'

        }
    });
    //我的夺宝记录
    Mock.mock(new RegExp(pageUrl.record.url+'.*'),{
        code:'',
        data:{
            'list':[
                {
                    'goodsName':'商品名称',
                    'luckyNumber':12312312,
                    'myGrabState':1,
                    'publishTime':12312312,
                    'grabState':0,
                    'detailList':[
                        {
                            'grabNumber':'10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081',
                            'joinTime':4646161,
                            'stakeNumber':121,
                            'stakeScore':32423,
                            'joinId':1
                        } ,
                        {
                            'grabNumber':'10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081',
                            'joinTime':4646161,
                            'stakeNumber':12,
                            'stakeScore':32423,
                            'joinId':1
                        }
                    ]
                },
                {
                    'goodsName':'商品名称',
                    'luckyNumber':12312312,
                    'myGrabState':1,
                    'publishTime':12312312,
                    'grabState':0,
                    'detailList':[
                        {
                            'grabNumber':'夺宝号码',
                            'joinTime':4646161,
                            'stakeNumber':121,
                            'stakeScore':32423,
                            'joinId':1
                        } ,
                        {
                            'grabNumber':'夺宝号码1',
                            'joinTime':4646161,
                            'stakeNumber':12,
                            'stakeScore':32423,
                            'joinId':1
                        }
                    ]
                },
                {
                    'goodsName':'商品名称',
                    'grabNumber':'夺宝号码',
                    'joinTime':'参与时间',
                    'luckyNumber':'中奖号码',
                    'publishTime':'揭晓时间',
                    'stakeNumber':'参与分数',
                    'stakeScore':'实际所付钱币',
                    'myGrabState':-1
                },
                {
                    'goodsName':'商品名称',
                    'grabNumber':'10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081',
                    'grabState':0,
                    'joinTime':4646161,
                    'luckyNumber':12312312,
                    'publishTime':12312312,
                    'stakeNumber':12,
                    'stakeScore':32423,
                    'myGrabState':1
                },
                {
                    'goodsName':'商品名称',
                    'grabNumber':'10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081，10007081',
                    'grabState':0,
                    'joinTime':4646161,
                    'luckyNumber':12312312,
                    'publishTime':12312312,
                    'stakeNumber':12,
                    'stakeScore':32423,
                    'myGrabState':1
                },
                {
                    'goodsName':'商品名称',
                    'grabNumber':'夺宝号码',
                    'grabState':0,
                    'joinTime':4646161,
                    'luckyNumber':12312312,
                    'publishTime':12312312,
                    'stakeNumber':12,
                    'stakeScore':32423,
                    'myGrabState':2
                },
                {
                    'goodsName':'商品名称',
                    'grabNumber':'夺宝号码',
                    'grabState':0,
                    'joinTime':4646161,
                    'luckyNumber':12312312,
                    'publishTime':12312312,
                    'stakeNumber':12,
                    'stakeScore':32423,
                    'myGrabState':3
                }

            ],
            'total':10
        }
    });
    //最新揭晓
    Mock.mock(new RegExp(pageUrl.publish.url+'.*'),{
        data: {
            'publishList':[
                {
                    'goodsName': '商品名称',
                    'goodsImgUrl': 'image/grab/shop.png',
                    'grabPrice': '50',
                    'id': '1',
                    'leftNeed': 200,
                    'totalNeed': 200,
                    'grabState': 0,
                    'isPublish': 0
                },
                {
                    'goodsName': '商品名称',
                    'goodsImgUrl': 'image/grab/shop.png',
                    'grabPrice': '50',
                    'id': '1',
                    'leftNeed': 500,
                    'totalNeed': 500,
                    'grabState': 1,
                    'isPublish': 1
                }
            ]
        }
    });
    //查询某商品详情
    Mock.mock(new RegExp('^'+pageUrl.grabGoodsId.url+'[\\/\\d]*$'),{
            'code':'',
            data:{
                'costPrice':'500',
                'goodsContent':'商品说明',
                'goodsName':'商品名称',
                'goodsUrlArray':[
                        {
                            "fullRedirectUrl":"javascript:;",
                            "fullShowUrl":"https://www.qian360.com/data/images/banner/1468484227854.png",
                            "url":"/data/images/banner/1468484227854.png"
                        },
                        {
                            "fullRedirectUrl":"javascript:;",
                            "fullShowUrl":"https://www.qian360.com/data/images/banner/1468484227854.png",
                            "url":"/data/images/banner/1468484227854.png"
                        },
                        {
                            "fullRedirectUrl":"javascript:;",
                            "fullShowUrl":"https://www.qian360.com/data/images/banner/mallBanner/1468485462665.png",
                            "url":"/data/images/banner/mallBanner/1468485462665.png"
                        }

                ],
                'grabPrice':'50',
                'id':'2',
                'leftNeed':200,
                'totalNeed':500,
                'grabStartTime':1465950000000,
                'serverTime':1465960000000,
                'grabState':1,
                'isPublish':0,
                'userScoreLeft':100,
                'balance':1.69,
                'discount':8,
                'luckyUserInfo':{
                    'grabUserShareId':'晒单分享id',
                    'luckyNumber':'中奖号码',
                    'phoneStr':'获奖用户电话号码（加*）',
                    'realNameStr':'	获奖用户姓名（加*）',
                    'stakeNumber':'购买份数'
                }
            }
    });
    //提交订单
    Mock.mock(new RegExp(pageUrl.pay.url+'.*'),{
                code:'',
                'msg':'被人抢先一步,份额不足了'
    });
    //查询支付详情
    Mock.mock(new RegExp(pageUrl.paydetail.url+'.*'),{
        code:'',
        data:{
            'grabNumberArray':'10007081,10007081,10007081,10007081,10007081,10007081,10007081,10007081,10007081,10007081',
            stakeNumber:12312312,
            realPayScore:50
        }
    });
    //所有参与记录
    Mock.mock(new RegExp('^'+pageUrl.join.url+'[\\/\\d]*$'),{
        code:'',
        data:{
            'list':[
                {
                    'grabState':1,
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'	本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'1',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },
                {
                    'grabState':'是否中奖',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                },{
                    'grabState':'是否中奖111',
                    'joinTime':'参与时间',
                    'phoneStr':'用户电话号码（加*）11',
                    'realNameStr':'用户姓名（加*）',
                    'stakeNumber':'本次购买份数'
                }
             ],
            'total':11
        }
    });
    //大乐透期号
    Mock.mock(new RegExp('^'+pageUrl.calc.url+'[\\/\\d]*$'),{
            code:'',
            data:{
                'fiveNumber':'排列五开奖号码',
                fivePeriod:'排列五第几期',
                lottoNumber:'大乐透开奖号码',
                lottoPeriod:'大乐透第几期',
                luckyNumber:'中奖号码'
            }
    });
    //晒单获奖者
    Mock.mock(new RegExp('^'+pageUrl.sharestate.url+'[\\/\\d]*$'),{
        'luckyState':1,
        'shareState':0
    });
    //晒单分享详情
    Mock.mock(new RegExp('^'+pageUrl.share.url+'[\\/\\d]*$'),{
        'phoneStr':'用户电话号码（加*）',
        'realNameStr':'用户姓名（加*）',
        'shareImgUrlArray':'image/grab/xxx.jpg,image/grab/xxx.jpg,image/grab/xxx.jpg',
        'shareTime':'晒单时间',
        'testimonials':'获奖感言',
        'msg':'xxxx'
    });
    //提交晒单图片
    Mock.mock(new RegExp('^'+pageUrl.uploadImg.url+'[\\/\\d]*$'),{
        'code':'',
        'msg':true,
         data:{
            imgName:'12'
        }
    });
    //提交晒单
    Mock.mock(new RegExp('^'+pageUrl.upshares.url+'[\\/\\d]*$'),{
        'code':'',
        'msg':true
    });
    //查询夺宝详情1
    Mock.mock(new RegExp('^'+pageUrl.topay.url+'[\\/\\d]*$'),{
        'code':'',
        data:{
            'costPrice':'300',       //原价
            'grabPrice':'200',       //夺宝价
            'id':1,                  //商品id
            'leftNeed':20,           //剩余份数
            'scorePayDiscount':9,    //折扣
            'userBalanceLeft':'5.69', //用户账户余额
            'userScoreLeft':'1234'   //用户积分余额
        },
        'msg':true
    });
    Mock.mock(new RegExp('^'+pageUrl.sharelist.url+'[\\/\\d]*$'),{
        'code':'',
        data:{
            'list':[
                {
                    phoneStr:'123456789',    //电话号码
                    realNameStr:'用户姓名',  //用户姓名
                    shareImgUrlArray:[
                        "https://file.qian360.com/activity/grab/1481787803606.jpg@640w_1o.jpg","https://file.qian360.com/activity/grab/1481787803606.jpg@640w_1o.jpg",'https://file.qian360.com/activity/grab/1481787803606.jpg@640w_1o.jpg'
                    ],
                    shareTime:'晒单时间',   //晒单时间
                    testimonials:'获奖感言' //获奖感言
                },
                {
                    phoneStr:'123456789',    //电话号码
                    realNameStr:'用户姓名1',  //用户姓名
                    shareImgUrlArray:[
                        "https://www.qian360.com/data/images/banner/1468484227854.png","https://www.qian360.com/data/images/banner/1468484227854.png"
                    ],
                    shareTime:'晒单时间1',   //晒单时间
                    testimonials:'获奖感言1' //获奖感言
                }
            ]
        },
        'msg':true
    });
    Mock.mock(new RegExp('^'+pageUrl.grabnumber.url+'[\\/\\d]*$'),{
        code:'',
        data:{
            allGrabNumber:'10000326,10000611,10000346,10000809,10000610,10000696,10000689,10000624'
        },
        msg:''
    });
//---------------------------------------------【测试结果】

// 返回true的接口 
    pageUrl.resultTrue = 'resultTrue.html';
    Mock.mock(pageUrl.resultTrue, true);

// 返回false的接口 
    pageUrl.resultFalse = 'resultTrue.html';
    Mock.mock(pageUrl.resultFalse, false);

// 暴露api接口 
    return pageUrl;
});