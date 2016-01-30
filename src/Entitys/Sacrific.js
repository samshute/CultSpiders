"use strict";

function Sacrifice(charX, charY, maxX, maxY, scale, sizeX, sizeY, sprite, following){
	this.charX = charX;
	this.charY = charY;
	this.movedirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX;
	this.mapMaxHeight = maxY;
	this.scale = scale;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
}

Sacrifice.prototype.changeFollowing = function(following){
	this.following = following;
}