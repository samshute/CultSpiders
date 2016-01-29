"use strict"

function Base(charX, charY, scale, sprite){
	this.charX = charX;
	this.charY = charY;
	this.scale = scale;
	this.sprite = sprite;

}


Base.prototype.draw = function(ctx){
	ctx.drawImage(this.sprite, this.charX * this.scale, this.charY * this.scale);
}

Base.prototype.update = function(timestamp){
	
}