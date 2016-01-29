"use strict";

function EntityBase(x, y) {

    this.events = [];
}

EntityBase.prototype.update = function(timestamp) {
}

EntityBase.prototype.draw = function(ctx) { }

EntityBase.prototype.getEventListeners = function() {
    return this.events;
}
