    class Node {
        constructor(value, next) {
        this.value = value;
        this.next = next;
        }
    }
    

    function reverseList(head) {

        var queue = [];
        while(head.next){
            queue.push(head.value);
            head = head.next;
        }
        var rs = new Node(queue.shift(), null);
        var index = rs;
        while(queue.length){
            var node = new Node(queue.shift(), null);
            index.next = node;
            index = index.next;
        }
    }

// 创建节点
createElement();
createDocumentFragment();
createTextNode();

// 查找
getElementById();
getElementsByClassName();
getElementsByTagName();
getElementsByNmae();

// 添加节点
appendChild();

cloneChild();

removeChild();

insertBefor();

replaceChild();