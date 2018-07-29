# node.js入门教程

### 1. nodejs和npm的安装

可从[Node.js](https://nodejs.org/en/download/)官网,下载对应平台的nodejs版本进行安装，(window系统，可勾选Add to Path 添加到环境变量中）

在命令行界面输入以下两个命令，检验是否安装成功：

	# node -v		//查看node版本
	# npm -v		//查看npm版本


linux安装（官网下载源码或已编译的二进制文件进行安装）

	wget https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz
	wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz

安装较window不同，但也不难，自行百度。



<br>

>node.js是什么？

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

我们之前写的JavaScript都是在浏览器上执行的，用的是浏览器中的JavaScript引擎，而node自带了JavaScript的执行环境，这就让js可以在浏览器以外的地方执行，可以在服务器端执行


Node.js还提供了各种丰富的JavaScript模块库（自带的+第三方提供），它极大简化了使用Node.js来扩展Web应用程序的开发。

Node.js = 运行环境+ JavaScript库（模块）

<br>

>npm是啥？

npm其实是Node.js的包管理工具（package manager）

+ 通过这个集中的包管理工具，方便直接下载引用别人已经发表的模块
+ 自动帮你解决你引用的模块的依赖关系（如：你引用的模块，若引用了其他的模块，你就需要把它依赖的模块也下下来）

\#注：各类大同小异的包管理工具，基本都是起上述两点作用，帮助开发者提高开发效率

<br>

### 2. 体验一下
***Node的交互模式***  我们输入js代码可立即执行

		C：\User\D-lyw>node
		>
		
例如：在该环境下，输入以下，回车：

		> 5*9 - 40
		5
可以看到输出的结果 5

如果我们将js代码写在.js文件中，我们使用命令    *node 文件.js*
创建test.js文件，写入代码

		var name = '张三';
		console.log('Your name is ' + name);

执行 node test.js ,    输出结果					

		C：\User\D-lyw\node test.js	 //注意你创建的test.js文件的位置，不然node命令会找不到该文件
		Your name is 张三

### 3. Hello World 之 Node.js 

创建node.js 应用

+ 步骤一： 导入所需模块

	使用require指令加载http模块 ，并用变量http 存储
	
		var http = require('http')
+ 步骤二： 接下来，使用http模块中的createServer() 方法创建**服务器实例**，使用服务器实例的监听方法，	将其绑定到某一接口，并为其编写请求和相应函数；

		var http = require('http');

		http.createServer(function (request, response) {

    	// 发送 HTTP 头部 
    	// 内容类型: text/plain
    	response.writeHead(200, {'Content-Type': 'text/plain'});

    	// 发送响应数据 "Hello World"
   	 	response.end('Hello World\n');
		}).listen(8080);

		// 终端打印如下信息
		console.log('Server running at localhost:8080!');

上述代码就已经帮我们创建了一个简单服务器

+ 步骤三： 通过node 命令执行该js文件，如
		
		node main.js
		Server running at localhost:8080!

而在浏览器输入localhost：8080，就可以看到我们返回的Hello World.

### 4.基础之Npm使用
掌握npm常用命令
- npm 升级命令
 
		npm install npm -g 					// -g 指全局安装，下同

- npm 安装模块

		npm install <Moudle Name>			//Moudle Name指模块名
		例 安装常用web框架 express：
		npm install express 

- npm 查看安装信息

		npm list -g      					//查看全局安装的模块

- npm 卸载模块

		npm uninstall <Moudle Name>

- npm 更新模块

		npm update <Moudle Name>

- npm 查看某个模块的版本号

		npm list grunt

- npm 搜索模块

 		npm search <Moudle Name>

- npm help 可通过npm help 查看所有命令

通过npm安装的模块都在项目中的node_modules文件夹中，是全局安装的则在全局的node_modules文件夹中，widow系统中全局的node_modules一般在系统盘 用户文件夹下，如：C:\Users\D-lyw 里面

*使用淘宝镜像*：

	国内使用npm进行安装，下载有时比较缓慢，淘宝镜像与官方版本每十分钟同步，推荐使用淘宝镜像进行下载
	# npm install -g cnpm --registry=https://registry.npm.taobao.org
	
	这样就可以用cnpm 来代替 npm 进行下载
	# cnpm install <Moudle Name>