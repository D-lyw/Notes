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







## 四、