"use strict";

function Sprites() {
    this.loaded = new Map();
    this.preloadCount = 0;
    this.finishedLoadCount = 0;
    this.finishedLoadCallBack = null;
}

Sprites.prototype.preload = function (key, path) {
    let img = new Image();
    img.src = path;
    img.alt = 'Error ' + key;
    img.onload = this.preloadComplete.bind(this);

    this.loaded.set(key, img);    
    this.preloadCount += 1;
}
  
Sprites.prototype.get = function(key) {
    let val = this.loaded.get(key);

    if (val === undefined)
        throw 'Could not find sprite. Key: ' + key;

    return val;
}

Sprites.prototype.preloadComplete = function() {
    this.finishedLoadCount += 1;

    if (this.finishedLoadCount >= this.preloadCount && this.finishedLoadCallBack) {
        this.finishedLoadCallBack();
    }
}

Sprites.prototype.onFinishedLoad = function(callback) {
    this.finishedLoadCallBack = callback;

    if (this.finishedLoadCount >= this.preloadCount && this.finishedLoadCallBack) {
        this.finishedLoadCallBack();
    }
}

Util.Sprites = new Sprites();
