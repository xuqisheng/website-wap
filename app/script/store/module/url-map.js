/**
 * 钱庄网
 * @name 基础js
 * @description url映射表
 * @date 2016-01-13
 */
define(function (require, exports, module) {
    var jchdUrl = 'http://local.qian360.com:8052';
    var apiUrl = 'http://wap.qian360.com:8080';

    return {
        //--------------------------------------------------【首页】

        //商品列表
        scoreGoodsList:{
            url: apiUrl + '/scoreStore/scoreGoods/scoreGoodsList.html',
            service: 'scoreGoodsList'
        },

        //商品详情
        scoreGoodsDetail:{
            url: apiUrl + '/scoreStore/scoreGoods/scoreGoodsDetail.html',
            service: 'scoreGoodsDetail'
        },

        //规则说明
        getParams:{
            url: apiUrl + '/scoreStore/ruleExplain/getParams.html',
            service: 'getParams'
        },

        //--------------------------------------------------【积分记录】

        //记录列表
        scoreRecordList:{
            url: apiUrl + '/scoreStore/scoreRecord/scoreRecordList.html',
            service: 'scoreRecordList'
        },

        //--------------------------------------------------【订单相关】

        //下单
        addScoreOrder:{
            url: apiUrl + '/scoreStore/scoreOrder/addScoreOrder.html',
            service: 'addScoreOrder'
        },

        //下单结果查询
        myOrderResult:{
            url: apiUrl + '/scoreStore/scoreOrder/myOrderResult.html',
            service: 'myOrderResult'
        },
        //订单详情
        myOrderDetail:{
            url: apiUrl + '/scoreStore/scoreOrder/myOrderDetail.html',
            service: 'myOrderDetail'
        },
        //地址判断
        checkAddress:{
            url: apiUrl + '/scoreStore/scoreOrder/checkAddress.html',
            service: 'checkAddress'
        },

        //地址修改
        updateAddress:{
            url: apiUrl + '/scoreStore/scoreOrder/updateAddress.html',
            service: 'updateAddress'
        },

        //我的订单列表
        myOrderList:{
            url: apiUrl + '/scoreStore/scoreOrder/myOrderList.html',
            service: 'myOrderList'
        },

        //获取省份列表
        getProvinceList:{
            url: apiUrl + '/activity/monthlyActivity/getProvinceList.html',
            service: '' // 此接口不需要service
        },

        //获取城市列表
        showArea:{
            url: apiUrl + '/area/showArea.html',
            service: '' // 此接口不需要service
        },
        //--------------------------------------------------【抽奖】

        ////抽奖
        lottery:{
            url: apiUrl + '/scoreStore/scoreDraw/lottery.html',
            service: 'lottery'
        },
        //抽奖基本信息
        getScoreLotteryParam:{
        url: apiUrl + '/scoreStore/scoreActivity/getScoreLotteryParam.html',
            service: 'getScoreLotteryParam'
        },
        lotterynew:{
            url: apiUrl + '/scoreStore/scoreActivity/lottery.html',
            service: 'lottery'
        },
        //中奖纪录
        drawRecord:{
            url: apiUrl + '/scoreStore/scoreDraw/drawRecord.html',
            service: 'drawRecord'
        },
        //首页签到
        home:{
            url:apiUrl + '/scoreStore/scoreGoods/home.html',
            service:'home'
        },
        awardsAddress:{
            url:apiUrl + '/scoreStore/scoreOrder/awardsAddress.html',
            service:'awardsAddress'
        },
        //签到页面
        checkInH5:{
            url:apiUrl + '/scoreStore/scoreRecord/checkInH5.html',
            service:'checkInH5'
        },
        //--------------------------------------------------【用户】

        // 用户状态
        getUserInfoStatus: {
            url: apiUrl + '/wap/user/getUserInfoStatus.html',
            service: 'getUserInfoStatus'
        },
        //天天竞猜
        topicid:{
            url: jchdUrl + '/activity/guess/h5',
            service: 'topicid'
        },
        history:{
            url: jchdUrl + '/activity/guess/h5/history',
            service: 'history'
        },
        jcItemConfId:{
            url: jchdUrl + '/activity/guess/h5',
            service: 'jcItemConfId'
        },
        lastpublish:{
            url: jchdUrl + '/activity/guess/h5/lastpublish',
            service: 'lastpublish'
        },

        //--------------------------------------------------【一元夺宝】
        grab:{
            url: jchdUrl + '/activity/grab/h5/index',
            service: 'grab'
        },
        record:{
            url: jchdUrl + '/activity/grab/h5/record',
            service: 'record'
        },
        publish:{
            url: jchdUrl + '/activity/grab/h5/publish',
            service: 'publish'
        },
        grabGoodsId:{
            url: jchdUrl + '/activity/grab/h5/goods',
            service: 'grabGoodsId'
        },
        pay:{
            url: jchdUrl + '/activity/grab/h5/pay',
            service: 'pay'
        },
        paydetail:{
            url: jchdUrl + '/activity/grab/h5/paydetail',
            service: 'paydetail'
        },
        join:{
            url: jchdUrl + '/activity/grab/h5/goods/join',
            service: 'join'
        },
        calc:{
            url: jchdUrl + '/activity/grab/h5/goods/calc',
            service: 'calc'
        },
        sharestate:{
            url: jchdUrl + '/activity/grab/h5/sharestate',
            service: 'sharestate'
        },
        share:{
            url: jchdUrl + '/activity/grab/h5/share',
            service: 'share'
        },
        uploadImg:{
            url: jchdUrl + '/activity/grab/h5/share/uploadImg',
            service: 'uploadImg'
        },
        upshares:{
            url: jchdUrl + '/activity/grab/h5/share',
            service: 'upshares'
        },
        topay:{
            url: jchdUrl + '/activity/grab/h5/goods/topay',
            service: 'topay'
        },
        sharelist:{
            url: jchdUrl + '/activity/grab/h5/sharelist',
            service: 'sharelist'
        },
        grabnumber:{
            url: jchdUrl + '/activity/grab/h5/grabnumber',
            service: 'grabnumber'
        },
        //--------------------------------------------------【api密钥】
        appId: '20150720145313251618'
    }
});