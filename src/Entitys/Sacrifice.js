"use strict";

function Sacrifice(x, y, maxX, maxY, scale, sprite){
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	this.mapMaxWidth = maxX;
	this.mapMaxHeight = maxY;
	this.scale = scale;
	this.sizeX = Math.floor(32/scale);
	this.sizeY = Math.floor(64/scale);
	this.following;
	this.follower;
	this.head;
	this.moveQueue = [];
}

Sacrifice.prototype.changeFollowing = function(following){
	if(this.following != null){
		var audio = new Audio('assets/sounds/headshot.mp3');
		audio.play();
	}
	this.following = following;
	this.moveQueue = [];
}

Sacrifice.prototype.changeFollower = function(follower){
	this.follower = follower;
}

Sacrifice.prototype.update = function(timestep){
	//Check if collided with a player
	for(let playa of Game.currentStage.playerList){
		if(playa != this.head){
			if(playa.x + playa.sizeX > this.x  && playa.x < this.x+ this.sizeX){//Horizontal position
				if(playa.y + playa.sizeY > this.y  && playa.y < this.y+ this.sizeY){ //Veritcal position
					//Change following
					this.following.follower = null;
					playa.addSacrifice(this);
				}
			}
		}
	}
	
	
	var hor = 0;	//stay the same horizontally
	var ver = 0; 	//stay the same vertically
	if(this.moveQueue.length > 0){
		//Move through moveQueue
		if(this.moveQueue[0].x > this.x) hor =1;// go right
		else if (this.moveQueue[0].x< this.x)hor = -1; //go left
		if(this.moveQueue[0].y > this.y) ver =1;// go down
		else if (this.moveQueue[0].y < this.y)ver = -1; //go up
		
		this.x += hor;
		this.y += ver;
		if(this.y <= 0) this.y = 0;
		if(this.x <= 0) this.x = 0;
		if((this.y + this.sizeY) >= this.mapMaxHeight) this.y = this.mapMaxHeight- this.sizeY;
		if((this.x + this.sizeX) >= this.mapMaxWidth) this.x = this.mapMaxWidth - this.sizeX;
		
		if(Math.floor(this.moveQueue[0].x) == Math.floor(this.x) && Math.floor(this.moveQueue[0].y) == Math.floor(this.y))this.moveQueue.splice(0,1);
	}else if(this.following != null){
		//Move towards following
		if(this.following.x -  this.following.sizeX/2 > this.x + this.sizeX/2) hor =1;// go right
		else if (this.following.x + this.following.sizeX/2  < this.x - this.sizeX/2)hor = -1; //go left
		if(this.following.y -  this.following.sizeY/2 > this.y  + this.sizeY/2) ver =1;// go down
		else if (this.following.y +  this.following.sizeY/2< this.y  - this.sizeY/2)ver = -1; //go up
		
		this.x += hor;
		this.y += ver;
		if(this.y <= 0) this.y = 0;
		if(this.x <= 0) this.x = 0;
		if((this.y + this.sizeY) >= this.mapMaxHeight) this.y = this.mapMaxHeight- this.sizeY;
		if((this.x + this.sizeX) >= this.mapMaxWidth) this.x = this.mapMaxWidth - this.sizeX;
	}
	
	
	
	if(this.follower != null)this.follower.update(timestep);
}

Sacrifice.prototype.draw = function(ctx){
	if(this.follower != null)this.follower.draw(ctx);
	ctx.drawImage(this.sprite, this.x * this.scale, this.y * this.scale);
	
}

Sacrifice.prototype.addSacrifice = function(newSacrifice){
	if(this.follower == null){
		this.follower = newSacrifice;
		newSacrifice.following = this;
	}else{
		this.follower.addSacrifice(newSacrifice);
	}
}

Sacrifice.prototype.performSacrifice = function(x, y, count){
		//Clear all existing directions
		if(this.follower != null){
			this.following.follower = null;
			this.following = null;
			this.moveQueue = [new Position(x,y)];
			return this.follower.performSacrifice(x,y, count + 1);
		}else{
			this.following.follower = null;
			this.following = null;
			this.moveQueue = [new Position(x,y)];
			var points =0
			for(var index = 0;index <=count + 1;index++)points +=index;
			return points;
		}
}

Sacrifice.prototype.addMove = function(moveToX, moveToY){
	if(!(moveToX === parseInt(moveToX, 10))){
		console.log("Non int X received");
	}
	if(!(moveToX === parseInt(moveToY, 10))){
		console.log("Non int Y received");
	}
	this.moveQueue.push(new Position(moveToX, moveToY));
	if(this.follower != null)this.follower.addMove(moveToX, moveToY);
}
