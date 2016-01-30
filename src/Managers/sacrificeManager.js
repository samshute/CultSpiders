"use strict";

function SacrificeManager(scale, sacSizeX, sacSizeY){
	this.sacList = [];
	this.scale = scale;
	this.sacSizeX = sacSizeX;
	this.sacSizeY = sacSizeY;
}

baseManager.prototype.draw = function (ctx){
	for(let entity of this.sacList)
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
			if(playa.x + playa.sizeX > base.x  && playa.x < base.x+ base.baseSize){//Horizontal position
				if(playa.y + playa.sizeY > base.y  && playa.y < base.y+ base.baseSize){ //Veritcal position
					playa.addPeasant();
					this.baseList.splice(index, 1);
					this.baseCount--;
				}
			}
		}
	}
	
	
	//Let the bases do their own updating
	for(let entity of this.sacList)
        entity.update(timestamp);
	
	
}