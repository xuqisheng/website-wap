define(function (require, exports, module) {
    require('module/vue');
    var base = require('module/base');
    new Vue({
        el: 'body',
        data: {
            pageLoading: false,
            isApp:false,
            array:{
                topImg1: __uri('../../../image/store/grab/arrow-bottom.png'),
                topImg2: __uri('../../../image/store/grab/arrow-bottom.png'),
                topImg3: __uri('../../../image/store/grab/arrow-bottom.png'),
                topImg4: __uri('../../../image/store/grab/arrow-bottom.png'),
                topImg5: __uri('../../../image/store/grab/arrow-bottom.png'),
                topImg6: __uri('../../../image/store/grab/arrow-top.png'),
                topImg7: __uri('../../../image/store/grab/arrow-bottom.png')
            },
            backgroundColor1:{
                borderColor: ''
            },
            backgroundColor2:{
                //'border-bottom':'1px solid #e6e6e6',
                'border-top':'1px solid #e6e6e6'
            },
            issueShow1:false,
            issueShow2:false,
            issueShow3:false,
            issueShow4:false,
            issueShow5:false
        },
        ready: function () {
            var _this = this;
            _this.pageLoading = false;
            _this.loader()
        },
        methods: {
            loader: function () {
                var _this = this;
                _this.isApp = base.isApp('ios') ?  true : false;
            },
            issue:function(i,e){
                var _this = this;
                if(_this['issueShow'+i]){
                    _this['issueShow'+i] = false;
                    _this.array['topImg'+i] =  _this.array.topImg7;
                    return;
                }
                for(var j=1;j<6;j++){
                    _this['issueShow'+j] = false;
                    _this.array['topImg'+j] =  _this.array.topImg7;
                }
                _this['issueShow'+i] = true;
                _this.array['topImg'+i] =  _this.array.topImg6;

            }
        }
    })
});
