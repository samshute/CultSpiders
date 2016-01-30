"use strict";
//width = x square count
//height = y square count
//scale = pixels per square
//baseSize = base width and height in squares, not in pixels
//maxBaseCount
function baseManager(width, height, scale, baseSize, maxBaseCount){
	this.baseList = [
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
	var horizontalBand =(Math.floor(this.mapWidth *0.1));
	var verticalBand =(Math.floor(this.mapHeight *0.1));
	var newBaseX = Math.floor((Math.random() * (this.mapWidth - horizontalBand*2 - this.baseSize))) + horizontalBand;
	var newBaseY = Math.floor((Math.random() * (this.mapHeight - verticalBand*2 - this.baseSize))) + verticalBand ;
	//Add new base to the list
	this.baseList.push(new Base(newBaseX, newBaseY, this.baseSize, this.scale, Util.Sprites.get('base')));
	
}

baseManager.prototype.draw = function (ctx){
	for(let entity of this.baseList)
        entity.draw(ctx);
}


baseManager.prototype.update = function(timestamp, playersList){
	
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
	//Detect Collisions with Players
	for(let playa of playersList){
		for(var index = 0; index < this.baseList.length; index ++ ){
			var base = this.baseList[index];
			if(playa.charX + playa.sizeX > base.charX  && playa.charX < base.charX+ base.baseSize){//Horizontal position
				if(playa.charY + playa.sizeY > base.charY  && playa.charY < base.charY+ base.baseSize){ //Veritcal position
					playa.addPeasant();
					this.baseList.splice(index, 1);
					this.baseCount--;
				}
			}
		}
	}
	
	
	//Let the bases do their own updating
	for(let entity of this.baseList)
        entity.update(timestamp);
	
	
}

Util.Sprites.preload('base', 'assets/sprites/House.png');