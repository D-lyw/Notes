/**
 * @author D-lyw
 * @description Learn Queue (FIFO)
 */


/**
 * Queue constaruct function
 */
function Queue(){
    var items = [];                     // create array to store data
    this.enqueue = function(args){      // add a data to queue tail
        items.push(args);
    }
    this.dequeue = function(){          // pop and return queue head data
        return items.shift();
    }
    this.front = function(){            // return queue head data
        return items[0];
    }
    this.isEmpty = function(){          // determine if the queue is empty
        return items.length == 0 ? true : false;
    }
    this.size = function(){             // return the length of queue
        return items.length;
    }
    this.clear = function(){            // clear the queue
        items = [];
    }
    this.print = function(){
        console.log(items.toString());
    }
}

// just use it

// var queue = new Queue();
// console.log(queue.isEmpty());

// queue.enqueue("abc");
// queue.enqueue("dsfa");
// console.log(queue.size());

// console.log(queue.dequeue());
// console.log(queue.isEmpty());

// queue.enqueue("dsafdsafdsfds");
// queue.print();


module.exports = Queue;