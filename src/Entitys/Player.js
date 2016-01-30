"use strict";

//x is the X location on the game grid
//y is the Y location on the game grid
//maxX is the width of the game grid
//maxY is the height of the game grid
//scale is the pixels per game grid
//size is the number of squares in the grid a player covers in the vertical or horizontal directions


function Player(id, x, y, maxX, maxY, scale, sprite){
	this.id = id;
	this.x = x;
	this.y = y;
	this.moveDirection = 0;
	this.sprite = sprite;
	this.mapMaxWidth = maxX;
	this.mapMaxHeight = maxY;
	this.scale = scale;
	this.sizeX = 32/scale;
	this.sizeY = 64/scale;
	this.peasantCount = 0;
	this.follower;
	
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
	if(this.follower != null)this.follower.draw(ctx);
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
	if(this.follower != null)this.follower.update(timestamp);
}

Player.prototype.onInput = function(event) {
    this.moveDirection = event.data.direction;
	if(this.follower != null)this.follower.addMove(this.x, this.y)
}

//Game functions

Player.prototype.addSacrifice = function(newSacrifice){
	this.peasantCount ++;
	newSacrifice.head = this;
	if(this.follower == null){
		this.follower = newSacrifice;
		newSacrifice.changeFollowing(this);
	}else{
		this.follower.addSacrifice(newSacrifice);
	}
}

Util.Sprites.preload('sacrifice1', 'assets/sprites/Sacrifices/sacrifice_1.png');
Util.Sprites.preload('sacrifice2', 'assets/sprites/Sacrifices/sacrifice_2.png');
Util.Sprites.preload('sacrifice3', 'assets/sprites/Sacrifices/sacrifice_3.png');
Util.Sprites.preload('sacrifice4', 'assets/sprites/Sacrifices/sacrifice_4.png');
Util.Sprites.preload('sacrifice5', 'assets/sprites/Sacrifices/sacrifice_5.png');
Util.Sprites.preload('sacrifice6', 'assets/sprites/Sacrifices/sacrifice_6.png');
Util.Sprites.preload('sacrifice7', 'assets/sprites/Sacrifices/sacrifice_7.png');
Util.Sprites.preload('sacrifice8', 'assets/sprites/Sacrifices/sacrifice_8.png');
Util.Sprites.preload('sacrifice9', 'assets/sprites/Sacrifices/sacrifice_9.png');
Util.Sprites.preload('sacrifice10', 'assets/sprites/Sacrifices/sacrifice_10.png');
Util.Sprites.preload('sacrifice11', 'assets/sprites/Sacrifices/sacrifice_11.png');
Util.Sprites.preload('sacrifice12', 'assets/sprites/Sacrifices/sacrifice_12.png');
Util.Sprites.preload('sacrifice13', 'assets/sprites/Sacrifices/sacrifice_13_swagadiah.png');

Player.prototype.removePeasants = function(numPesToRemove){
	this.peasantCount -= numPesToRemove;
	if(this.peasantCount < 0)this.peasantCount = 0;
}

