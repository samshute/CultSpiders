'use strict';

function WinStage(connection, playerCount, winner, winnerId) {
    StageBase.call(this);
    this.connection = connection;
	
    this.playerCount = playerCount;
    this.winner = winner;
    this.winnerId = winnerId;

	//TODO WIN MUSIC
	var audio = new Audio('assets/sounds/win_background_music.mp3');
	audio.loop = true;
	audio.play();
}

WinStage.prototype = Object.create(StageBase.prototype);
WinStage.prototype.constructor = WinStage;

WinStage.prototype.update = function(timestamp) {
}


WinStage.prototype.draw = function(ctx) {
	//Do draw win
    ctx.drawImage(Util.Sprites.get('star-bg'), 0, 0);
    ctx.drawImage(Util.Sprites.get('odin'), 340, 100);
    ctx.drawImage(Util.Sprites.get('stars').getFrame(), 500, 250);
    
    ctx.drawImage(this.winner.sprite.getFrame(), 900, 550);
   
    ctx.font = '40pt Century Gothic';
    ctx.fillStyle = 'yellow';
    ctx.fillText('Player ' +(this.winnerId + 1) + ' Wins!', 750, 900);
}

//Player Sprites
Util.Sprites.preload('star-bg', 'assets/backgrounds/controller_background.jpg');
Util.Sprites.preload('odin', 'assets/win/odin_has_blessed_you.png');
Util.Sprites.preloadAnimation('stars', [
    'assets/win/stars_1.png',
    'assets/win/stars_2.png',
    'assets/win/stars_3.png',
    'assets/win/stars_4.png',
    'assets/win/stars_5.png',
    'assets/win/stars_6.png',
    'assets/win/stars_7.png',
    'assets/win/stars_8.png',
    'assets/win/stars_9.png',
    'assets/win/stars_10.png',
    'assets/win/stars_11.png',
    'assets/win/stars_12.png',
    'assets/win/stars_13.png',
    'assets/win/stars_14.png',
    'assets/win/stars_15.png',
    'assets/win/stars_16.png',
    'assets/win/stars_17.png',
    'assets/win/stars_18.png',
    'assets/win/stars_19.png',
    'assets/win/stars_20.png',
    'assets/win/stars_21.png'
    ], 10);


