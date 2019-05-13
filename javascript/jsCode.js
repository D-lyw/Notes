function sum(item) {
    var total = item;
    var innerFn = function(nextItem) {
        //return nextItem == undefined ? total : (total += nextItem, innerFn);
        if (nextItem == undefined) {
            return total;
        } else {
            total += nextItem;
            return innerFn;
        }
    }
    return item == undefined ? total : innerFn;
}

console.log(sum(1)(2)(3)());
console.log(sum());
console.log(sum(10)());
console.log(`-------------------------`);

function sum2(item) {
    var total = item;
    
    var innerFn = function(nextItem) {
        if(nextItem) total += nextItem;
        return innerFn;
    }
    innerFn.toString = function(){
        return total;
    }
    return innerFn;
}

sum2(5)(2);
console.log(sum2(1)(2)(3)(4)(5).toString());
// console.log(sum2(5)(7));

console.log(`-------------------------------`);


function sum3(...item) {
    var total = 0;
    total = item.reduce((pre, cur) => {
        return pre + cur;
    })
    var innerFn = function (...nextItem) {
        if(nextItem.length > 0){
            total += nextItem.reduce((pre, cur) => {
                return pre + cur;
            })
        }
        return innerFn;
    }
    innerFn.valueOf = function(){
        console.log("test valueOf...");
        return total;
    }
    innerFn.toString = function(){
        console.log("test toString...");
        return total;
    }
    innerFn[Symbol.toPrimitive] = function(){
        console.log("test toPrimitive...");
        return total;
    }
    return innerFn;
}
console.log(sum3(1, 3, 5)(2)(4, 10) - 4);

console.log(sum3(2,3)(4));