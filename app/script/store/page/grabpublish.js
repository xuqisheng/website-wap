define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id');
    var loadList = require('module/loadList');
    new Vue({
        el: 'body',
        data: {
            pageLoading: true,                                                       //加载loading
            money: 0,                                                                //用户金额
            isLogin: !base.isLogin(),
            lists: [],
            showData: true,
            more: true,
            istrue: true,
            isShow:true,
            backgroundColor: {
                backgroundColor: '#f6f6f6'
            }
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            this.loader()
        },
        methods: {
            loader: function () {
                var _this = this;
                //base.ajax({
                //    url: base.pageUrl.publish.url+'/'+Id+'/',
                //    type: "get",
                //    data: {
                //        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                //        appId: base.pageUrl.appId,
                //        service: base.pageUrl.publish.service
                //    },
                //    xhrFields: {
                //        withCredentials: true
                //    },
                //    dataType: "json",
                //    success: function (data) {
                //        console.log(data)
                //        var goodsList = data.data.publishList.length;
                //        var dataAdd = {};
                //        for(var i=0;i<goodsList;i++){
                //            dataAdd = {};
                //            dataAdd.goodsName = data.data.publishList[i].goodsName;          //商品名称
                //            dataAdd.goods_url = data.data.publishList[i].goodsImgUrl;          //商品图片
                //            dataAdd.grabPrice = data.data.publishList[i].grabPrice;          //夺宝价格
                //            dataAdd.id = data.data.publishList[i].id;                        //夺宝主键id
                //            dataAdd.leftNeed = data.data.publishList[i].leftNeed;            //剩余份数
                //            dataAdd.totalNeed= data.data.publishList[i].totalNeed;            //总需份数
                //            dataAdd.grabState = data.data.publishList[i].grabState;           //夺宝是否成功
                //            dataAdd.isPublish = data.data.publishList[i].isPublish;           //获奖者是否揭晓
                //            dataAdd.apply = dataAdd.totalNeed-dataAdd.leftNeed > 0 ? dataAdd.totalNeed-dataAdd.leftNeed :dataAdd.totalNeed;
                //            var grab = dataAdd.totalNeed-dataAdd.leftNeed > 0 ? 1:2;                //是否抢夺完成(1未完成，2完成)
                //            if( grab == 1  || !dataAdd.grabState && !dataAdd.isPublish){
                //                dataAdd.headline =  '夺宝失败';
                //            }
                //            if( grab == 2  && dataAdd.grabState && dataAdd.isPublish){
                //                dataAdd.headline =  '夺宝完成，获奖者揭晓';
                //            }
                //            _this.lists.push(dataAdd);
                //        }
                //    }
                //})
                new loadList({
                    wrap: $('#grabpublish .viewport')[0],
                    ajax: {
                        url: base.pageUrl.publish.url,
                        type: 'get',
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            appId: base.pageUrl.appId,
                            service: base.pageUrl.publish.service,
                            id: Id
                        },
                        success: function (data, next) {
                            var goodsList = data.data.list.length;
                            if(goodsList > 0){
                                _this.isShow = false;
                            }else{
                                _this.backgroundColor.backgroundColor = '#f6f6f6'
                            }
                            var dataAdd = {};
                            for(var i=0;i<goodsList;i++){
                                dataAdd = {};
                                dataAdd.goodsName = data.data.list[i].goodsName;          //商品名称
                                dataAdd.goods_url = data.data.list[i].goodsImgUrl;          //商品图片
                                dataAdd.grabPrice = data.data.list[i].grabPrice;          //夺宝价格
                                dataAdd.id = data.data.list[i].id;                        //夺宝主键id
                                dataAdd.leftNeed = data.data.list[i].leftNeed;            //剩余份数
                                dataAdd.totalNeed= data.data.list[i].totalNeed;            //总需份数
                                dataAdd.isPublish = data.data.list[i].isPublish;           //获奖者是否揭晓
                                dataAdd.apply = dataAdd.totalNeed-dataAdd.leftNeed > 0 ? dataAdd.totalNeed-dataAdd.leftNeed :0;
                                if(dataAdd.isPublish == 2){
                                    dataAdd.headline =  '夺宝失败';
                                }
                                if(dataAdd.isPublish == 1){
                                    dataAdd.headline =  '夺宝完成，获奖者揭晓';
                                }
                                _this.lists.push(dataAdd);
                            }
                            setTimeout(next, 500)
                        }
                    }
                })
            },
            shoppublish:function(i){
                var id = this.lists[i].id;
                if(base.isApp()){
                    base.hybridProtocol({
                        tagName: 'openWebPage',
                        data: {
                            title:'',
                            url:location.href.split('/grabpublish')[0]+'/grabparticulars.html?types='+id+'&'+'id='+Id
                        }
                    });
                } else{
                    location.href = 'grabparticulars.html?types='+id+'&'+'id='+Id;
                }
            }
        }
    })
});