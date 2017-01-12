/**
 * 钱庄网
 * @name 基础js
 * @description 整站基础js模块
 * @date 2015-07-16
 * @version $V1.0$
 */
define(function (require, exports, module) {
    require('jquery');
    var base = require('base'),
        scrollLoader = require('module/scrollLoader');
    var loadList = function(opt){
        this.eventType = opt.eventType || 'down';
        this.ajaxUrl = opt.ajax.url;
        this.ajax = opt.ajax;
        this.pageNumber = opt.pageNumber || 1;
        this.pageSize = opt.pageSize || 10;
        this.opt = {
            wrap: opt.wrap || window,
            threshold: opt.threshold || 200,
            autoLoad: opt.autoLoad || true
        };
        this.init();
    };
    var _prototype = loadList.prototype;

    _prototype.init = function(){
        this.event();
        this.scrollEvent = new scrollLoader(this.opt)
    };
    _prototype.event = function(){

        this.setData();

        if(this.eventType == 'down'){
            this.opt.loadDownFn = this.loadEvent;
        }else{
            this.opt.loadUpFn = this.loadEvent;
        }
    };
    _prototype.setData = function(){
        var that = this;
        this.loadEvent = function(loaderObj){
            base.ajax({
                url: that.ajaxUrl + '/' + that.ajax.data.id + '/' + that.pageSize,
                type: that.ajax.type || "get",
                data: $.extend({
                    pageNumber: that.pageNumber,
                    pageSize: that.pageSize
                }, that.ajax.data),
                dataType: "json",
                success: function (data){
                    that.ajax.success && that.ajax.success(data, next);
                    function next(){
                        if(that.pageSize < data.data.total){
                            that.pageSize+=10;
                            that.setAjax();
                            loaderObj.loading = false;
                            loaderObj.resizeHeight();
                            if(loaderObj.opt.autoLoad){
                                loaderObj.autoLoad()
                            }
                        }
                    }
                },
                complete: function(){
                    that.ajax.complete && that.ajax.complete();
                }
            })
        };
    };
    _prototype.setAjax = function(){
        this.setData();
        if(this.eventType == 'down'){
            this.scrollEvent.loadDownFn = this.loadEvent;
        }else{
            this.scrollEvent.loadUpFn = this.loadEvent;
        }

    };

    //--------------------------------------------------【暴露公共方法】
        return loadList;
});