// todo: 1、跑任务的时候手工修改渠道编码。2、生成文件里手工删除多余APP文件夹（未找到好办法删除）
var promotionCode = 'baiwanliuliang', // 渠道编号
    testType = 'test';        // 测试机编号

fis.set('project.ignore', require('./fis-ignore.js')('promotion')); // 生成忽略目录&文件的数组

fis.set('new date', Date.now());    // 生成`new date`值,用来做时间戳

// amd的config配置
fis.hook('amd', {
    baseUrl: './',
    paths: {
        'page': './app/script/promotion/' + promotionCode + '/',
        'qianModule': './libs/qianMobileModule/src/module/',
        'jquery': './libs/jquery/dist/jquery.min.js',
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
    .match('/app/views/promotion/' + promotionCode + '/(*.html)', {
        release: '$1'
    })
    .match('/app/style/promotion/{' + promotionCode + ',common}/(**.*)', {
        release: 'style/$1$2'
    })
    .match('/app/script/promotion/' + promotionCode + '/(**.*)', {
        release: 'script/$1'
    })
    .match('/libs/qianMobileModule/src/module/flexible.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('/app/image/promotion/' + promotionCode + '/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/promotion/common/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/common/(**.*)', {
        release: false
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: true
        }),
        rExt: '.css'
    })
    .match('{**/qst/**.*,/app/style/common/**.*,/app/style/promotion/' + promotionCode + '/*.css,/app/style/promotion/' + promotionCode + '/*.css.map,/app/style/promotion/common/*.css,/app/style/promotion/common/*.css.map}', {
        release: false
    })

    //map映射表内嵌网页
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        })
    });

fis.media('test')

    // 调整工程目录
    .match('/app/views/promotion/' + promotionCode + '/(*.html)', {
        release: '$1'
    })
    .match('/app/style/promotion/{' + promotionCode + ',common}/(**.*)', {
        release: 'style/$1$2'
    })
    .match('/app/script/promotion/' + promotionCode + '/(**.*)', {
        release: 'script/$1'
    })
    .match('/libs/qianMobileModule/src/module/flexible.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('/app/image/promotion/' + promotionCode + '/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/promotion/common/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/common/(**.*)', {
        release: false
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: true
        }),
        domain: 'http://h5.' + testType + '.qian360.com/promotion/' + promotionCode,
        rExt: '.css'
    })
    .match('{**/qst/**.*,/app/style/common/**.*,/app/style/promotion/' + promotionCode + '/*.css,/app/style/promotion/' + promotionCode + '/*.css.map,/app/style/promotion/common/*.css,/app/style/promotion/common/*.css.map}', {
        release: false
    })
    // 资源定向
    .match('**.{png,gif,jpg,eot,woff,ttf}', {
        domain: 'http://h5.' + testType + '.qian360.com/promotion/' + promotionCode
    })
    .match('**.js', {
        domain: 'http://h5.' + testType + '.qian360.com/promotion/' + promotionCode
    })

    //map映射表内嵌网页
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        })
    });

fis.media('dist')

    // 调整工程目录
    .match('/app/views/promotion/' + promotionCode + '/(*.html)', {
        release: '$1'
    })
    .match('/app/style/promotion/{' + promotionCode + ',common}/(**.*)', {
        release: 'style/$1$2'
    })
    .match('/app/script/promotion/' + promotionCode + '/(**.*)', {
        release: 'script/$1'
    })
    .match('/libs/qianMobileModule/src/module/flexible.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                except: 'exports, module, require, define'
            }
        })
    })
    .match('/app/image/promotion/' + promotionCode + '/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/promotion/common/(**.*)', {
        release: 'image/$1'
    })
    .match('/app/image/common/(**.*)', {
        release: false
    })

    // style
    .match('**.styl', {
        parser: fis.plugin('stylus', {
            sourcemap: false,
            compress: true  // 压缩
        }),
        domain: 'https://h5.qian360.com/promotion/' + promotionCode,
        rExt: '.css'
    })
    .match('{**/qst/**.*,/app/style/common/**.*,/app/style/promotion/' + promotionCode + '/*.css,/app/style/promotion/' + promotionCode + '/*.css.map,/app/style/promotion/common/*.css,/app/style/promotion/common/*.css.map}', {
        release: false
    })
    // 资源定向
    .match('**.{png,gif,jpg,eot,woff,ttf}', {
        domain: 'https://h5.qian360.com/promotion/' + promotionCode
    })
    .match('**.js', {
        domain: 'https://h5.qian360.com/promotion/' + promotionCode
    })

    //map映射表内嵌网页
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: false,
            useInlineMap: true
        })
    });