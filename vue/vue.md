##Vue中axios记录

1. 在axios中不支持vue.use()方法，为了避免在每个组件中引入axios，可以用下面原型链的方式
	
	>1. // 在main.js中执行如下代码
	>2. import axios from 'axios';
	>3. Vue.prototype.$axios = axios;
	>4. // 则在其他vue组件中就可以通过 this.$axios 使用

<br>
2. 前后端接口对接时的跨域问题，项目采用前后端分离的方式，前端的代码在本地，后台接口给的是远程服务器的地址；

	之前会的都是用ajax方式交互时解决跨域问题的方法，用在这上面好想行不通，百度一下，解决！做个记录

```
	*在项目中的config/index.js中配置一下proxyTable就行*

	1. dev : {
	2. //加入以下代码
	3.       proxyTable: {
	4.       '/api': {
	5.        target: 'http://87.102.45.199:8800/', //自己的域名，端口号
	6.        changeOrigin: true,
	7.        pathRewrite: {
	8.       '^/api': '/'  //这里指用/api 来代替 target里面的地址，后面的组件接口url地址，可以用api代替 eg：http://87.102.45.199:8800/show/102 ==》 /api/show/102
	9.  } }
	10. }

```
---
7/27/2018 9:19:55 PM 




				

