"use strict";

//charX is the X location on the game grid
//charY is the Y location on the game grid
//maxX is the width of the game grid
//maxY is the height of the game grid
//scale is the pixels per game grid
//size is the number of squares in the grid a player covers in the vertical or horizontal directions

function Player(ID, charX, charY, maxX, maxY, scale, sizeX, sizeY, sprite){
	this.ID = ID;
	this.charX = charX;
	this.charY = charY;
	this.movedirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX;
	this.mapMaxHeight = maxY;
	this.scale = scale;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
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
	ctx.drawImage(this.sprite, this.charX * this.scale, this.charY * this.scale);
}


Player.prototype.update = function(timestamp){
	switch(this.movedirection){
		case 1: //Up
			this.charY -= 1;
			if(this.charY <= 0) this.charY = 0;
			break;
		case 2: //Right
			this.charX += 1;
			if((this.charX + this.sizeX) >= this.mapMaxWidth) this.charX = this.mapMaxWidth - this.sizeX;
			break;
		case 3: //Down
			this.charY += 1;
			if((this.charY + this.sizeY) >= this.mapMaxHeight) this.charY = this.mapMaxHeight- this.sizeY;
			break;
		case 4:	//Left
			this.charX -= 1;
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

