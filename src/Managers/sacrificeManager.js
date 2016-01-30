"use strict";

function SacrificeManager(scale, sacSizeX, sacSizeY){
	this.sacList = [];
	this.scale = scale;
}

SacrificeManager.prototype.draw = function (ctx){
	for(let entity of this.sacList)
        entity.draw(ctx);
}

SacrificeManager.prototype.update = function(timestamp, playersList){
	
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

SacrificeManager.prototype.addSacrifice(newSacrifice){
	sacList.push(newSacrifice);
}