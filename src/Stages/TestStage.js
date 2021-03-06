"use strict";

function TestStage(connection, playerCount) {
    StageBase.call(this);
	this.scale = 8;
	this.maxMapX = Game.canvas.width / this.scale;
	this.maxMapY = Game.canvas.height / this.scale;
    this.eventQueue = new EventQueue();
    this.connection = connection;
	this.playerCount = playerCount;
    let offset = 42;

    this.playerList = [
        new Player(0, offset,  offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player1'), Util.Sprites.get('player1r')),
        new Player(1, offset, this.maxMapY - Util.Sprites.get('player2').height/this.scale - offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player2'), Util.Sprites.get('player2r')),
        new Player(2, this.maxMapX - Util.Sprites.get('player3').width/this.scale - offset, offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player3'), Util.Sprites.get('player3r')),
        new Player(3, this.maxMapX - Util.Sprites.get('player3').width/this.scale - offset, this.maxMapY - Util.Sprites.get('player4').height/this.scale - offset, this.maxMapX, this.maxMapY, this.scale, Util.Sprites.get('player4'), Util.Sprites.get('player4r'))
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
	
	var audio = new Audio('assets/sounds/herewego.mp3');
	audio.play();
	
	var audio = new Audio('assets/sounds/background_music.mp3');
	audio.loop = true;
	audio.play();
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
        
		let inside = false;
		if(	player.x + player.sprite.width/this.scale > home.x &&		//right
			player.x < home.x + home.sprite.width/this.scale &&			//left
			player.y + player.sprite.height/this.scale > home.y &&		//bottom
			player.y < home.y + home.sprite.height/this.scale) inside = true;	//top
			
		
		if (inside) {
			if(player.x < this.maxMapX/2 && player.moveDirection == 4) player.changeMoveDirection(0);	//left
			if(player.x > this.maxMapX/2 && player.moveDirection == 2) player.changeMoveDirection(0);	//right
			if(player.y < this.maxMapY/2 && player.moveDirection == 1) player.changeMoveDirection(0);	//up
			if(player.y > this.maxMapY/2 && player.moveDirection == 3) player.changeMoveDirection(0);	//down
			
			
			//Perform sacrifice
			if(player.follower != null){
				this.scoreKeeper.addPoints(player.id, player.performSacrifice(home.x, home.y));
                home.playAnimation();
				console.log("Do scarifice");
			}
        }
    }


	//Update Bases
	this.baseMan.update(timestamp, this.playerList);
	
	this.scoreKeeper.update(timestamp);
	//this.baseMan.update(timestamp, this.playerList);
}

TestStage.prototype.onRecieve = function(msg) {
    if (msg.Type === MessageTypes.Command)
        this.eventQueue.enqueue({ type: 'player-command', data: msg.Data });
}

TestStage.prototype.draw = function(ctx) {
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
Util.Sprites.preloadAnimation('player1', [
'assets/sprites/viking_1.png',
'assets/sprites/viking_1_run_1.png',
'assets/sprites/viking_1.png',
'assets/sprites/viking_1_run_2.png'
], 12);
Util.Sprites.preloadAnimation('player1r', [
'assets/sprites/viking_1_r.png',
'assets/sprites/viking_1_run_1_r.png',
'assets/sprites/viking_1_r.png',
'assets/sprites/viking_1_run_2_r.png'
], 12);
Util.Sprites.preloadAnimation('player2', [
'assets/sprites/viking_2.png',
'assets/sprites/viking_2_run_1.png',
'assets/sprites/viking_2.png',
'assets/sprites/viking_2_run_2.png'
], 12);
Util.Sprites.preloadAnimation('player2r', [
'assets/sprites/viking_2_r.png',
'assets/sprites/viking_2_run_1_r.png',
'assets/sprites/viking_2_r.png',
'assets/sprites/viking_2_run_2_r.png'
], 12);
Util.Sprites.preloadAnimation('player3', [
'assets/sprites/viking_3.png',
'assets/sprites/viking_3_run_1.png',
'assets/sprites/viking_3.png',
'assets/sprites/viking_3_run_2.png'
], 12);
Util.Sprites.preloadAnimation('player3r', [
'assets/sprites/viking_3_r.png',
'assets/sprites/viking_3_run_1_r.png',
'assets/sprites/viking_3_r.png',
'assets/sprites/viking_3_run_2_r.png'
], 12);
Util.Sprites.preloadAnimation('player4', [
'assets/sprites/viking_4.png',
'assets/sprites/viking_4_run_1.png',
'assets/sprites/viking_4.png',
'assets/sprites/viking_4_run_2.png'
], 12);
Util.Sprites.preloadAnimation('player4r', [
'assets/sprites/viking_4_r.png',
'assets/sprites/viking_4_run_1_r.png',
'assets/sprites/viking_4_r.png',
'assets/sprites/viking_4_run_2_r.png'
], 12);

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
