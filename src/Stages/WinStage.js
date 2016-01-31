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
	//Do draw win
}

//Player Sprites
Util.Sprites.preload('player1', 'assets/sprites/viking_1.png');
Util.Sprites.preload('player2', 'assets/sprites/viking_2.png');
Util.Sprites.preload('player3', 'assets/sprites/viking_3.png');
Util.Sprites.preload('player4', 'assets/sprites/viking_4.png');

