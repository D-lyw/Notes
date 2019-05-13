# 前端模块化: ES6, CommonJS, AMD 和CMD



## 一, CommonJS

Node.js 是CommonJS规范的主要实践者, 它有四个重要的环境变量为模块化做支持: `module`,  `exports`, `require`, `global`. 实际使用时, 用module.exports 定义模块对外输出的借口, 用require加载模块

CommonJS 同步的方式加载模块, 在服务端, 模块文件都在本地磁盘, 读取非常快, 所以同步读取不会有问题. 但在浏览器端, 限于网络原因, 更合理的方案是使用异步加载。

```js
// 定义模块math.js
var basicNum = 0;
function add(a, b) {
    return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
    add: add,
    basicNum: basicNum
}

var math = require('./math');
math.add(2, 5);

```

## AMD 和 require.js


AMD规范采用 `异步方式加载模块`，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

**依赖前置, 提前执行**
require.js在申明依赖的模块时会在第一之间加载并执行模块内的代码：

require.js 是实现 AMD 规范的模块化的例子

```js

// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});
```

## CMD 和 sea.js

CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇**依赖就近、延迟执行**。此规范其实是在sea.js推广过程中产生的。

```js
/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});

```

## ES6 module

ES6在语言标准的层面实现了模块功能, 而且实现的相当简单, 旨在成为浏览器和服务端通用的模块解决方案. 其模块功能主要由两个命令构成:｀export`, `import`; export用于规定模块的对外接口, import命令用于输入其他模块提供的功能.

```js

<!-- 定义模块 math.js -->
var basicNum = 0;
var add = function(a, b){
    return a + b;
}

export { basicNum , add}

<!-- 引用模块 -->
import { basicNum, add } from "./math";
function test(ele){
    ele.textContent = add(99, basicNum);
}

``` 

如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名。其实ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。这也更趋近于ADM的引用写法。

*ES6的模块不是对象*，import命令会被 JavaScript 引擎静态分析，**在编译时就引入模块代码**，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能


## ES6 和 CommonJs 的区别

1. CommonJS 模块输出的是一个值的拷贝, ES6模块输出的是值的引用
    - CommonJS 模块输出的是值的拷贝, ei也就是说, 一旦输出一个值, 模块内部的变化就影响不到这个i值.
    - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此, ES6模块是动态引用, 并且不会缓存值, 模块里面的变量绑定在其所在模块.

2. CommonJS 模块是运行时加载, ES6 module 是编译时输出接口
    - 运行时加载: CommonJS 模块就是对象, 即在输入时是先加载一个模块, 生成一个对象, 然后后这个 对象上读取方法, 这种加载是"运行时加载"
    - 编译时加载: ES6模块不是对象, 而是通过export命令显示指定输出代码,import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。