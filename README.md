## material-ui-mobile 是一个基于Material Design的React移动组件库
[![NPM](https://nodei.co/npm/alanui-mobile.png)](https://nodei.co/npm/alanui-mobile/)

### 丰富强大的组件

一共拥有50多个组件，已为你需要在项目中使用的很多功能性组件做好准备。

[详细介绍](https://alanui-mobile.netlify.com)
![](http://dada-image-bed.oss-cn-shenzhen.aliyuncs.com/18-12-11/47345666.jpg)
### 快速上手

**npm**

推荐使用npm的方式安装，它能更好地和 webpack 打包工具配合使用。
```
npm install alanui-mobile
```
在 `index.html`里引用样式
```
<link rel="stylesheet" href="https://unpkg.com/alanui-mobile/dist/alanui-mobile.min.css">
```
图标依赖`Material Icon`
```
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
```
**开始使用**
```
import React from 'react';
import {Button} from 'alanui-mobile';

const App = () => (
   <Button theme="primary">
             Hello World
   </Button>
);
```
