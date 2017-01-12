/**
 * Created by Administrator on 2016/12/16.
 */
define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        hrefParameter = require('qianModule/href-parameter');
    var Id = hrefParameter.get('id'),
        loadList = require('module/loadList');
    new Vue({
        el: 'body',
        data: {
            pageLoading: true,                                                       //加载loading
            arrs:[

            ],
            grabsinglepoker:false,
            Imgs:'',
            isShow:false
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            this.loader()
        },
        methods: {
            loader:function(){
                var _this = this;
                new loadList({
                    wrap:  $('#grabsingle .viewport')[0],
                    ajax: {
                        url: base.pageUrl.sharelist.url,
                        type: 'get',
                        data: {
                            oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                            service: base.pageUrl.sharelist.service,
                            id: Id
                        },
                        success: function (data, next) {
                            if(data.data.list =='' || data.data.list.length == 0){
                                _this.isShow = true;
                            }
                            var dataAdd = {};
                            var dataImg = [];
                            for(var i=0;i<data.data.list.length;i++){
                                dataAdd = {};
                                dataImg = [];
                                dataAdd.phoneStr = data.data.list[i].phoneStr;
                                dataAdd.realNameStr = data.data.list[i].realNameStr;
                                dataAdd.shareTime = data.data.list[i].shareTime;
                                dataAdd.testimonials = data.data.list[i].testimonials;
                                var Imglength = data.data.list[i].shareImgUrlArray.length;
                                for(var j =0;j<Imglength;j++){
                                    dataImg.push(data.data.list[i].shareImgUrlArray[j]+'@640w_1o.jpg')
                                }
                                dataAdd.img =dataImg;
                                _this.arrs.push(dataAdd)
                            }
                            setTimeout(next, 500);
                        }
                    }
                });
            },
            Imgblow:function(n){
                var _this = this;
                _this.grabsinglepoker = true;
                _this.Imgs = n;
            },
            pokers:function(){
                var _this = this;
                _this.grabsinglepoker = false;
            }
        }
    })
});