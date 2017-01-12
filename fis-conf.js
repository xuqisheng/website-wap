var testType = 'test';        // 测试机编号

fis.set('project.ignore', require('./fis-ignore.js')('master'));

fis.set('new date', Date.now());

fis.match('/app/views/master/pages/(*.html)', {
        release: '$1'    //pages下的所有html页面生成到默认地址下
    })
    .match('/app/style/master/(**.*)', {
        release: 'style/$1'   //style/master下的所有文件生成到默认地址下的style下
    })
    .match('/app/script/master/(**.*)', {
        release: 'script/$1'    //script/master下的所有文件生成到默认地址下的script下
    })
    .match('/app/image/master/(**.*)', {
        release: 'image/$1'     //image/master下的所有文件生成到默认地址下的image下
    })
    .match('/app/image/common/(**.*)', {
        release: 'image/$1'     //image/common下的所有文件生成到默认地址下的image下
    })
    .match('{/app/views/master/includes/**.*,/app/style/common/**.*}', {
        release: false         ///app/views/master/includes/**.*和/app/style/common/**.*下的文件不生成
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: true        //找到有所styl文件,解析stylus文件,后缀转换成.css文件
        }),
        rExt: '.css'
    })
    .match('{**/qst/*.*,/app/style/master' + '/*.css,/app/style/master/*.css.map,/app/style/common/*.css,/app/style/common/*.css.map}', {
       release: false
    });
fis.media('local')
    // 修改api地址
    .match('/app/(**.js)', {
        postprocessor: function (content, file, settings) {
            return content.replace('ajax-map', 'url-map');
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://qz.dev.qian360.com:8008"');//8080
        }
    });

fis.media('debug')

    // 不用压缩
    .match('*.{js,css,png,jpg}', {
        useHash: false,
        useSprite: false,
        optimizer: null
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
    .match('/app/(**.js)', {
        postprocessor: function (content, file, settings) {
            return content.replace('ajax-map', 'url-map');
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://ceshi.qian360.com"');
        }
    })

    // stylus编译
    .match('*.styl', {
        parser: fis.plugin('stylus'),
        rExt: '.css'
    })
    .match('*.css.map', {
        release: false
    })

    // 资源合并
    .match('**.css', {
        packTo: '/style/aio.css',
        domain: 'http://h5.ceshi.qian360.com'
    })

    // 资源定向
    .match('/app/(**.{png,gif,jpg,eot,woff,ttf})', {
        domain: 'http://h5.ceshi.qian360.com'
    })
    .match('/app/(**.js)', {
        domain: 'http://h5.ceshi.qian360.com'
    })
    .match('/app/(**.css)', {
        domain: 'http://h5.ceshi.qian360.com'
    })
    .match('::package', {
        postpackager: fis.plugin('seajsconfig', {
            keyStrFilter: ['.js', 'app/script/master/'],
            domain: 'http://h5.' + testType + '.qian360.com'
        })
    })
    .match('::package', {
        postpackager: fis.plugin('loader', null, 'append')
    });

fis.media('test')

    // 资源压缩
    .match('/app/**.png', {
        optimizer: fis.plugin('png-compressor')   //压缩png图片
    })
    .match('/app/script/master/{module,page}/(**.js)', { //压缩内联js
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('sea.js', {
        optimizer: null    //sea.js 不压缩
    })
    .match('/app/(**.css)', {
        optimizer: fis.plugin('clean-css', {   //压缩css
            'keepBreaks': true //保持一个规则一个换行
        })
    })

    // 开启md5
    .match('image', {
        useHash: true   //开启md5
    })
    .match('{image/master/home-progressbar/*.png,image/master/pro-list-progressbar/*.png}', {
        useHash: false,
        query: '?=t' + fis.get('new date')
    })
    .match('(*.{js,css})', {
        useHash: true
    })

    // 修改api地址
    .match('/app/(**.js)', {
        postprocessor: function (content, file, settings) {
            return content.replace('ajax-map', 'url-map');
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "http://' + testType + '.qian360.com"');
        }
    })

    // css合并
    .match('/app/style/master/{mobilebone.css,base.css,qianui.css,style.css}', {
        packTo: '/style/aio.css'
    })
    .match('mobilebone.css', {
        packOrder: -99
    })
    // 资源定向
    //.match('**.{png,gif,jpg,eot,woff,ttf}', {
    //    domain: 'http://h5.qian360.com'
    //})
    //.match('**.js', {
    //    domain: 'http://h5.qian360.com'
    //})
    //.match('**.css', {
    //    domain: 'http://h5.qian360.com'
    //})
    .match('::package', {
        postpackager: [fis.plugin('seajsconfig', {
            keyStrFilter: ['.js', 'app/script/master/']
            //,domain: 'http://h5.qian360.com'
        }), fis.plugin('loader')]
    });

fis.media('dist')

    // 过滤api配置文件
    //.match('url-map.js', {
    //    release: false
    //})

    // 资源压缩
    .match('/app/**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('/app/script/master/{module,page}/(**.js)', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('sea.js', {
        optimizer: null
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
    .match('{image/master/home-progressbar/*.png,image/master/pro-list-progressbar/*.png}', {
        useHash: false,
        query: '?=t' + fis.get('new date')
    })
    .match('(*.{js,css})', {
        useHash: true
    })

    // 修改api地址
    .match('/app/(**.js)', {
        postprocessor: function (content, file, settings) {
            return content.replace('ajax-map', 'url-map');
        }
    })
    .match('url-map.js', {
        postprocessor: function (content, file, settings) {
            return content.replace(/var apiUrl\s=\s[\'|\"].*[\'|\"]/, 'var apiUrl = "https://www.qian360.com"');
        }
    })

    // style    解析styl文件,压缩,然后通过rExt构建成.css文件
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            compress: true  // 压缩
        }),
        rExt: '.css'
    })
    // css合并
    .match('/app/style/master/{mobilebone.css,base.css,qianui.css,style.css}', {
        packTo: '/style/aio.css'   //packTo  合并生成到
    })
    .match('mobilebone.css', {
        packOrder: -99   //
    })
    // 资源定向
    //.match('**.{png,gif,jpg,eot,woff,ttf}', {
    //    domain: 'http://h5.'+testType+'.qian360.com'
    //})
    //.match('**.js', {
    //    domain: 'http://h5.'+testType+'.qian360.com'
    //})
    //.match('**.css', {
    //    domain: 'http://h5.'+testType+'.qian360.com'
    //})
    .match('::package', {
        postpackager: [fis.plugin('seajsconfig', {
            keyStrFilter: ['.js', 'app/script/master/']
            //,domain: 'http://h5.'+testType+'.qian360.com'
        }), fis.plugin('loader')]
    });