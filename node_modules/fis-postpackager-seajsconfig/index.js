/*
 * fis生成`sea-config.js`文件映射 1.1.0
 */

'use strict';

module.exports = function (ret, conf, settings, opt) {
    //把配置文件中的seajs节点配置读出来
    var fis_sea_conf = fis.config.get('seajs', {});
    fis_sea_conf.alias = fis_sea_conf.alias || {};
    //构建别名表
    fis.util.map(ret.map.res, function (id, res) {
        var _id = id,   // 原始key
            _uri = res.uri, // 原始val
            keyStrFilter = settings.keyStrFilter,
            valueStrFilter = settings.valueStrFilter;
        if (Array.isArray(keyStrFilter)) {
            keyStrFilter.forEach(function (val) {
                _id = _id.replace(val, '');
            });
        } else {
            _id = _id.replace(keyStrFilter, '');
        }
        if (Array.isArray(valueStrFilter)) {
            valueStrFilter.forEach(function (val) {
                _uri = _uri.replace(val, '');
            });
        } else {
            _uri = _uri.replace(valueStrFilter, '');
        }
        fis_sea_conf.alias[_id] = _uri;
    });

    //构造seajs的config.js配置文件
    var seajs_config = fis.file(fis.project.getProjectPath(), 'sea-config.js');
    //拼接字符串，生成sea.config调用
    seajs_config.setContent('seajs.config(' + JSON.stringify(fis_sea_conf, null, opt.optimize ? null : 4) + ');');
    //user参数赋值
    seajs_config['domain'] = settings.domain;
    //把新生成的文件放到打包文件输出表
    ret.pkg[seajs_config.subpath] = seajs_config;
    //构造页面插入的script标签内容
    var script = '<script src="' + seajs_config.getUrl() + '"></script>';
    //找到所有的源码文件，对其进行配置文件script标签插入
    fis.util.map(ret.src, function (subpath, file) {
        if (file.isHtmlLike) { //类html文件
            var content = file.getContent();
            if (/\bseajs\.use\s*\(/.test(content)) { //如果有sea.use(，才会插入
                //插入到页面</head>标签结束之前
                content = content.replace(/<script.*id="seajsnode".*><\/script>/, '$&\n  ' + script);
                file.setContent(content);
            }
        }
    });
};