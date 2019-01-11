/**
 * @author D-lyw
 * @description Priority queue 优先队列
 */

function PriorityQueue(){
    var items = [];

    function QueueELement(element, priority){
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element, priority){
        var queueELment = new QueueELement(element, priority);

        if(this.isEmpty()){
            items.push(queueELment);
        }else{
            var isAdd = false;
            for(var i = 0; i < items.length; i++){
                if(queueELment.priority > items[i].priority){
                    items.splice(i, 0, queueELment);
                    isAdd = true;
                    break;
                }
            }
            if(!isAdd){
                items.push(queueELment);
            }
        }
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
        for(var i = 0; i < items.length; i++){
            console.log(items[i].element + items[i].priority);
        }
    }
}

var pqueue = new PriorityQueue();
pqueue.enqueue("aaa", 12);
pqueue.print();
pqueue.enqueue("bbb", 11);
pqueue.enqueue('ccc', 1000);
pqueue.print();