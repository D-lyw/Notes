# node.js入门教程

1. [nodejs和npm的安装](#one)
2. [体验一下](#two)
3. [Hello World 之 Node.js](#three)
4. [基础之Npm使用](#foru)
5. [Node之模块](#five)
6. [熟悉常用的内置模块](#six)
7. [express框架](#seven)




### 1. <span id = 'one'>nodejs和npm的安装</span>

可从[Node.js](https://nodejs.org/en/download/)官网,下载对应平台的nodejs版本进行安装，(window系统，可勾选Add to Path 添加到环境变量中）

在命令行界面输入以下两个命令，检验是否安装成功：

	# node -v		//查看node版本
	# npm -v		//查看npm版本


linux安装（官网下载源码或已编译的二进制文件进行安装）

	wget https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz
	wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz

安装较window不同，但也不难，自行百度。



<br>

> **node.js是什么？**

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.（基于谷歌v8引擎的js运行环境）

我们之前写的JavaScript都是在浏览器上执行的，用的是浏览器中的JavaScript引擎，而node自带了JavaScript的执行环境，这就让js可以在浏览器以外的地方执行，可以在服务器端执行


Node.js还提供了各种丰富的JavaScript模块库（自带的+第三方提供），它极大简化了使用Node.js来扩展Web应用程序的开发。

Node.js = 运行环境+ JavaScript库（模块）

<br>

> **npm是啥？**

npm其实是Node.js的包管理工具（package manager）

+ 通过这个集中的包管理工具，方便直接下载引用别人已经发表的模块
+ 自动帮你解决你引用的模块的依赖关系（如：你引用的模块，若引用了其他的模块，你就需要把它依赖的模块也下下来）

\#注：各类大同小异的包管理工具，基本都是起上述两点作用，帮助开发者提高开发效率

<br>

### 2. <span id='two'>体验一下</span>
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

### 3. <span id ='three'>Hello World 之 Node.js</span> 

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

### 4.<span id="four">基础之Npm使用</four>
掌握npm常用命令
- npm 升级命令
 
		npm install npm -g 					// -g 指全局安装，下同

- npm 安装模块

		npm install <Moudle Name>				//Moudle Name指模块名
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


### 5. <span id="five">Node之模块</span>

> 在一个项目中随着项目的开发，一个文件里面的代码可能越来越多，越长，不宜与维护；
> 为了编写便于可维护、优雅的代码，我们将其分组，分别放到不同文件中，好多编程语言都采用这种方式
> 在node.js 这样的js文件成为一个模块
> 好处：
>  + 便于维护
>  + 代码重用，可以引用和被引用其他模块 （在nodejs，我们经常引用内置模块和第三方发布的模块，十分方便）
>  + 使用模块，可以避免函数名和变量名的冲突

来个栗子： 我们创建一个testA.js 文件，并写下如下代码，这即是一个模块，模块名为testA（去掉.js)

	var age = 42;
	function showAge(){
		console.log("My age is " + (age - 18));
	}

	module.exports = showAge;

我们在testA模块里面声明了一个showAge函数，并且通过module.exports 语句将该函数给暴露出来，我们通过引入该模块，就可以使用showAge函数方法了

我们再写一个app.js文件，引入该模块并使用

	var showAge = require('./testA');			//引入testA模块
	
	showAge()  		// 执行showAge()函数  输入 My age is 24

变量showAge 存储的是 testA模块中导出的showAge() 函数， 然后我们就可以在app.js中使用testA模块中的showAge方法了

在引用时注意引用的路径，上面两个文件是在同一目录下，所以用的相对路径

如果是通过 *require('testA')* 的方式引用

则node 会依次在内置模块、全局模块（即node_modules文件夹）下查找testA文件，如果查找不到，就会报错！

这种模块加载机制被称为***CommonJS规范***

一个模块想要对外暴露变量（可以是变量，函数，数组，对象等），可以用 **module.exports = variable **;，
一个模块要引用其他模块暴露的变量，用 **var ref = require('module_name')**;就拿到了引用模块的变量。

\# 篇幅有限，如想进一步了解Commonjs规范，可学习https://www.cnblogs.com/chenweixuan/p/4713710.html



### 6. <span id = 'six'>熟悉常用的内置模块</span>

>常用的模块有fs模块（文件读写），os模块（提供基本的系统操作）， path模块（处理、转化文件路径），crypto模块（提供通用的加密和哈希算法）等等，都可以实际操作尝试一下


https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501482448f6b36071ab6949d3a7ecb5a71a3c9df9000

可跟着其中教程的指导，对这些模块进行快速了解


### 7. <span id='seven'>express框架</span> <重点> 
网上教程很多，不重复累赘了，送你去https://www.runoob.com/nodejs/nodejs-express-framework.html

跟着菜鸟上的教程跑一遍, 理解一下，尝试着做点东西。

更全面的内容，可在文档中查看https://www.runoob.com/w3cnote/express-4-x-api.html， 也可直接去官网。


>  *** 注：***新手初期的话，可以看网上的各类好些的教程，基本懂了之后，去github上翻翻好的相关的代码，参考一下，不用难度太大的那种； 后面就好好看一下《深入浅出Node.js》，然后你就。。。
