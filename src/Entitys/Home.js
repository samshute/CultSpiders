"use strict";

function Home(playerId, x, y, scale, sprite) {
    this.id = playerId;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.sprite = sprite;
    this.animation = Util.Sprites.get('blood');
    this.animation.stop();
	this.playing = false;
}

Home.prototype = Object.create(EntityBase.prototype);
Home.prototype.constructor = Home;

Home.prototype.draw = function(ctx){
    if (this.playing) {
		if (!this.animation.animating) {
			this.playing = false;
		}
        ctx.drawImage(this.animation.getFrame(), this.x * this.scale, this.y * this.scale + 75);
	}

	ctx.drawImage(this.sprite, this.x * this.scale, this.y * this.scale);
}

Home.prototype.playAnimation = function() {
	this.playing = true;
    this.animation.playOnce();
}

Home.prototype.update = function(timestamp){
}

Util.Sprites.preloadAnimation('blood', [
        'assets/sprites/Blood/base_blood_01.png',
        'assets/sprites/Blood/base_blood_02.png',
        'assets/sprites/Blood/dwelling_03.png',
        'assets/sprites/Blood/dwelling_04.png',
        'assets/sprites/Blood/dwelling_05.png',
        'assets/sprites/Blood/dwelling_06.png',
        'assets/sprites/Blood/dwelling_07.png',
        'assets/sprites/Blood/dwelling_08.png',
        'assets/sprites/Blood/dwelling_09.png'
    ], 5)
