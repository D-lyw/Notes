#Vue之Content-type类型

>与后台交互，后台要求的类型为	**application/x-www-form-urlencoded** 而axios默认的请求头类型为**applicatino/json** 自然是后台解析错误，浏览器报错。需要改变请求头类型，如下记录四种；


1. 开启emulateJSON参数，设置{ emulateJSON = true； }

	 	this.$http.delete(url, {emulateJSON: true})
                    .then((response) => {
                        ...
                    })
                    .catch((response) => {
                        ...
                    });


2. 快捷设置方式

     	Vue.http.options.emulateJSON = true;

3. 在axios的请求中设置请求头类型 

		
		 header: {
			'Content-Type': 'application/x-www-form-urlencoded'
			}
		
4. 全局配置默认请求头类型

		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



<br>
>但如何将要传给后台的数据拼接成 urlcoded 的形式，供后台识别

1. 个人较喜欢qs库对数据进行编码
		
		var qs = require('qs');

		axios.post('/test', qs.stringify({'id':123,'name':'李四'}))

2. 在node.js中可使用querystring模块

		var querystring = require('querystring');

		axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });

3. 在浏览器中，您可以使用URLSearchParams API，例子如下：
		
		var params = new URLSearchParams();

		params.append('param1', 'value1');
		params.append('param2', 'value2');

		axios.post('/foo', params);


---
7/28/2018 4:08:46 AM 