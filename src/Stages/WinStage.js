"use strict";

function WinStage(connection, playerCount, winner) {
    StageBase.call(this);
    this.connection = connection;
    connection.onReceive = this.onRecieve.bind(this);
	
	
	
	//TODO WIN MUSIC
	var audio = new Audio('assets/sounds/win_background_music.mp3');
	audio.loop = true;
	audio.play();
}

WinStage.prototype = Object.create(StageBase.prototype);
WinStage.prototype.constructor = WinStage;

WinStage.prototype.update = function(timestamp) {
    this.eventQueue.broadcast();
	


	//Update Bases
	this.baseMan.update(timestamp, this.playerList);
	
	this.scoreKeeper.update(timestamp);
	//this.baseMan.update(timestamp, this.playerList);
}

WinStage.prototype.onRecieve = function(msg) {
    if (msg.Type === MessageTypes.Command)
        this.eventQueue.enqueue({ type: 'player-command', data: msg.Data });
}

WinStage.prototype.draw = function(ctx) {
    let animation = Util.Sprites.get('tree');
	ctx.drawImage(animation.getFrame(), 947 - 125, -10);
	
    this.baseMan.draw(ctx);
    this.scoreKeeper.draw(ctx);
	
	//Draw houses first so they are at the lowest level
    for (let entity of this.homeList) 
        entity.draw(ctx);
	
	//DRAW PLAYERS SECOND SO THEY ARE ON TOP OF HOUSES
	for (let entity of this.playerList)
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

//Tree Animation
Util.Sprites.preloadAnimation('tree', [
    'assets/backgrounds/Environment/Tree/tree_1.png',
    'assets/backgrounds/Environment/Tree/tree_2.png',
    'assets/backgrounds/Environment/Tree/tree_3.png',
    'assets/backgrounds/Environment/Tree/tree_4.png'
    ], 18);
