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