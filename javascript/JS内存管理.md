# JS内存管理

不论什么语言， 内存的生命周期大体一致

`Allocate Memory`  ->  `Use Memory`  ->  `Release Memory`

+ 分配所需要的内存
+ 使用分配到的内存（读、写）
+ 不再需要时将其释放、归还



有的语言提供了专门管理内存的接口或函数，如C语言中的`malloc()`和`free()`。但在JS中，自动分配内存，在不需要的时候自动释放。JS的这种“自动”的内存回收机制，让开发人员开发中很能关注到内存回收的问题，而在某些情形下，很可能出现内存泄露的问题。

**内存泄露**：指不再需要的内存，由于某种原因，无法被释放回收



## 一、JS中的内存回收算法

### 1. 引用计数垃圾回收

#### 引用

引用计数算法主要使用引用的概念。在内存管理环境中，一个对象如果有访问另一个对象的权限（隐式或者显式），叫做一个对象引用另一个对象。例如：一个JavaScript对象具有对它原型的引用（隐式引用）和对它属性的引用（显式引用）。

此算法将该对象是否需要回收简化定义为*该对象有没有被其他对象引用*, 如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收

#### 限制：循环引用

两个对象被创建之后相互引用，就造成了循环引用。它们被调用之后，由于引用计数算法考虑到它们互相至少一次引用，所以它们不会被回收，从而造成了内存泄露。如下所示例子，在函数执行完，离开函数作用域时，按理需要回收函数作用域里面所有局部变量，但因为相互引用，两个对象将不会被回收。

```JavaScript
function freeMemory () {
    const obj1 = {}
    const obj2 = {}
    obj1.o = obj2
    obj2.o = obj1	// 相互引用
}
```



IE6、7使用引用计数方式对DOM对象进行垃圾回收，该方式常常造成对象这循环引用时发生内存泄露。现代浏览器通常使用标记-清除内存回收算法来解决这一问题。



### 2. 标记-清除算法

> 进一步学习阅读相关资料，深入理解   【20200724】

该算法把 *对象是否不再需要* 简化定义为 *对象是否可以获得*。

这个算法假定设置一个叫根root的对象（在JavaScript中，根是全局对象），定期的，垃圾回收器将从根开始，找到所有从根开始引用的对象，然后找到这些对象引用的对象，从根开始，垃圾回收器将找到所有可以获得的对象和所有不能获得的对象。

从2012年起，所有现代浏览器都使用标记-清除内存回收算法。所有对JavaScript垃圾回收算法的改进都是基于标记-清除算法的改进。

![标记-清除算法动画演示](/home/dlyw/D-lyw/Notes/img/JS内存管理/mark&free.gif)





## 二、内存泄露的常见场景

### 1. 全局变量

```JavaScript
function foo(arg) {
    var1 = "some string"
    this.var2 = "some thing"
}
```

在JS中处理未被声明的变量，上述例子中的bar，会被定义到全局对象上，在浏览器上就是`window`对象。在页面中的全局变量，只有当页面被关闭后才会被销毁。当二行的情况中this会指向全局变量`window`，意外的创建了全局变量



### 2. 未销毁的定时器和回调函数

```JavaScript
const serverData = loadData()
setInterval(function() {
    	const render = document.getElementById('renader')
        if (render) {
            render.innerHTML = JSON.stringigy(serverData)
        }
}, 2000)
```

如果后期该render元素被移除，整个定时器依旧运行，但没有任何实际效果。如果没有回收定时器，定时器无法被内存回收，定时器函数中的依赖也无法回收，在这个案例中的`serverData`也无法被回收。



### 3. JS闭包





### 4. DOM引用

很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中。

```JavaScript
var elements = {
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    document.body.removeChild(document.getElementById('image'));
    // 这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.
}
```

上述案例中, 即使我们对于 image 元素进行了移除, 但是仍然有对 image 元素的引用, 依然无法对其进行内存回收.

另外需要注意的一个点是, 对于一个 Dom 树的叶子节点的引用. 举个例子: 如果我们引用了一个表格中的td元素, 一旦在 Dom 中删除了整个表格, 我们直观的觉得内存回收应该回收除了被引用的 td外的其他元素. 但是事实上, 这个td 元素是整个表格的一个子元素, 并保留对于其父元素的引用. 这就会导致对于整个表格, 都无法进行内存回收. 所以我们要小心处理对于 Dom 元素的引用.





## 三、总结

JS 这类高级语言，隐藏了内存管理功能。但无论开发人员是否注意，内存管理都在那，所有编程语言最终要与操作系统打交道，在内存大小固定的硬件上工作。不幸的是，即使不考虑垃圾回收对性能的影响，2017 年最新的垃圾回收算法，也无法智能回收所有极端的情况。

唯有程序员自己才知道何时进行垃圾回收，而 JS 由于没有暴露显示内存管理接口，导致触发垃圾回收的代码看起来像“垃圾”，或者优化垃圾回收的代码段看起来不优雅、甚至不可读。

所以在 JS 这类高级语言中，有必要掌握基础内存分配原理，在对内存敏感的场景，比如 nodejs 代码做严格检查与优化。谨慎使用 dom 操作、主动删除没有业务意义的变量、避免提前优化、过度优化，在保证代码可读性的前提下，利用性能监控工具，通过调用栈定位问题代码。



**即便在 JS 中, 我们很少去直接去做内存管理. 但是我们在写代码的时候, 也要有内存管理的意识, 谨慎的处理可能会造成内存泄露的场景.**



## 四、相关链接

+ [How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)

+ [MDN 的内存管理介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

+ [An interesting kind of JavaScript memory leak](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)

  