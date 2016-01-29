"use strict";
//width = x square count
//height = y square count
//scale = pixels per square
//baseSize = base width and height in squares, not in pixels
//maxBaseCount
function baseManager(width, height, scale, baseSize, maxBaseCount){
	this.entities = [
    ];
	this.timeOfLastBaseSpawn = 0;
	this.mapWidth = width;
	this.mapHeight= height;
	this.scale = scale;
	this.baseSize = baseSize;
	this.baseCount = 0;
	this.maxbaseCount = maxBaseCount;
}

baseManager.prototype.spawnNewBase = function(){
	//TODO Check that the bases arent spawning too close to the map edges, each other, and the players
	var horizontalBand =(Math.Floor(this.mapWidth *0.1));
	var verticalBand =(Math.Floor(this.mapHeight *0.1));
	var newBaseX = Math.floor((Math.random() * (this.mapWidth - horizontalBand*2))) + horizontalBand;
	var newBaseY = Math.floor((Math.random() * (this.mapHeight - verticalBand*2))) + verticalBand;
	//Add new base to the list
	this.entities.push(new Base(newBaseX, newBaseY, this.scale, Util.Sprites.get('base')));
	
}

baseManager.prototype.draw = function (ctx){
	for(let entity of this.entities)
        entity.draw(ctx);
}


baseManager.prototype.update = function(timestamp){
	
	//Spawn new base if:
	//one hasn't been spawned in the last 10 seconds 
	//and there arent the maximum number of allowed bases
	if(this.timeOfLastBaseSpawn + 10000 < timestamp && this.baseCount < this.maxbaseCount){
		//Add the new base
		this.spawnNewBase();
		this.baseCount++;
		//Reset the time counter
		this.timeOfLastBaseSpawn = timestamp;
		
	}
	//Let the bases do their own updating
	for(let entity of this.entities)
        entity.update(timestamp);
}

Util.Sprites.preload('base', 'assets/sprites/House.png');