"use strict";

<<<<<<< HEAD
//x is the X location on the game grid
//y is the Y location on the game grid
//maxX is the width of the game grid
//maxY is the height of the game grid
//scale is the pixels per game grid
//size is the number of squares in the grid a player covers in the vertical or horizontal directions


function Player(id, x, y, maxX, maxY, scale, sizeX, sizeY, sprite){
	this.id = id;
	this.x = x;
	this.y = y;
	this.moveDirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX;
	this.mapMaxHeight = maxY;
	this.scale = scale;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
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
	ctx.drawImage(this.sprite, this.x * this.scale, this.y * this.scale);
}


Player.prototype.update = function(timestamp){
	switch(this.moveDirection){
		case 1: //Up
			this.y -= 1;
			if(this.y <= 0) this.y = 0;
			break;
		case 2: //Right
			this.x += 1;
			if((this.x + this.sizeX) >= this.mapMaxWidth) this.x = this.mapMaxWidth - this.sizeX;
			break;
		case 3: //Down
			this.y += 1;
			if((this.y + this.sizeY) >= this.mapMaxHeight) this.y = this.mapMaxHeight- this.sizeY;
			break;
		case 4:	//Left
			this.x -= 1;
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

