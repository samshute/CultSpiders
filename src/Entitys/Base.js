"use strict"

function Base(x, y, baseSize, scale, sprite){
	this.x = x;
	this.y = y;
	this.baseSize = baseSize;
	this.scale = scale;
	this.sprite = sprite;

}


Base.prototype.draw = function(ctx){
	ctx.drawImage(this.sprite, this.x * this.scale, this.y * this.scale);
}

Base.prototype.update = function(timestamp){
	
}