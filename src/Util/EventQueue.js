"use strict";

// Events in format:
// { type: 'keyPress', data: { }}

// Event Listeners in format:
// { type: 'keyPress', callback: function(event) {...} [, filter: function(event) {...}] }

function EventQueue() {
    this.queue = [];
    this.listeners = new Set();
}

EventQueue.prototype.bind = function(obj) {
    let listeners = obj.getEventListeners ? obj.getEventListeners() : obj;

    for (let listener of listeners)
        this.listeners.add(listener);
}

EventQueue.prototype.unbind = function(obj) {
    let listeners = obj.getEventListeners ? obj.getEventListeners() : obj;

    for (let listener of listeners)
        this.listeners.delete(listener);
}

EventQueue.prototype.enqueue = function(event) {
    this.queue.push(event);
}

EventQueue.prototype.broadcast = function() {
    while(this.queue.length) {
        let event = this.queue.shift();

		console.log(event.type + " " + event.keyCode);
		
        for(let listener of this.listeners) {
            if (listener.type !== event.type)
                continue;

            if (listener.filter && !listener.filter(event))
                continue;

            listener.action(event);
        }
    }
}
