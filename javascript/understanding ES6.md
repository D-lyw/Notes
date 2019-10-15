## 一、var let const

在es6之前只有全局作用域和函数作用域

es6开始添加了块级作用域(又称词法作用域)   用 { } 包裹 

### var 声明的变量存在变量提升(hosting)

### let 声明

+ 基本可以替代var声明变量
+ 将声明的变量作用域限制在当前代码块中
+ 禁止重复声明

### const 声明常量

+ 块级声明
+ 声明时初始化

### 暂时性死区

使用`let`或`const`声明的变量， 在到达声明处之前都是无法计算的， 试图访问会导致一个引用错误

### 循环内的let声明

循环输出

```javascript
var funcs = [];
for (var i = 0 ; i < 10; i++) {
    funcs.push(function() {console.log(i)})
}
funcs.forEach(function(func) {
    func();		// 输出数值 “10“ 十次
})
```

使用IIFE，在每次迭代时为变量创建副本

```JavaScript
var funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push((function(value) {
        return function() {
            console.log(value);
        }
    }(i)));
}
funcs.forEach(function(func) {
    func();		// 从 0 到 9 依次输出
})
```

使用let声明变量

```JavaScript
var funcs = [];
for (let i = 0; i < 10; i++) {
    funcs.push(function() {console.log(i)})
}
funcs.forEach(function(func) {
    func();		// 从　０　到　９　依次输出
})
```

>  需要重点了解的是: let 声明在循环内部的行为是在规范中特别定义的,而与不提升变量声明的特征没有必然联系。事实上,在早期的实现中并没有这种行为,它是后来才添加的

### 全局块级绑定

在全局作用域上，`let`和 `const`声明的变量不会被添加到全局作用域上

```javascript
// 在浏览器中
let RegExp = "Hello!";
console.log(RegExp); // "Hello!"
console.log(window.RegExp === RegExp); // false

const ncz = "Hi!";
console.log(ncz); // "Hi!"
console.log("ncz" in window); // false
```





## 二、字符串与正则表达式







## 三、函数



+ **带参数默认值的函数**

在特定参数未被传入时,函数的默认参数允许你更容易指定需要使用的值。而在 ES6 之前,
这要求在函数内使用一些额外代码,以便检查参数是已否提供并为其分配一个不同的值。

+ **剩余参数**

剩余参数允许你将余下的所有参数放入指定数组。使用真正的数组并让你指定哪些参数需要
被包含,使得剩余参数成为比arguments更为灵活的解决方案。

+ **扩展运算符**

扩展运算符是剩余参数的好伙伴,允许在调用函数时将数组解构为分离的参数。在 ES6 之
前,要把数组的元素作为独立参数传给函数只有两种办法:手动指定每一个参数,或者使用apply()
方法。有了扩展运算符,你就能轻易将数组传递给函数而无须担心该函数的this绑定。

+ **new.target**
+ **箭头函数**

ES6 函数的最大变化就是增加了箭头函数。箭头函数被设计用于替代匿名函数表达式,它拥
有更简洁的语法、词法级的this绑定,并且没有arguments对象。此外,箭头函数不能修改this
绑定,因此不能被用作构造器。

+ **尾递归优化**

尾调用优化允许某些函数的调用被优化,以保持更小的调用栈、使用更少的内存,并防止堆
栈溢出。当能进行安全优化时,它会由引擎自动应用。不过你可以考虑重写递归函数,以便
能够利用这种优化。



## 四、扩展的对象功能

