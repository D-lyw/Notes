// 发布订阅模式

function Publisher(){
    this.listeners = [];
}

Publisher.prototype = {
    'addListener': function(listener) {
        this.listeners.push(listener);
    },
    'removeListener': function(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    },
    'notify': function(obj){
        this.listeners.forEach((item) => {
            item.process(obj);
        })
    }
}

// 订阅者

function SubScribe(name){
    this.subscribeName = name; 
}
SubScribe.prototype.process = function(obj){
    console.log(obj);
}

var publiser = new Publisher();

var addone = new SubScribe("one");
publiser.addListener(new SubScribe("a1"));
publiser.addListener(new SubScribe('a2'));
publiser.addListener(new SubScribe('a3'));
publiser.addListener(addone);

publiser.notify("send something!");
publiser.removeListener(addone);

publiser.notify("send msg again!!!");