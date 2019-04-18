/**
 * @author D-lyw
 * @description Linked list
 */

function LinkedList(){
    var Node = function (element) {
        this.element = element;
        this.next = null;
    }

    var length = 0; 
    var head = null;
    // 在链表末尾插入元素
    this.append = function (element) {
        var node = new Node(element);
        var current;
        if(head == null){                       // 列表中第一个节点
            head = node;
        }else{
            current = head;
            while(current.next){                // 循环列表， 直到找到最后一项
                current = current.next;
            }
            current.next = node;
        }
        length++;                               // 找到最后一项， 将其next赋为node， 建立链接
    }
    // 在任意位置插入一个元素
    this.insert = function(position, element){
        
        if(position < 0 || position > length){
            return false;
        }

        var node = new Node(element);
        var current = head;
        var index = 0, privious;

        if(position == 0){
            node.next = head;
            head = node;
        }else{
            while(index++ < position){
                privious = current;
                current = current.next;
            }
            node.next = current;
            privious.next = node;
        }
        length++;
        return true;
    }
    // 移除指定位置的元素
    this.removeAt = function(position){
        // 检查是否越界
        if(position > -1 && position < length){
            var current = head;
            var previous, index =0;

            if(position == 0){
                head = current.next;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
        }else{
            return null;
        }
    }

    this.remove = function(element){

    }
    // find the element in the linked list , retrun the index  or retrun -1
    this.indexOf = function(element){

    }
    // determine if the linkedlist is empty
    this.isEmpty = function(){
        return length == 0;
    }
    // return linkedlist length 
    this.size = function(){
        return length;
    }
    // convert linkedlist to a string 
    this.toString = function(){
        var current = head;
        var linkString = '';
        while(current){
            linkString += current.element;
            current = current.next;
        }
        return linkString;
    }
    // return linkedlist head
    this.getHead = function(){
        return head;
    }
}

