"use strict";

function Player(id, x, y, maxX, maxY, scale, size, sprite){
	this.id = id;
	this.x = x;
	this.y = y;
	this.moveDirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX * scale;
	this.mapMaxHeight = maxY * scale;
	this.scale = scale;
	this.size = size;
	this.peasantCount = 0;
	
	this.events = [
        { type: 'player-command', filter: (function(x) { return x.data.playerId == this.id }).bind(this), action: this.onInput.bind(this) }
    ];
}


Player.prototype = Object.create(EntityBase.prototype);
Player.prototype.constructor = Player;
/*
moveDirection
0 - stationary
1 - up
2 - right
3 - down
4 - left
*/

//Engine functions
Player.prototype.draw = function(ctx){
	ctx.drawImage(this.sprite, this.x, this.y);
}


Player.prototype.update = function(timestamp){
	switch(this.moveDirection){
		case 1: //Up
			this.y -= this.scale;
			if(this.y <= 0) this.y = 0;
			break;
		case 2: //Right
			this.x += this.scale;
			if(this.x + this.size >= this.mapMaxWidth) this.x = this.mapMaxWidth - this.size;
			break;
		case 3: //Down
			this.y += this.scale;
			if(this.y + this.size >= this.mapMaxHeight) this.y = this.mapMaxHeight- this.size;
			break;
		case 4:	//Left
			this.x -= this.scale;
			if(this.x <= 0) this.x =0;
			break;
		default:
			break;
	}
}

Player.prototype.onInput = function(event) {
    this.moveDirection = event.data.direction;
}

//Game functions

Player.prototype.addPeasant = function(){
	this.peasantCount ++;
}

Player.prototype.removePeasants = function(numPesToRemove){
	this.peasantCount -= numPesToRemove;
	if(this.peasantCount < 0)this.peasantCount = 0;
}

