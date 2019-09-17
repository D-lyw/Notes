function EventEmitter(){
    this.__events = {};
}

// 添加事件
EventEmitter.prototype.on = function(eventName, listener){
    if(!eventName || !listener) return;

    var oneListener = {
        listener: listener,
        once: false
    };

    if (this.__events[eventName]) {
        this.__events.push(oneListener);
    } else {
        this.__events[eventName] = [];
        this.__events.push(oneListener);
    }
    return this;
}

// 添加事件执行一次
EventEmitter.prototype.once = function(eventName, listener){
    if(!eventName || !listener) return;

    var oneListener = {
        listener: listener,
        once: true
    };

    if (this.__events[eventName]) {
        this.__events.push(oneListener);
    } else {
        this.__events[eventName] = [];
        this.__events.push(oneListener);
    }
}

// 执行事件
EventEmitter.prototype.emit = function(eventName, args) {
    var listeners = this.__events[eventName];
    if(!listeners) return;

    for(let i = 0; i < listeners.length; i++){
        var listener = listeners[i];
        listener.listener.apply(this, args || []);
        if(listener.once) {
            this.off(eventName, listener.listener);
        }
    }
}

// 删除某一事件
EventEmitter.prototype.off = function(eventName, listener) {
    var listeners = this.__events[eventName];
    if(!listeners) return;

    for(let i = 0; i < listeners.length; i++){
        if(listeners[i].listener === listener && listeners[i]){
            listeners.splice(i, 1, null);
            break;
        }
    }
    return this;
}

data.on('data', (msg) => {

})

data.on('end', (msg) => {

})


(function(){




    
}())