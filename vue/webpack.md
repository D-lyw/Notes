# webpack


### webpack 模块打包原理

为什么webpack打包u之后的文件,可以直接放在浏览器中执行, 为什么webpack可以支持各种ES6最新语法, 为什么webpack 可以书写ES6 模块, 也支持 require 的Common.js 模块?

+ webpack 根据 webpack.config.js中的入口文件, 在入口文件里识别模块依赖, 不管这里的模块依赖是ES6 module来写, 还是用Common.js 写的, webpack会自动分析, 并通过转换, 编译代码, 打包生成最终的文件. `最终文件中的模块实现是基于webpack自己实现的 webpack_require (es5代码)`

+ 从webpack2开始, 已经内置了对ES6, CommonJs, AMD模块化语句的支持. 但不包括新的ES6语法转为ES5代码, 这部分工作还是留给babel及其插件

+ 在webpack中可以同时使用ES6模块和CommonJs模块. 因为 module.exports 很想 export default, 所以ES6模块可以很方便的兼容CommonJS:  import XXX from 'commonjs-module'. 反过来Commonjs兼容Es6模块, 需要额外加上default: requiem('es-module').default



### 如何在webpack中使用vue

1. 安装vue的包: npm ｉ vue -S
2. 在webapck中推荐使用.vue这个组件模板文件, 所以需要安装能够解析这种的Loader: `npm i vue-loader vue-template-complier -D`
3. 在main.js中引入 vue 模块: `import Vue from 'vue'`
4. 定义一个 .vue结尾的组件, 其中组件由三部分组成 <template></template> <script></script> <style></style>
5. 导入该组件: `import login from './login'`
6. 创建 vm 的实例 var vm = new Vue({ el: '#app', render: c => c(login)})
7. 在页面中创建一个id为app的元素, 作为我们 vue实例要控制的元素


### 如何在webpack中使用vue-router

1. 导入 vue-router 包:  `import VueRouter from 'vue-router'` 
2. 手动安装 VueRouter:  `Vue.use(VueRouter)`
3. 创建一个路由对象: 
``` js
    var router = new VueRouter({
        routes: [
            {path: '/login', complate: 'Login'},
            {path: '/register', complate: 'Register'}
            ....
        ]
    })
```
4. 将路由挂载到vue实例上
```js
    var vm = new Vue({
        el: '#app',
        render: c => c(app),
        router  
    })
```