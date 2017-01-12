/**
 * 手机钱庄
 * @name 账户余额
 * @description 单页js
 * @date 2015-08-10
 */
define(function (require, exports, module) {

    require('zepto');
    require('fastclick');


    // fastclick代替zepto的tap,防止点透bug
    window.addEventListener('load', function () {
        FastClick.attach(document.body);
    }, false);

    // 这里没有做路由,而是直接在页面js上载入数据,所以不需要暴露模块接口给路由js调用
    //module.exports = function () {
    //--------------------------------------------------【var】
    var urlHash = location.hash,
        hasEscrow = urlHash.indexOf('escrow') != -1;

    var li = $('li'),
        arrows = li.find('.icon-arrow-bottom'),
        conts = li.find('.cont');

    li.on('click', function(){
        var _this = $(this),
            _arrow = _this.find('.icon-arrow-bottom'),
            _cont = _this.find('.cont'),
            _height = _cont.attr('scrollHeight'),
            _h = _cont.height();
        arrows.css({
            'transform':'rotate(0)',
            '-webkit-transform':'rotate(0)'
        });
        conts.css('height', 0);
        if(!_h) {
            _arrow.css({
                'transform': 'rotate(180deg)',
                '-webkit-transform': 'rotate(180deg)'
            });
            _cont.css('height', _height);
        }
    });

    if(hasEscrow){
        li.eq(1).click();
    }
    return function () {

    };
    //};
});
