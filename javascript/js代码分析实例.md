
### 区分　解构默认值　和　参数默认值

	function f6({ x = 10 } = {}, { y } = { y: 10 }) {
    	console.log( x, y );
    }
    
    f6();							// 10 10
    f6( undefined, undefined );	　// 10 10
    f6( {}, undefined ); 			// 10 10
    
    f6( {}, {} );					// 10 undefined
    f6( undefined, {} ); 			// 10 undefined
   
    f6( { x: 2 }, { y: 3 } ); 　　　　// 2 3
    
    



### js的hoisting 预解析

	var foo = {n:1};
    (function(foo){
    	console.log(foo.n);
        foo.n = 3;
        var foo = {n:2};
        console.log(foo.n);
    })(foo);
    console.log(foo.n);
    
1.进行预编译，var全局变量foo、匿名函数 function、var局部变量foo
2.代码自上而下、自左向右执行计算：
3.对全局变量foo进行赋值foo={n:1}；注意：此值为对象，属于引用类型；
4.匿名函数传入参数foo={n:1}自执行；
5.console.log(foo);打出数字1；
6.由于存在foo局部变量，那么对foo变量进行赋值foo={n:3}，同时更改了引用类型的参数值，全局foo变量被重新赋值foo={n:3}；
7.对局部变量foo进行重新赋值foo={n:2};
8.console.log(foo);打出数字2；
9.全局变量foo={n:3},因此，console.log(foo);打出数字3；

<br>



	function Foo(){
     var i=0;
     return function(){
         document.write(i++);
     }
	}
	var f1=Foo(),
	f2=Foo();
	f1();
	f1();
	f2();
    

1.当函数被创建时，内部[scope]属性被存储，在这个属性中保存一个包含全局变量对象的作用域链。
2.当函数被调用时，会创建一个执行环境及相应的作用域链，argument和实参为其进行初始化。
这里f1()函数和f2()函数在调用时会创建两个执行环境，保存各自的变量对象，结果是没有关系的。而同一个函数在多次调用时返回值会被保存在同一个变量对象中。

f1(),f2()分别创建了自己的执行环境，所以它们两个是相互独立的，执行之后都会返回一个匿名函数，这个匿名函数的作用域链被初始化为其包含函数的活动对象(这里也就是i)和全局变量对象，f1执行之后i并不会销毁，因为返回的匿名函数还要引用i，i仍然在内存中，所以执行两次之后i的值变成了1，而f2执行之后i为0