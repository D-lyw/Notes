/**
 * @author D-lyw
 * @description 循环队列 --  击鼓传花
 */

var Queue = require('./Queue');

// 击鼓传花
function hotPotato(nameList, num){
    var queue = new Queue();
    for(var i = 0; i < nameList.length; i++){
        queue.enqueue(nameList[i]);
    }

    while(queue.size() > 1){
        for(var i = 0; i < num; i++){
            queue.enqueue(queue.dequeue());                 // 实现循环队列
        }
        console.log(queue.dequeue() + " 在击鼓传花中被淘汰！");
    }
    return queue.dequeue();
}

var names = ['John','Jack','Camila','Ingrid','Carl'];
var winner = hotPotato(names, 5);
console.log("winner: " + winner);