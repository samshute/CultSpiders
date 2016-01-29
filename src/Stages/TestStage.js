"use strict";

function TestStage() {
    StageBase.call(this);
	this.maxMapX = 128;
	this.maxMapY = 128;
	this.scale = 8;
    this.eventQueue = new EventQueue();

    this.entities = [
	new Player(1, 0, 0, this.maxMapX, this.maxMapY, this.scale, 64, Util.Sprites.get('player1')), 	//Player 1
	new Player(2, 0, 32, this.maxMapX, this.maxMapY, this.scale, 64, Util.Sprites.get('player2'))	//Player 2
    ];

    for(let entity of this.entities) {
        this.eventQueue.bind(entity);
    }

    window.addEventListener('keydown', (function(e) { this.eventQueue.enqueue(e); }).bind(this));
	window.addEventListener('keydown', this.interpKeyPress.bind(this));
    window.addEventListener('keyup', (function(e) { this.eventQueue.enqueue(e); }).bind(this));
	
	this.baseMan = new baseManager(this.maxMapX, this.maxMapY, this.scale, 16);
}

TestStage.prototype = Object.create(StageBase.prototype);
TestStage.prototype.constructor = TestStage;

TestStage.prototype.update = function(timestamp) {
    this.eventQueue.broadcast();

	this.baseMan.update(timestamp);
	
    for(let entity of this.entities)
       entity.update(timestamp);
}

TestStage.prototype.draw = function(ctx) {
    this.baseMan.draw(ctx);
	
	for(let entity of this.entities)
        entity.draw(ctx);
	
	
}

//Player Sprites
Util.Sprites.preload('player1', 'assets/sprites/p1.png');
Util.Sprites.preload('player2', 'assets/sprites/p2.png');


//Player Controls	TO BE REPLACED WITH PHONE CONTROLS LATER
TestStage.prototype.interpKeyPress = function(event){
	var player = 0;
	var direction = 0;
	switch(event.keyCode){
		//Player 1
		case 38:	//Up
			player = 1;
			direction = 1;
			break;
		case 39:	//Right
			player = 1;
			direction = 2;
			break;
		case 40:	//Down
			player = 1;
			direction = 3;
			break;
		case 37:	//Left
			player = 1;
			direction = 4;
			break;
		//Player 2
		case 87:	
			player = 2;
			direction = 1;
			break;
		case 68:
			player = 2;
			direction = 2;
			break;
		case 83:
			player = 2;
			direction = 3;
			break;
		case 65:
			player = 2;
			direction = 4;
			break;
		default:
			break;
	}
	
	if(player != 0 && direction != 0){
		for(let entity of this.entities) {
			if(entity.ID == player){
				switch (direction){
					case 1:
						entity.changeDirectionUp();
						break;
					case 2:
						entity.changeDirectionRight();
						break;
					case 3:
						entity.changeDirectionDown();
						break;
					case 4:
						entity.changeDirectionLeft();
						break;
				}
			}
		}
	}
	
	
}