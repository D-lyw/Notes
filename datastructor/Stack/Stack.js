/**
 * @author D-lyw
 * @description js数据结构之栈
 */

/**
 * Stack constructor function
 */
function Stack(){
    var items = [];                     // Declar a js array to store data
    this.push = function(args){         // add arguements to stack top
        items.push(args);   
    }
    this.pop = function(){              // pop up stack top arguement
        return items.pop();
    }
    this.peek = function(){             // return stack top arguement
        return items[items.length - 1];
    }
    this.getIndex = function(index){    // return the index subscript value stack
        return items[index];
    }
    this.isEmpty = function () {        // Determine if the stack is empty 
        return items.length == 0 ? true : false;
    }
    this.clear = function(){            // clear the stack
        items = [];
    }
    this.size = function(){             // retrun the length of stack
        return items.length;
    }
    this.print = function () {          // print the complete stack data
        console.log(items.toString());
    }
}

// var test1 = new Stack();
// console.log(test1.isEmpty());
// test1.push(10);
// test1.push(232);
// console.log(test1.size());
// console.log(test1.peek());
// test1.push(101);
// console.log(test1.isEmpty());
// test1.pop();
// console.log(test1.size());
// console.log(test1.clear());
// console.log(test1.isEmpty());
module.exports = Stack;