define(function (require, exports, module) {

    // 挂载注册按钮链接
    var btns = document.getElementsByTagName('a'),
        len = btns.length,
        registerHref = '#';

    if (location.hostname == 'h5.qian360.com') {
        registerHref = location.protocol + '//www.qian360.com/promotion/index.html?code=chemayi'

    } else if (location.hostname == 'h5.test.qian360.com') {
        registerHref = location.protocol + '//test.qian360.com/promotion/index.html?code=chemayi'

    } else if (location.hostname == 'h5.test2.qian360.com') {
        registerHref = location.protocol + '//test2.qian360.com/promotion/index.html?code=chemayi'

    } else if (location.hostname == 'h5.test3.qian360.com') {
        registerHref = location.protocol + '//test3.qian360.com/promotion/index.html?code=chemayi'
    }
    for(var i = 0; i<len; i++){
        btns[i].setAttribute('href', registerHref);
    }

    // 移除加载动画
    var elmPageLoading = document.getElementById('pageLoading');
    elmPageLoading.parentNode.removeChild(elmPageLoading);
});