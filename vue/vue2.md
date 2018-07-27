#vue中set-cookie跨域配置

> 问题情景：在基于vue的项目，进行与后台数据接口对接时，出了登陆接口显示登陆成功外，其他接口均返回未登陆的信息
> 后询问得知，后台采用set-cookie的方式，进行登陆权限验证


简单的就是将首次登陆成功返回的response header中的set-cookie存到浏览器的cookie中，在后续对后台的请求中在request header上加上该cookie就行

但在用axios发送的请求中，set-cookie失效了，无法将响应头里面的set-cookie值存到浏览器中，导致也不能在后续的请求中加上该cookie

Google学习才知axios默认不让ajax请求头携带cookie，需要在main.js中设置如下：


```

import axios from 'axios';

axios.defaults.withCredentials = true;   //使得其可以携带cookie

Vue.prototype.$axios = axios;

```

<br>
>在浏览器中，在请求响应的响应头里面其实是有 set-cookie 的值的，因为这是***跨域set-cookie*** ，后台都需要些配置


1. header信息 Access-Control-Allow-Credentials:true

2.  Access-Control-Allow-Origin不可以为 '*'，
因为 '*' 会和 Access-Control-Allow-Credentials:true 冲突，需配置指定的地址

<br>


上述是使用axios情况下需要跨域设置cookie，而是使用ajax方式，需要的配置也是类似。

```

		response.setHeader("Access-Control-Allow-Origin", "*");

        response.setHeader("Access-Control-Allow-Methods", "*");

        response.setHeader("Access-Control-Max-Age", "3600");

        response.setHeader("Access-Control-Allow-Headers", "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,SessionToken");
		上述是处理跨域问题，后台的基本操作
```

```

		// 允许跨域请求中携带cookie

        response.setHeader("Access-Control-Allow-Credentials", "true");

```

前端则在ajax中加入
		withCredentials: true,    //这行代码即可





\#因为之前做项目时，对于后台的这些set-cookie操作，前端是不需要为他们存储、读取cookie值的，但这次用的是axios而不是很熟悉的ajax(其实也不是差别很大),还是有些坑，需要多百度，参照前人经验。

___
7/28/2018 3:19:18 AM 