"use strict";

function Home(playerId, x, y, scale, sprite) {
    this.id = playerId;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.sprite = sprite;
}

Home.prototype = Object.create(EntityBase.prototype);
Home.prototype.constructor = Home;

Home.prototype.draw = function(ctx){
	ctx.drawImage(this.sprite, this.x * this.scale - this.sprite.width/2, this.y * this.scale - this.sprite.height/2);
}

Home.prototype.update = function(timestamp){
}
