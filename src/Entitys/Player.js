"use strict";

function Player(ID, charX, charY, maxX, maxY, scale, size, sprite){
	this.ID = ID;
	this.charX = charX;
	this.charY = charY;
	this.movedirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX * scale;
	this.mapMaxHeight = maxY * scale;
	this.scale = scale;
	this.size = size;
	this.peasantCount = 0;
	
	this.events = [
        //{ type: 'keydown', action: this.interpKeyPress.bind(this)}
    ];
	
}


Player.prototype = Object.create(EntityBase.prototype);
Player.prototype.constructor = Player;
/*
movedirection
0 - stationary
1 - up
2 - right
3 - down
4 - left
*/

//Engine functions
Player.prototype.draw = function(ctx){
	ctx.drawImage(this.sprite, this.charX, this.charY);
}


Player.prototype.update = function(timestamp){
	switch(this.movedirection){
		case 1: //Up
			this.charY -= this.scale;
			if(this.charY <= 0) this.charY = 0;
			break;
		case 2: //Right
			this.charX += this.scale;
			if(this.charX + this.size >= this.mapMaxWidth) this.charX = this.mapMaxWidth - this.size;
			break;
		case 3: //Down
			this.charY += this.scale;
			if(this.charY + this.size >= this.mapMaxHeight) this.charY = this.mapMaxHeight- this.size;
			break;
		case 4:	//Left
			this.charX -= this.scale;
			if(this.charX <= 0) this.charX =0;
			break;
		default:
			break;
	}
}
//Movement
Player.prototype.changeDirectionUp = function(){
	this.movedirection = 1;
}

Player.prototype.changeDirectionRight = function(){
	this.movedirection = 2;
}

Player.prototype.changeDirectionDown = function(){
	this.movedirection = 3;
}

Player.prototype.changeDirectionLeft = function(){
	this.movedirection = 4;
}

//Game functions

Player.prototype.addPeasant = function(){
	this.peasantCount ++;
}

Player.prototype.removePeasants = function(numPesToRemove){
	this.peasantCount -= numPesToRemove;
	if(this.peasantCount < 0)this.peasantCount = 0;
}

