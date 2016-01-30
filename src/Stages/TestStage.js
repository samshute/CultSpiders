"use strict";

function TestStage(connection, playerCount) {
    StageBase.call(this);
	this.scale = 8;
	this.maxMapX = Game.canvas.width / this.scale;
	this.maxMapY = Game.canvas.height / this.scale;
    this.eventQueue = new EventQueue();
    this.connection = connection;

    let offset = 40;

    this.playerList = [
        new Player(0, offset,  offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player1')),
        new Player(1, offset, this.maxMapY - Util.Sprites.get('player2').height/this.scale - offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player2')),
        new Player(2, this.maxMapX - Util.Sprites.get('player3').width/this.scale - offset, offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player3')),
        new Player(3, this.maxMapX - Util.Sprites.get('player3').width/this.scale - offset, this.maxMapY - Util.Sprites.get('player4').height/this.scale - offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player4'))
    ].splice(0, playerCount);
	
    offset = 35;

    this.homeList = [
        new Home(0, offset,  offset, this.scale, Util.Sprites.get('home1')),
        new Home(1, offset, this.maxMapY - Util.Sprites.get('home2').height/this.scale - offset, this.scale, Util.Sprites.get('home2')),
        new Home(2, this.maxMapX - Util.Sprites.get('home3').width/this.scale - offset, offset, this.scale, Util.Sprites.get('home3')),
        new Home(3, this.maxMapX - Util.Sprites.get('home4').width/this.scale - offset, this.maxMapY - Util.Sprites.get('home4').height/this.scale - offset, this.scale, Util.Sprites.get('home4'))
    ].splice(0, playerCount);

    for(let entity of this.playerList) {
        this.eventQueue.bind(entity);
    }

    connection.onReceive = this.onRecieve.bind(this);

	this.baseMan = new baseManager(this, this.maxMapX, this.maxMapY, this.scale, 8, 5);

    this.scoreKeeper = new ScoreKeeper(this.homeList, this.scale);
}

TestStage.prototype = Object.create(StageBase.prototype);
TestStage.prototype.constructor = TestStage;

TestStage.prototype.update = function(timestamp) {
    this.eventQueue.broadcast();
	
	//Update Players
    for (let entity of this.playerList)
       entity.update(timestamp);
   
    for (let entity of this.homeList) 
        entity.update(timestamp);

    
    for (let i = 0; i < this.playerList.length; i++) 
    {
        let player = this.playerList[i];
        let home = this.homeList[i];

        if (player.peasentCount == 0)
            continue;

        let dist = (player.x - home.x) * (player.x - home.x) + (player.y - home.y) * (player.y - home.y);
        if (dist < 100) {
            this.scoreKeeper.addPoints(player.id, 1);
            console.log("Do scarifice");
        }
    }


	//Update Bases
	this.baseMan.update(timestamp, this.playerList);
	//this.baseMan.update(timestamp, this.playerList);
}

TestStage.prototype.onRecieve = function(msg) {
    if (msg.Type === MessageTypes.Command)
        this.eventQueue.enqueue({ type: 'player-command', data: msg.Data });
}

TestStage.prototype.draw = function(ctx) {
    this.baseMan.draw(ctx);
    this.scoreKeeper.draw(ctx);
	
	for (let entity of this.playerList)
        entity.draw(ctx);

    for (let entity of this.homeList) 
        entity.draw(ctx);
}

//Player Sprites
Util.Sprites.preload('player1', 'assets/sprites/viking_1.png');
Util.Sprites.preload('player2', 'assets/sprites/viking_2.png');
Util.Sprites.preload('player3', 'assets/sprites/viking_3.png');
Util.Sprites.preload('player4', 'assets/sprites/viking_4.png');

//House Sprites
Util.Sprites.preload('home1', 'assets/buildings/home_01.png');
Util.Sprites.preload('home2', 'assets/buildings/home_02.png');
Util.Sprites.preload('home3', 'assets/buildings/home_03.png');
Util.Sprites.preload('home4', 'assets/buildings/home_04.png');

