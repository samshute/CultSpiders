"use strict";

function TestStage(connection, playerCount) {
    StageBase.call(this);
	this.scale = 8;
	this.maxMapX = Game.canvas.width / this.scale;
	this.maxMapY = Game.canvas.height / this.scale;
    this.eventQueue = new EventQueue();
    this.connection = connection;

    this.PlayersList = [
    ];
	
	if(playerCount>=1)this.PlayersList.push(new Player(0, 0,  0, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player1'))); //Player 1
	if(playerCount>=2)this.PlayersList.push(new Player(1, 0, this.maxMapY - Util.Sprites.get('player2').height/this.scale, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player2')));	//Player 2
	if(playerCount>=3)this.PlayersList.push(new Player(2, this.maxMapX - Util.Sprites.get('player3').width/this.scale, 0, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player3')));	//Player 3
	if(playerCount>=4)this.PlayersList.push(new Player(3, this.maxMapX - Util.Sprites.get('player3').width/this.scale, this.maxMapY - Util.Sprites.get('player4').height/this.scale, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player4')));	//Player 4
    for(let entity of this.PlayersList) {
        this.eventQueue.bind(entity);
    }

    connection.onReceive = this.onRecieve.bind(this);

	this.baseMan = new baseManager(this, this.maxMapX, this.maxMapY, this.scale, 8, 5);
}

TestStage.prototype = Object.create(StageBase.prototype);
TestStage.prototype.constructor = TestStage;

TestStage.prototype.update = function(timestamp) {
    this.eventQueue.broadcast();
	
	//Update Players
    for(let entity of this.PlayersList)
       entity.update(timestamp);
   
	//Update Bases
	this.baseMan.update(timestamp, this.PlayersList);
	this.baseMan.update(timestamp, this.PlayersList);
	
}

TestStage.prototype.onRecieve = function(msg) {
    if (msg.Type === MessageTypes.Command)
        this.eventQueue.enqueue({ type: 'player-command', data: msg.Data });
}

TestStage.prototype.draw = function(ctx) {
    this.baseMan.draw(ctx);
	
	for(let entity of this.PlayersList)
        entity.draw(ctx);
}

//Player Sprites
Util.Sprites.preload('player1', 'assets/sprites/viking_1.png');
Util.Sprites.preload('player2', 'assets/sprites/viking_2.png');
Util.Sprites.preload('player3', 'assets/sprites/viking_3.png');
Util.Sprites.preload('player4', 'assets/sprites/viking_4.png');


