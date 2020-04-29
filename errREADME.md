### 开发构建时遇到的问题与解决方案

## Cannot find module 'webpack-cli/bin/config-yargs'(npm run dev报错)

``package.json``查看``webpack`` 和 ``webpack-dev-server``版本不兼容

**解决方法**
卸载局部或者全局 ``webpack-dev-server``
```js
npm uninstall webpack-dev-server -g       卸载全局
npm uninstall webpack-dev-server -D      卸载局部(本地) 
```
安装指定版本的 ``webpack-dev-server@2.9.7``
```js
npm i webpack-dev-server@2.9.7 -D    本地安装
```
执行 ``npm run dev`` 成功运行

> 不明白为什么会造成这样的bug，但是解决方法已经提出---学疏才浅，还请指正！

## vue代理踩坑
``config>index.js``中设置代理 代码如下
```js
 proxyTable:{
      '/devApi': {  //使用"/devApi"来代替"http://vue-admin.web-jshtml.cn/productapi" 
        target: 'http://vue-admin.web-jshtml.cn/productapi', //源地址 
        changeOrigin: true, //改变源 
        pathRewrite: { 
          //路径重写
          '^/devApi': '' 
          } 
      }
    },
```
查阅文档解释为：

我的 api=’/admin’

我的请求地址 ${api}/xxxx/xxx ，

请求地址就为 ‘/admin/xxxx/xxx’

当node服务器 遇到 以 ‘/admin’ 开头的请求，就会把 target 字段加上，那么我的请求地址就为 http://ar.he29.com/admin/xxxx/xxx

下面的 pathRewrite 表示的意思是 把/api 替换为 空，那么我的请求地址就为 http://ar.he29.com/xxxx/xxx（用在如果你的实际请求地址没有 api 的情况）

### 疑问
- 如果我把路径重写里的内容写为``‘^/devApi’:‘/ccc’``这个时候我发送请求 
- 请求地址里``'/devApi'``并没有重写为``'/ccc'``

