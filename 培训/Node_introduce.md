#node.js入门教程#

###1. nodejs和npm的安装###

可从[Node.js](https://nodejs.org/en/download/)官网,下载对应平台的nodejs版本进行安装，(window系统，可勾选Add to Path 添加到环境变量中）

在命令行界面输入以下两个命令，检验是否安装成功：

		# node -v		//查看node版本
		# npm -v		//查看npm版本


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

###2. 体验一下
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
