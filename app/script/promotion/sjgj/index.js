define(function (require, exports, module) {

    // 挂载注册按钮链接
    var elmRegisterBtn = document.getElementById('registerBtn'),
        registerHref = '#';
    if (location.hostname == 'h5.qian360.com') {
        registerHref = location.protocol + '//www.qian360.com/promotion/index.html?code=sjgj'

    } else if (location.hostname == 'h5.test.qian360.com') {
        registerHref = location.protocol + '//test.qian360.com/promotion/index.html?code=sjgj'

    } else if (location.hostname == 'h5.test2.qian360.com') {
        registerHref = location.protocol + '//test2.qian360.com/promotion/index.html?code=sjgj'

    } else if (location.hostname == 'h5.test3.qian360.com') {
        registerHref = location.protocol + '//test3.qian360.com/promotion/index.html?code=sjgj'
    }

    elmRegisterBtn.setAttribute('href', registerHref);

    // 移除加载动画
    var elmPageLoading = document.getElementById('pageLoading');
    elmPageLoading.parentNode.removeChild(elmPageLoading);
});