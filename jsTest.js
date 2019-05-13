/**
 * @description 实现LazyMan类
 * @example 
 *      LazyMan('Tony');
        // Hi I am Tony

        LazyMan('Tony').sleep(10).eat('lunch');
        // Hi I am Tony
        // 等待了10秒...
        // I am eating lunch

        LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
        // Hi I am Tony
        // I am eating lunch
        // 等待了10秒...
        // I am eating diner

        LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
        // Hi I am Tony
        // 等待了5秒...
        // I am eating lunch
        // I am eating dinner
        // 等待了10秒...
        // I am eating junk food
 *  实现思路：
        先将每一个调用需要执行的内容写到一个函数中，根据函数的不同，决定存储在数组中的位置不同，　
        最后调用this.next(), 依次执行数组中存储的函数．　
 */
class LazyManClass{
    constructor(name){
        this.name = name;
        this.taskList = [];
        console.log(`Hi i am ${name}`);

        setTimeout(() => {      
            this.next();        // 此时，各函数已在数组中存储好，　依次调用；
        }, 0);
    }

    eat (food) {
        const fn = () => {
            console.log(`I am eating ${food}`);
            this.next();
        }
        this.taskList.push(fn);
        return this;
    }

    sleep (time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒...`);
                this.next();
            }, time * 1000)
        }
        this.taskList.push(fn);
        return this;
    }

    sleepFirst (time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}秒`);
                this.next();
            }, time * 1000);
        }
        this.taskList.unshift(fn);
        return this;
    }

    next () {
        var fn = this.taskList.shift();
        fn && fn();
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}

LazyMan("Test");
//LazyMan("Tom").eat("apples").sleep(2).show();
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2).sleep(5).eat('junk food').sleepFirst(3);


function myFlatted(arr){
    var res = [];
    arr.map((item) => {
        if(Array.isArray(item)){
            res.push(...myFlatted(item));
        }else{
            res.push(item);
        }
    })
    return res;
}