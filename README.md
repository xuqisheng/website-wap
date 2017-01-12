# h5钱庄项目描述

## 目录

1. 工程结构
2. 运行与发布
3. 框架与工具
4. 代码规范
5. 团队开发

## 工程结构

### 根目录下

*  `/app`是项目的源文件
* `/libs`是bower包管理器的下载目录,`.bowerrc`是它的配置文档
* `/node_modules`是npm包管理器的下载目录,`package.json`是它的配置文档
* `/test`、`/dist`是用fis的命令行发布出来的文件夹，前者是测试版本，后者是线上发布版
* `.gitignore`是整个工程的git过滤文档，屏蔽一些不需要被git版本管理的文件及文件夹
* `fis-config.js`是这个工程的fis配置文档,项目的自动化构建都是依赖这个文件的

### 项目组成

在`/app`中的`style`、`script`、`image`里有`master`、`store`、`promotion`、`common`文件夹,前三个代表三个项目,`common`是三个项目公用的资源.

### app/views

此文件夹用来存放html页面,`pages`里存放页面,`includes`是页面的公共部分

### app/style

`/iconfont`下存放的是项目所用到的iconfont文件
`/qst`项目用到的stylus库,里面提供了很多web开发常用的工具

根目录下的`styl`文件的作用与职责:

* `mobilebone.styl`是`mobilebone`框架所依赖的样式表
* `config.styl`是项目所用到的配置参数和常用工具方法块
* `base.styl`是项目的基础样式表,包括样式初始化、自适应的媒体查询、页面基础布局等
* `qianui.styl`根据ui规范提取的公共样式
* `style.styl`主样式表,页面对应的样式都放在这个文件
* `animate.styl`和`mobilebone.animate.styl`暂时没有用到.前者里放着常用的css3动画样式,后者是`mobilebone`提供的转场动画,由于只用到了它的淡入淡出转场,所以把这部份代码放到了`base.styl`里去了.

ps:项目下的`.css`和`.css.map`都是由`.styl`文件自动编译生成的,所以修改样式千万不要在这上面修改.

### app/script

* `module`存放功能模块
* `page`存放页面对应的js,保持文件名与对应`.html`名或`路由id`一致
* `route`单页面的路由表,负责页面转场的渲染、js加载、内存回收等
* `tpl`存放项目的`handlebars`模板,页面级别的模板用`page`做文件名的前缀

根目录下的`.js`文件的作用与职责:

* `mobilebone.js`项目实现单页应用所依赖的框架
* `zepto.js`项目所依赖的js工具库
* `sea.js`项目模块化开发依赖的库
* `fastclick.js`用来处理移动端的点击事件
* `mock.js`开发过程用来模拟ajax的js工具库
* `handlebars.js`模板引擎
* `hammer.js`和`jquery.js`暂时没有用到.前者是用来做移动端手势的js工具库,后者由于文件大小的原因暂时没有用

### app/image

此文件夹用来存放项目所用到的所有图片,存放时注意用文件夹进行分组. 如果是公用的或者实在无法分组的,那就放在根目录下.注意命名明确

## 运行与发布

在工程根目录下,分别执行下面两段命令,安装项目依赖.

* `npm install`   //项目开发环境用到的模块
* `bower install` //项目生产环境用到的库

常用命令行(在工程根目录下运行):

> 以h5为例,如需运行`store`、`promotion`只需要把下面命令行中的`h5`替换掉即可

* 开启iis服务器:`npm run server`
* 本地模拟ajax运行:`npm run h5`
* 本地连接后端服务器(需改host):`npm run h5-local`
* 发布测试版:`npm run h5-test`
* 发布正式版:`npm run h5-dist`

项目发布后,需要把发布后的文件夹里面的文件上传到ftp,才算上传完成.(这个后期可以配置起来自动完成,无需手动上传ftp,需后端配合)

## 框架与工具

### fis

百度开发的[前端自动化工具](http://fis.baidu.com/),安装方式:[http://fis.baidu.com/fis3/docs/beginning/install.html](http://fis.baidu.com/fis3/docs/beginning/install.html)

### npm

跑fis会有一些node模块依赖,请在工程根目录下运行`npm install`下载依赖的node模块

### bower

用来下载github最新的前端工具or框架[http://segmentfault.com/a/1190000000349555](http://segmentfault.com/a/1190000000349555)

### mobilebone

项目实现单页应用的框架[http://mobilebone.org/](http://mobilebone.org/)

### seajs

前端模块化开发框架[http://seajs.org/](http://seajs.org/)

### requirejs

前端模块化开发框架[http://www.requirejs.cn/](http://www.requirejs.cn/)

### mockjs

用来前端开发过程中模拟`ajax`请求返回数据[http://mockjs.com](http://mockjs.com)

### handlebars

前端渲染的模板引擎[http://keenwon.com/992.html](http://keenwon.com/992.html)

### gulp

做一些项目中的自动化操作[gulpjs.com.cn/docs/getting-started/](gulpjs.com.cn/docs/getting-started/)

## 代码规范

### html规范

#### 页面head

```
<link rel="import" href="../includes/hdMeta.html?__inline">
<title>钱庄理财</title>
<link rel="import" href="../includes/hdStyle.html?__inline">
```

1. `hdMeta.html`和`hdStyle.html`是`/app/views/includes`里的公共`meta`和`style`.
2. `title`根据页面需要设置,如果没有明确要求,统一文案为`钱庄理财`.

#### 页面脚本

```
<script src="../../script/sea.js" id="seajsnode"></script>
<script>
    seajs.use('route/routeHome');
</script>
```

1. 页面脚本必须插入`</body>`上面一行
2. 引入`seajs`的`<script>`标签上必须写上`id="seajsnode"`,它是用来后期插入`seajs-config.js`的定位id
3. `seajs.use`虽然可以引入多个js做入口,但是这里要求*只做一个入口*,为以后转`requirejs`提供可能

#### 基础布局

1. `body>section.page>article.viewport`,用这个布局模拟body,这样就可以用absolute模拟fixed了,避免fixed在移动端各种诡异的表现
2. 基础布局的`<section></section>`必须写上`page`开头的id,且整个项目唯一.样式表中,给这个页面写样式,根据这个id来做继承;单页面的a标签链接也是通过这个id来转场的
3. 基础布局的`<section></section>`必须写上`data-onpagefirstinto`、`data-callback`、`data-fallback`这三个增强属性,它们用来挂在mobilebone上的路由函数.作用依次是,页面初始化时、页面入场时、页面出厂时.
4. 基础布局的`<section></section>`有需要则写上`data-title`增强熟悉,用来做页面转场动态修改页面的title.(ios的微信暂时修改不了,但是它的浏览器是支持的.安卓完全支持)
5. 基础布局的`<section></section>`的class上除了下`.page`样式,最好也写上`.out`、`.in`样式,用来显示\隐藏这个图层.
6. 如果页面有引用`base.js`可以给页面加`body>section#pageLoading`这样的结构,这个图层是用来做页面加载菊花转的,`base.js`会在页面onload后隐藏这个图层.

#### 公用的底部导航(只适用h5)

1. 可以写在于`section`同级的地方,如`body>section.page+footer#homeNavbar`.然后通过样式让`section`的`margin-bottom`等于`footer`的`height`来留出空间给`footer`.
2. 要给导航的`a`标签写上` data-rel="auto"`增强熟悉,它的作用是页面转场的过程中自动判断是做前进动画还是后退动画.

#### 单页面的超链接(只适用h5)

1. 本单页的转场`a`标签的`href`上可以直接写`#idName`,用来跳转到相应的图层
2. 如果要引入外部的页面进入本单页,直接在`href`写上`http`链接
3. 如果想单独一个页面打开则需要在`a`标签上写上`data-ajax`

### css规范

#### stylus

本项目的样式是基于`css预编译`工具`stylus`写的.
1. 为防止有些人不适应stylus的缩进方式写样式,所以还是用平时写css的语法写样式
2. 样式用继承的方式来写. 这样可以通过样式的继承关系很好的理解页面的层级,以及这个样式的作用.

#### QST

1. QST是stylus的工具库,提供常用的函数,类似于js与jq的关系.具体使用参看[https://github.com/xjchenhao/qst](https://github.com/xjchenhao/qst)
2. 引入qst的`all.styl`即引入了所有的qst模块(如果不调用并不会在后期编译出来,放心使用)

#### 注释

1. 开发的注释,一律使用`//`,它是不会被stylus编译生成出来的
2. 大功能板块用`//--------------------------------------------------------【xxxx】`的方式来做划分
3. 大功能板块下的小划分用`//xxxx`的方式来写

### js规范

#### route

1. `/route`下的模块是用来给mobilebone做页面路由的
2. 路由的主逻辑是:

```
Mobilebone.rootTransition={
    homeInto: function (pageInto, pageOut, callback) {},
    homeOut: function (pageInto, pageOut, callback) {},
    listInto: function (pageInto, pageOut, callback) {},
    listOut: function (pageInto, pageOut, callback) {}
}
```

`xxxInto`是页面转入函数,`xxxOut`是页面转出函数,与html页面上的增强属性对应.

3. 页面转入的模块包含页面渲染、调用对应的js

#### module

1. `/module`下的模块是功能模块
2. 可能会直接被沿用到其它项目当中去,所以开发\修改此类模块要慎重,前期最好确认好api.
3. 功能模块修改之后需要在文件的最顶部修改版本号,版本号分为三位数`1.0.3`,小问题修改改第三位,api修改改第二位,整个模块重写改第一位.
4. 模块顶部尽量写上使用注释,便于其它开发人员的使用

#### page

1. `/page`下的模块是页面模块
2. 如果是给页面路由引用的模块,需要把js的逻辑放在`module.exports = function () {}`里,暴露接口用来给页面路由调用这个模块的时候运行.
3. 而且`module.exports = function () {}`需要`return`一个方法,用来给页面路由转出这个页面时做内存回收

## 团队开发

1. 用git进行团队开发版本管理,修改提交注意详细描述修改内容
2. 页面多写注释,便于他人的开发理解
3. 沿用项目中的代码习惯,保证一致性(比如文件名\样式名的命名方式等)
4. 大的改动必须跟组内人员确认,还有做好前期的备份!
