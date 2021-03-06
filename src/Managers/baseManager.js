"use strict";
//width = x square count
//height = y square count
//scale = pixels per square
//baseSize = base width and height in squares, not in pixels
//maxBaseCount
function baseManager(stage, width, height, scale, baseSize, maxBaseCount){
	this.baseList = [
    ];
	this.timeOfLastBaseSpawn = 0;
	this.mapWidth = width;
	this.mapHeight= height;
	this.scale = scale;
	this.baseSize = baseSize;
	this.baseCount = 0;
	this.maxbaseCount = maxBaseCount;
	this.stage = stage;
    this.animationPositions = [ ];
    this.animation = Util.Sprites.get('Explo');
}

baseManager.prototype.spawnNewBase = function(){
	//TODO Check that the bases arent spawning too close to the map edges, each other, and the players
	var horizontalBand =(Math.floor(this.mapWidth *0.25));
	var verticalBand =(Math.floor(this.mapHeight *0.25));
	var newBaseX = Math.floor((Math.random() * (this.mapWidth - horizontalBand*2 - this.baseSize))) + horizontalBand;
	var newBaseY = Math.floor((Math.random() * (this.mapHeight - verticalBand*2 - this.baseSize))) + verticalBand ;
	//Add new base to the list
	this.baseList.push(new Base(newBaseX, newBaseY, this.baseSize, this.scale, Util.Sprites.get('base')));
	
}

baseManager.prototype.draw = function (ctx){
	for(let entity of this.baseList)
        entity.draw(ctx);
	
    for(let position of this.animationPositions) 
        if (position.live)
	        ctx.drawImage(this.animation.getFrame(), position.x * this.scale, position.y * this.scale);
}


baseManager.prototype.update = function(timestamp, playersList){
	
	//Spawn new base if:
	//one hasn't been spawned in the last 10 seconds 
	//and there arent the maximum number of allowed bases
	if(this.timeOfLastBaseSpawn + 5000 < timestamp && this.baseCount < this.maxbaseCount){
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
					var newSacrifice = new Sacrifice(base.x, base.y, this.mapMaxWidth, this.mapMaxHeight, this.scale, Util.Sprites.get('sacrifice' + Math.floor((Math.random() * 13 + 1))));
					playa.addSacrifice(newSacrifice);
					//this.stage.sacMan.addSacrifice(newSacrifice);
					this.baseList.splice(index, 1);
					this.baseCount--;
                    this.animationPositions.push({ x: base.x, y: base.y, steps: 10, live: true});
				}
			}
		}
	}
	
	
	//Let the bases do their own updating
	for(let entity of this.baseList)
        entity.update(timestamp);
	
    for(let i = 0; i < this.animationPositions.length; i++) {
        if (!this.animationPositions[i].live)
            continue;

        this.animationPositions[i].steps --;

        if (this.animationPositions[i].steps <= 0)
            this.animationPositions[i].live = false;
    }
}

Util.Sprites.preloadAnimation('Explo', [
        'assets/sprites/Blood/base_blood_01.png',
        'assets/sprites/Blood/dwelling_04.png',
        'assets/sprites/Blood/dwelling_05.png',
        'assets/sprites/Blood/dwelling_06.png',
        'assets/sprites/Blood/dwelling_08.png',
        'assets/sprites/Blood/dwelling_09.png'
    ], 15)

Util.Sprites.preload('base', 'assets/buildings/dwelling_01.png');
