# Promise 

> promise 本质是用来解决回调地狱问题

```js
var path = require('path');
var fs = require('fs');

function getFielByPath(path, succCb, errCb){
    fs.readFile(path, 'utf-8', (err, data) => {
        if( err ) {
            //return new Error();
            errCb(err);
        }
        succCb(data);
    })
}

<!-- 依次读取文件file1, file2, file3 --> // 回调地狱, 多层次的调用
getFileByPath(path.join(__dirname, './file1.txt'), (data) => {
    console.log(data);
    getFileByPath(path.join(__dirname, './file2.txt'), (data) => {
        console.log(data);
        getFileByPath(path.join(__dirname, './file3.txt'), (data) => {
            console.log(data);
        })
    })
})

```

+ Promise 是一个构造函数, 可以通过new Promise() 得到一个Promise的实例
+ 在Promiseh上有两个函数, 分别是 resolve (成功之后的回调函数) 和 reject (失败之后的回调函数)
+ 在Promise 构造函数的prototype 属性上有一个 .then() 方法, 也就会说 promise的实例都可以访问到 .then() 方法
+ Promise 表示一个异步o操作; 每当我们 new 一个 promise 实例, 这个实例表示一个具体的异步操作
+ 既然 Promise 创建的实例, 是一个异步操作, 那么这个异步操作的结果, 只有两个可能
    - 异步操作执行成功, 需要在内部调用 成功的回调函数 resolve , 把结果返回给调用者
    - 异步操作执行i失败, 在内部调用 失败的回调函数 reject, 把结果返回给调用者
    - 由于Promise 的实例, 是一个异步操作, 所以内部拿到操作的结果, 无法通过return方法 返回; 这时候,只能通过使用回调函数的形式, 来把成功或失败的结果, 返回给调用者
+ 通过调用实例上的 .then 方法, 预先为这个 Promise 异步操作, 指定成功和失败的回调函数



