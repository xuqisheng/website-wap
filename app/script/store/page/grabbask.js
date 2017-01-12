define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base'),
        Pop = require('qianModule/dialog'),
        hrefParameter = require('qianModule/href-parameter');
    var popWait = new Pop('alert');
    var popWait1 = new Pop('wait');
    var Id = hrefParameter.get('id');
    var types = hrefParameter.get('types');
    var fileUpload =  require('module/fileUpload');
    var img =  __uri('../../../image/store/grab/shut.png');
    var ajaxNmum = 0;
    new Vue({
        el: 'body',
        data: {
            pageLoading: true,
            isShow:false,
            luckyState:'',
            shareState:'',
            isbask:false,
            share:{
                phoneStr:'',
                realNameStr:'',
                shareImgUrlArray:[


                ],
                shareTime:'',
                testimonials:''
            },
            Imgs:[
                {
                    img:''
                },
                {
                    img:''
                },
                {
                    img:''
                }
            ],
            upImgs:[
                {
                    'img':'',
                    'isShow':false,
                    'loadname':true,
                    closeImg:false,
                    plan:'0%',
                    rate:'图片上传中~'
                },
                {
                    'img':'',
                    'isShow':false,
                    'loadname':true,
                    closeImg:false,
                    plan:'0%',
                    rate:'图片上传中~'
                },
                {
                    'img':'',
                    'isShow':false,
                    'loadname':true,
                    closeImg:false,
                    plan:'0%',
                    rate:'图片上传中~'
                }
            ],
            text:'',
            fileFilter:[],
            ismoney:false,
            android:'',
            newest:false,
            isOnclick:0
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            _this.loader();
            _this.android =  base.isApp('android') ?  true: false;
            if(!_this.android){
                for(var i=0;i<3;i++){
                    (function(i){
                        $('.fileImage').eq(i).fileupload({
                            url: base.pageUrl.uploadImg.url + '/' + types,
                            dataType: 'json',
                            autoUpload: false,
                            formData: {oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken')},
                            add: function(e,data){
                                if (data.files[0].size > 3145728 || data.files[0].size <= 51200) {
                                    popWait.run({
                                        contStr: '请上传50KB~3MB的图片'
                                    });
                                    return;
                                }
                                if (data.files[0].type == 'image/png' || data.files[0].type == 'image/jpeg' || data.files[0].type == 'image/gif') {
                                    var reader = new FileReader();
                                    reader.onload = function (e) {
                                        _this.upImgs[i].img = e.target.result;
                                    };
                                    reader.readAsDataURL(data.files[0]);
                                    _this.upImgs[i].loadname = false;       //上传图片文字隐藏
                                    _this.isOnclick++;
                                    data.submit();
                                }else{
                                    popWait.run({
                                        contStr: '请上传图片'
                                    });
                                }
                            },
                            done: function (e, data) {
                                //成功回调
                                _this.upImgs[i].isShow = true;      //显示图片
                                _this.upImgs[i].closeImg = true;    //显示X按钮
                                _this.Imgs[i].img = data.result.data.imgName;
                                _this.isOnclick--;
                            },
                            fail:function(e,data){
                                //失败回调
                                if(data.result.code == 'success'){
                                    _this.upImgs[i].isShow = true;      //显示图片
                                    _this.upImgs[i].closeImg = true;    //显示X按钮
                                    _this.Imgs[i].img = data.result.data.imgName;
                                }else{
                                    _this.upImgs[i].rate = '图片上传失败';
                                    _this.upImgs[i].closeImg = true;    //显示X按钮
                                }
                            },
                            progressall: function (e, data) {
                                _this.upImgs[i].plan = parseInt(data.loaded / data.total *100)+'%';
                            }
                        });
                    })(i);
                }
            }
        },
        methods: {
            loader: function () {
                var _this = this;
                base.ajax({
                    url: base.pageUrl.sharestate.url + '/' + types,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.sharestate.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        //不是中奖用户  (已经晒单 || 没有晒单)
                        if(!data.data.luckyState){
                            if(data.data.shareState){
                                _this.isShow = false;
                                _this.isbask = true;
                                _this.shares();
                            }else{
                                _this.isShow = true;
                                _this.isbask = false;
                            }
                        }
                        //中奖用户  && (已经晒单 || 没有晒单)
                        if(data.data.luckyState){
                            if(data.data.shareState){
                                _this.isShow = false;
                                _this.isbask = true;
                                _this.shares();
                            }else{
                                _this.isShow = false;
                                _this.isbask = false;
                            }
                        }
                    }
                })
            },
            upload:function(i){
                var _this = this;
                //1.12.0
                if(_this.android){
                    base.hybridProtocol({
                        tagName: 'info',
                        data:{
                            facility: true,
                            user: true,
                            protocol: true
                        },
                        success: function (data) {
                            if(data.devices.version.toString() < '1.12.0'){
                                popWait.run({
                                    contStr: '当前版本不支持，请更新到最新版本'
                                });
                                _this.newest = true;
                            }

                           // data.devices.version // 1.12.0
                        },
                        error: function (data) {

                        }

                    });
                    if(_this.newest){
                        return;
                    }
                    base.hybridProtocol({
                        tagName: 'upload',
                        data:{
                            type:1,
                            path:'activity/grab/',
                            callback:function(data){
                                if(data.isSuccess == 1){
                                    //成功
                                    _this.Imgs[i].img = data.filePath;
                                    _this.upImgs[i].img = 'https://file.qian360.com/'+data.filePath;      //显示图片
                                    _this.upImgs[i].isShow = true;   //显示图片
                                    _this.upImgs[i].closeImg = true;   //显示x
                                }
                                if(data.isSuccess == 0){
                                    //失败
                                    _this.upImgs[i].rate = '图片上传失败';    //失败提示
                                    _this.upImgs[i].closeImg = true;   //显示x
                                }
                            }
                        }
                    })
                }
            },
            shares:function(){
                var _this = this;
                //查询晒单分享详情
                base.ajax({
                    url: base.pageUrl.share.url + '/' + types,
                    type: "get",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.share.service
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        if(_this.ismoney){
                            popWait1.run({
                                contStr: '晒单成功,奖50钱币'
                            });
                        }
                        _this.share.phoneStr = data.data.phoneStr;
                        _this.share.realNameStr = data.data.realNameStr;
                        _this.share.shareTime = data.data.shareTime;
                        _this.share.testimonials = data.data.testimonials;
                        var add = {};
                        for(var i=0;i<data.data.shareImgUrlArray.length;i++){
                             add = {};
                            //+'@640w'
                            add.imgs = data.data.shareImgUrlArray[i]+'@640w_1o.jpg';
                            _this.share.shareImgUrlArray.push(add)
                        }
                    }
                })
            },
            deletes:function(i){
                var _this = this;
                _this.upImgs[i].img = '';
                _this.upImgs[i].isShow =  false;
            },
            //changes:function(e){
            //    var _this = this;
            //    var index = $(e.target).attr('data-index');
            //    var files = e.target.files;
            //    var file = files[0];
            //    if (file.type.indexOf("image") == 0) {
            //        //|| file.size <= 102400
            //        if (file.size >= 5242880 || file.size <= 102400) {
            //            // alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
            //            popWait.run({
            //                contStr: '请上传100KB~5MB的图片'
            //            });
            //            return;
            //        }
            //    } else {
            //        popWait.run({
            //            contStr: '请上传图片'
            //        });
            //        return;
            //    }
            //    var funAppendImage = function() {
            //        if (file) {
            //            var reader = new FileReader();
            //            reader.onload = function (e) {
            //                _this.upImgs[index].img = e.target.result;
            //                $.ajax({
            //                    url: base.pageUrl.uploadImg.url + '/' + types,
            //                    type: 'POST',
            //                    xhr: function() {
            //                      var  myXhr = $.ajaxSettings.xhr();
            //                        if(myXhr.upload){
            //                            myXhr.upload.addEventListener('progress', function(e){
            //                                //上传进度
            //                                _this.upImgs[index].loadname = false;       //上传图片文字隐藏
            //                                _this.upImgs[index].plan = parseInt(e.loaded / e.total *100)+'%'; //显示上传进度百分比
            //                                //(e.loaded / e.total *100).toFixed(2)+'%'
            //                            }, false);
            //                        }
            //                        return myXhr;
            //                    },
            //                    success:function(data) {
            //                      //上传成功
            //                        _this.upImgs[index].isShow = true;      //显示图片
            //                        _this.upImgs[index].closeImg = true;    //显示X按钮
            //                        _this.Imgs[index].img = data.data.imgName;
            //                    },
            //                    error:  function() {
            //                       //出错
            //                        _this.upImgs[index].rate = '图片上传失败';
            //                        _this.upImgs[index].closeImg = true;    //显示X按钮
            //                    },
            //                    data: {
            //                        //传参
            //                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
            //                        img:e.target.result
            //                    },
            //                    dataType: "json",
            //                    cache: false
            //                    //contentType: false,
            //                    //processData: false
            //                }, 'json');
            //
            //            };
            //            reader.readAsDataURL(file);
            //        }
            //    };
            //    funAppendImage()
            //},
            closeImg:function(i){
                var _this = this;
                _this.upImgs[i].isShow = false;
                _this.upImgs[i].loadname = true;
                _this.upImgs[i].closeImg = false;
                _this.upImgs[i].img = '';
                _this.upImgs[i].plan = '';
            },
            cardup:function(){
                var _this = this;
               if(_this.text == ''){
                   popWait.run({
                       contStr: '说几句获奖感言吧'
                   });
                   return;
               }
               if(_this.text.length < 15){
                   popWait.run({
                       contStr: '最少15字哦，再多说几句吧~'
                   });
                   return;
               }
                var Num = 0;
                for(var i=0;i<_this.upImgs.length;i++){
                    if(_this.upImgs[i].img != ''){
                        Num++;
                    }
                }
                if(Num == 0){
                    popWait.run({
                        contStr: '至少上传1张奖品图片'
                    });
                    return;
                }
                if(_this.isOnclick != 0){
                    popWait.run({
                        contStr: '请等待图片上传完毕'
                    });
                    return;
                }
                //提交晒单
                var shareImgUrlArray ='';
                for(var i=0;i<_this.Imgs.length;i++){
                    if(_this.Imgs[i].img !=''){
                        shareImgUrlArray +=_this.Imgs[i].img+','
                    }
                }
                ajaxNmum+=1;
                if(ajaxNmum > 1){
                    return;
                }
                base.ajax({
                    url: base.pageUrl.upshares.url + '/' + types,
                    type: "post",
                    data: {
                        oauthToken: base.cookie.getCookie(base.isApp() ? 'oauthToken' : 'qz_h5_oauthToken'),
                        appId: base.pageUrl.appId,
                        service: base.pageUrl.upshares.service,
                        testimonials:_this.text,
                        shareImgUrlArray:shareImgUrlArray
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function (data) {
                        _this.ismoney = true;
                        _this.isbask = true;
                        _this.shares();
                    },
                    error:function(){
                        ajaxNmum = 0;
                    }
                });

            }
        }
    })
});