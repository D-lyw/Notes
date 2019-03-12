// 定义三个装填 pending, fulfilled, reject

const PENDING = 0;
const FULFILLED = 1;
const REJECT = 2;

// 实现Promise
function PromiseA(){
    var status = PENDING;           // 存储状态值
    var value = null;               // 存储成功或失败时返回的值
    var handlers = [];              // 存储成功或失败后的处理函数， 通过调用‘.done’ 或 '.then'f方法


    // 成功时的状态转变
    function fulfill(result){
        status = FULFILLED;
        value = result;
        handlers.forEach(handler);
        handlers = null;
    }

    // 失败时的状态转变
    function reject(err){
        status = REJECT;
        value = err;
        handlers.forEach(handler);
    }
    
    // resolve 方法接受两种参数， 一种是普通的值/对戏， 另一种为Promise对象
    function resolve(result){
        try{
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject);
                return ;
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    // getThen 检测如果value是一个promise对象， 则返回then方法等待执行完成
    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }

    // 异常参数检测函数， 确保onFulfilled 和 onRejected两个函数中只执行且只执行一个，但是不保证异步；
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(
                function(value) {
                    if (done) return;
                    done = true;
                    onFulfilled(value);
                },
                function(reason) {
                    if (done) return;
                    done = true;
                    onRejected(reason);
                }
            );
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }

    doResolve(fn, resolve, reject);

    // 不同状态，进行不同的处理
    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (status === FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (status === REJECT && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

    this.done = function (onFulfilled, onRejected) {
        // 保证异步
        setTimeout(function () {
            handle({onFulfilled: onFulfilled, onRejected: onRejected});
        }, 0);
    }

    this.then = function(onFulfilled, onRejected) {
        var self = this;
        return new PromiseA(function (resolve, reject) {
            self.done(
                function (result) {
                    if (typeof onFulfilled === 'function') {
                        try {
                            // onFulfilled 方法要有返回值
                            return resolve(onFulfilled(result));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return resolve(result);
                    }
                },
                function (err) {
                    if (typeof onRejected === 'function') {
                        try {
                            return resolve(onRejected(err));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return reject(err);
                    }
                });
        });
    }

    this.catch = function(errorHandle) {
        return this.then(null, errorHandle);
    }
}