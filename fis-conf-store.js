var testType = 'test';        // 测试机编号

fis.set('project.ignore', require('./fis-ignore.js')('store')); // 生成忽略目录&文件的数组

fis.set('new date', Date.now());    // 生成`new date`值,用来做时间戳


// amd的config配置
fis.hook('amd', {
    baseUrl: './',
    paths: {
        'page': './app/script/store/page/',
        'module': './app/script/store/module/',
        'tpl': './app/script/store/tpl/',
        'qianModule': './libs/qianMobileModule/src/module/',

        'jquery': './libs/jquery/dist/jquery.min.js',
        'jquery.ui.widget': './app/script/store/module/jquery.ui.widget.js',
        'jquery.iframe-transport': './app/script/store/module/jquery.iframe-transport.js',
        'jquery.fileupload-process': './app/script/store/module/jquery.fileupload-process.js',
        'mock': './libs/mockjs/dist/mock-min.js',
        'lazyload': './libs/jquery_lazyload/jquery.lazyload.js',
        'handlebars': './libs/handlebars/handlebars.min.js',
        'iSlider': './libs/iSlider/build/iSlider.min.js'
    },
    shim: {
        './libs/jquery_lazyload/jquery.lazyload.js': {
            deps: ['jquery']
        }
    }
});

fis
    // 调整工程目录
    .match('/app/views/store/pages/(*.html)', {
        release: '$1'
    })
    .match('/app/style/{store,common}/(**.*)', {
        release: 'style/$1$2'
    })
    .match('/app/script/store/(**.*)', {
        release: 'script/$1'
    })
    .match('/app/script/store/({page,module}/**).js', {
        moduleId: '$1$2',
        isMod: true
    })
    .match('/libs/qianMobileModule/src/module/flexible.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('/app/image/store/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/common/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/views/store/includes/**', {
        release: false
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: true
        }),
        rExt: '.css'
    })
    .match('{**/qst/*.*,/app/style/store/*.css,/app/style/store/*.css.map,/app/style/common/*.css,/app/style/common/*.css.map}', {
        release: false
    })

    //map映射表内嵌网页
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        })
    });

fis.media('local')
    // 修改api地址
    .match('/app/script/store/module/base.js', {
        postprocessor: function (content, file, settings) {
            content = content.replace(/ajax\-map/g, 'url-map');
            content.replace(/var _loginLink\s=\s[\'|\"].*[\'|\"]/, 'var _loginLink = "http://ceshi.qian360.com:8080/interlayer.html?redirectURL="');
            return content;
        }
    })
    .match('/app/script/store/**/url-map.js', {
        postprocessor: function (content, file, settings) {
            content =  content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://qz.dev.qian360.com:8008"');  //8008
            content =  content.replace(/var jchdUrl\s=\s[\'|\"].*[\'|\"]/, 'var jchdUrl = "http://ceshi.qian360.com:7062"');//8052
            return content;
        }
    })
    //.match('/app/script/store/**/url-map.js', {
    //    postprocessor: function (content, file, settings) {
    //        return content.replace(/var jchdUrl\s=\s[\'|\"].*[\'|\"]/, 'var jchdUrl = "http://ceshi.qian360.com:8052"');
    //    }
    //})
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,   //js和css是否打包成1个文件
            useInlineMap: true  //是否作为内嵌脚本输出
        })
    });

fis.media('debug')

    // 资源压缩
    .match('/app/**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('/app/script/store/{module,page}/(**.js)', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('/app/(**.css)', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    })

    // 开启md5
    .match('image', {
        useHash: true
    })
    .match('{image/home-progressbar/*.png,image/pro-list-progressbar/*.png}', {
        useHash: false,
        query: '?=t' + fis.get('new date')
    })
    .match('(*.{js,css})', {
        useHash: true
    })

    // 修改api地址
    .match('/app/script/store/module/base.js', {
        postprocessor: function (content, file, settings) {
            content = content.replace(/ajax\-map/g, 'url-map');
            content = content.replace(/var _loginLink\s=\s[\'|\"].*[\'|\"]/, 'var _loginLink = "http://h5.test.qian360.com/interlayer.html?redirectURL="');
            return content;
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://test.qian360.com"');
        }
    })
    // style
    .match('{*.css.map,*.styl,**/qst/*.*}', {
        release: false
    })

    // todo:css合并会因为下面的`loader`和`deps-pack`插件共用导致失效
    .match('{/app/style/common/qianui.css,/app/style/store/style.css}', {
        packTo: '/style/aio.css'
    })

    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        })
        , packager: fis.plugin('deps-pack', {
            //'pkg/base.js': [
            //    '/app/script/store/module/base.js:deps',
            //    '/app/script/store/module/base.js:asyncs',
            //    '/app/script/store/module/base.js',
            //    '!/libs/jquery/dist/jquery.min.js',
            //    '!/libs/mockjs/dist/mock-min.js'
            //]
            //,'pkg/home.js': [
            //    '/app/script/store/page/home.js:deps',
            //    '/app/script/store/page/home.js:asyncs',
            //    '/app/script/store/page/home.js',
            //    '!/libs/jquery/dist/jquery.min.js'
            //]

        })
    });

fis.media('test')
    .match('/app/(**.css)', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    })

    // 开启md5
    .match('image', {
        useHash: true
    })
    .match('{image/home-progressbar/*.png,image/pro-list-progressbar/*.png}', {
        useHash: false,
        query: '?=t' + fis.get('new date')
    })
    .match('(*.{js,css,styl})', {
        useHash: true
    })

    // 修改api地址
    .match('/app/script/store/module/base.js', {
        postprocessor: function (content, file, settings) {
            content = content.replace(/ajax\-map/g, 'url-map');
            content = content.replace(/var _loginLink\s=\s[\'|\"].*[\'|\"]/, 'var _loginLink = "http://h5.' + testType + '.qian360.com/interlayer.html?redirectURL="');
            content = content.replace(/var H5psd\s=\s[\'|\"].*[\'|\"]/, 'var H5psd = "http://h5.' + testType + '.qian360.com/forgetTransPassword.html?redirectURL="');
            return content;
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            content =  content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://' + testType + '.qian360.com"');
            content =  content.replace(/var jchdUrl\s=\s[\'|\"].*[\'|\"]/, 'var jchdUrl = "http://mall.' + testType + '.qian360.com"');
            return content;
        }
    });
//.match('*', {
//    deploy: fis.plugin('http-push', {
//        receiver: 'http://10.139.51.88:8999',
//        //receiver: 'http://10.139.51.88:8999/receiver',
//        to: '/data/www/mall_test_qian360_com' // 注意这个是指的是测试机器的路径，而非本地机器
//    })
//});

fis.media('dist')

    // 过滤api配置文件
    //.match('url-map.js', {
    //    release: false
    //})

    // 资源压缩
    .match('/app/**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('/app/script/store/{module,page}/(**.js)', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })

    // 开启md5
    .match('image', {
        useHash: true
    })
    .match('{image/home-progressbar/*.png,image/pro-list-progressbar/*.png}', {
        useHash: false,
        query: '?=t' + fis.get('new date')
    })
    .match('(*.{js,css,styl})', {
        useHash: true
    })

    // 修改api地址
    .match('/app/(**.js)', {
        postprocessor: function (content, file, settings) {
            content = content.replace(/ajax\-map/g, 'url-map');
            content = content.replace(/var _loginLink\s=\s[\'|\"].*[\'|\"]/, 'var _loginLink = "http://h5.qian360.com/interlayer.html?redirectURL="');
            content = content.replace(/var H5psd\s=\s[\'|\"].*[\'|\"]/, 'var H5psd = "http://h5.' + testType + '.qian360.com/forgetTransPassword.html?redirectURL="');
            return content;
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            content =  content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "https://www.qian360.com"');
            content =  content.replace(/var jchdUrl\s=\s[\'|\"].*[\'|\"]/, 'var jchdUrl = "https://mall.qian360.com"');
            return content;
        }
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: false,
            compress: true  // 压缩
        }),
        rExt: '.css'
    })

    //map映射表内嵌网页
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        }),
        packager: fis.plugin('deps-pack', {
            'pkg/base.js': [
                '/app/script/store/module/base.js:deps',
                '/app/script/store/module/base.js:asyncs',
                '/app/script/store/module/base.js',
                '!/app/script/store/module/url-map.js',
                '!/app/script/store/module/ajax-map.js',
                '!/libs/jquery/dist/jquery.min.js',
                '!/libs/mockjs/dist/mock-min.js'
            ],
            'pkg/load-data.js': [
                '/app/script/store/module/load-data.js:deps',
                '/app/script/store/module/load-data.js:asyncs',
                '/app/script/store/module/load-data.js',
                '!/app/script/store/module/url-map.js',
                '!/app/script/store/module/ajax-map.js',
                '!/libs/jquery/dist/jquery.min.js',
                '!/libs/mockjs/dist/mock-min.js',
                '!/app/script/store/module/base.js'
            ]

        })
    });