该项目是[fis-postpackager-seajs](https://www.npmjs.com/package/fis-postpackager-seajs)的分支，因为项目需要做了一些增强.

##安装

`npm install fis-postpackager-seajsconfig `

or

`npm install fis-postpackager-seajsconfig -g`

##调用方式

```
fis.match('::package', {
    postpackager: fis.plugin('seajsconfig',{
        keyStrFilter:['.js','app/script/'], //过滤sea-config.js map表上的key,支持字符串和数组格式
        valueStrFilter:'script/',   //过滤sea-config.js map表上的value,支持字符串和数组格式
        domain: 'http://qxw1098800039.my3w.com/test/wap'    // 发布结束后需要添加的domain
    })
})
```

```
fis.config.set('modules.postpackager', 'seajsconfig',{
    keyStrFilter:['.js','app/script/'], //过滤sea-config.js map表上的key,支持字符串和数组格式
    valueStrFilter:'script/',   //过滤sea-config.js map表上的value,支持字符串和数组格式
    domain: 'http://qxw1098800039.my3w.com/test/wap'    // 发布结束后需要添加的domain
});
```

> ps1:第一种调用方式是fis3的,第二种方式是原先fis2的,虽然两种语法目前都支持,但是还是建议用上面那种.而且新的调用方式还`支持命名空间`和`链式调用`哦

> ps2:所有参数都是选填的,请根据项目需要填写
