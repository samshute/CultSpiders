"use strict";

function Animation(frames, rate) {
    this.frames = frames;
    this.currentFrame = 0;
    this.frameDuration = rate; // In screen frames, i.e 1/60 second;
    this.frameFuck = 0;
    this.animating = true;
    this.endAfterAnimation = false;
	this.width = this.frames[0].width;
	this.height = this.frames[0].height;
}

Animation.prototype.stop = function() {
    this.animating = false;
}

Animation.prototype.play = function() {
    this.animating = true;
}

Animation.prototype.playOnce = function() {
    this.animating = true;
    this.endAfterAnimation = true;
}

Animation.prototype.getFrame = function() {
    this.frameFuck++;

    if (this.animating && this.frameFuck > this.frameDuration) {
        this.frameFuck = 0;
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;

        if (this.currentFrame == 0 && this.endAfterAnimation)
            this.animating = false;
    }

    return this.frames[this.currentFrame];
}

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
 
Sprites.prototype.preloadAnimation = function (key, paths, drawRate) {
    let imgs = []

    for(let path of paths) {
        let img = new Image();
        img.src = path;
        img.alt = 'Error ' + key;
        img.onload = this.preloadComplete.bind(this);
        this.preloadCount += 1;

        imgs.push(img);    
    }

    this.loaded.set(key, new Animation(imgs, drawRate));
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
