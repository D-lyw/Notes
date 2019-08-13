# JS知识速记

## js 基本数据类型

Undefied, Null, Boolean, Number, String

## js 常见内置对象

数据封装类对象：　Object, Array, Bollean, Number, String

其他对象：　Function, Arguments, Math, Date, RegExp, Error.

## call() 和apply()的区别

apply函数有两个参数: 第一个参数是上下文, 第二个参数是参数组成的数组.如果上下文是null, 则使用全居对西像代替

如: function.apply(this, [1, 2, 3]);

call 参数的第一个参数是上下文, 后序是实例传入的参数列表.

如: function.call(this, 1, 2, 3);

## js获取用户代理(user Agent)

    function whatBroser(){
        document.Browser.Name.value = navigator.appName; // 浏览器名称
        document.Browser.Version.value = navigator.appversion;    //版本号
        document.Browser.appCondeName.value = navigator.appcodeName;   //代码名称
        document.Browser.userAgent.value = navigator.userAgent;        //用户代理标识
    }

## JSON

JSON(jcriptava OBject Notation)是一种轻量级的数据交换格式.,它是基于Javascript的一个子集,数据格式简单,易于读写,占用带宽小.

格式采用键值对,如:{ "age": "12","name":"dlyw"}

## new操作符 操作流程

1. 创建一个空对象,并且this变量引用改对象,同时还继承了该函数的原型.

2. 属性和方法被加到this引用的对象中.

3. 新创建的对象有this所引用, 并且最后隐士的返回this.

## null和undefined的区别

null时一个表示"无"的对象,转为数值时为0;
Number(null)     // 0

undefined是一个表示"无"的原始值,转为数值时为NAN
Number(undefined)     // NAN

undefined:

- 变量被声明了,但没有赋值时,就等于 undefined.
- 调用函数时,应该提供的参数,没有提供,该参数等于undefined
- 对象没有赋值的属性,该属性为undefined.
- 函数灭有返回值时,默认返回undefined.

null:

- 作为函数的参数,表示该函数的参数不是对象
- 作为对象原型链的终点

相关链接:

- 阮一峰:null & undefined 历史原因:

    http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html

## eval　是做什么的？

它的功能是把对应的字符串解析成ｊｓ代码并运行．
应该避免使用ｅｖａｌ，　不安全，　非常耗性能（２次，一次解析成ｊｓ语句，一次执行）
有JSON字符串转换为ＪＳＯＮ对象的时候可以用ｅｖａｌ，　var obj = eval('('+str+')').

## this对象的理解

this　总是指向函数的直接调用者（而非间接调用者）；

如果有ｎｅｗ关键字, this指向new出来的那个对象；

在事件中，this指向触发这个事件的对象，特殊的时，ＩＥ中的attachEvent中的this总是指向全局对象window.

