"use strict";

function StageBase() {
    this.active = false;
}

StageBase.prototype.setActive = function() {
    this.active = true;
}

StageBase.prototype.isActive = function() {
    return this.active;
}

StageBase.prototype.update = function(timestamp) {
}

StageBase.prototype.draw = function(ctx) {
}
