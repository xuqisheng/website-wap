/**
 * 手机钱庄
 * @name fis过滤表
 * @description 工程js
 * @date 2015-11-23
 */

//--------------------------------------------------【工程过滤】
var general = [
    'libs/**',              // bower库
    'bower.json',           // bower配置表
    'node_modules/**',      // npm库
    'test/**',              // 测试发布目录
    'debug/**',             // 调试发布目录
    'dist/**',              // 正式发布目录
    'package.json',         // npm依赖配置
    'README.md',            // 项目描述
    'fis-conf-store.js',    // fis配置表-积分商城
    'fis-conf-promotion.js',// fis配置表-地推
    'fis-conf.js',          // fis配置表
    'fis-ignore.js',        // fis过滤表
    'gulpfile.js'           // gulp配置表
];

//--------------------------------------------------【项目过滤】

var projectTypeArr = ['store', 'master', 'promotion'];  // 项目分类

module.exports = function (type) {
    var projectArr = [];

    projectTypeArr = projectTypeArr.filter(function (item) {
        return item !== type;
    });

    for (var i = 0, l = projectTypeArr.length; i < l; i++) {
        projectArr.push('app/image/' + projectTypeArr[i] + '/**');
        projectArr.push('app/script/' + projectTypeArr[i] + '/**');
        projectArr.push('app/style/' + projectTypeArr[i] + '/**');
        projectArr.push('app/views/' + projectTypeArr[i] + '/**');
    }

    return general.concat(projectArr);
};