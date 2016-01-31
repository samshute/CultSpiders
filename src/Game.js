"use strict";

function Game(targetElement, width, height) {
	
    // Create canvas to draw
    this.canvas = window.document.createElement("canvas");
    this.canvas.id = "game-canvas";
    this.canvas.width = width;
    this.canvas.height = height; 
    targetElement.appendChild(this.canvas);
	
	this.paused = false;
	
	
    // Configure drawing context
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = true;

    // Set state
    this.currentStage = null;
}

Game.prototype.start = function(currentStage) {
    this.currentStage = currentStage;
	
	//This makes the game refresh at 60hz
    window.requestAnimationFrame(this.step.bind(this));
}

Game.prototype.stop = function() {
    this.currentStage = null;
}

Game.prototype.changeStage = function(newStage) {
    let oldStage = this.currentStage;
    this.currentStage = newStage;

    return oldStage;
}

Game.prototype.step = function(timestep) {
    if (this.currentStage === null)
        return;
	
	if(!this.paused){}
		//Draw at 60Hz
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.currentStage.draw(this.ctx);
		this.currentStage.update(timestep);
	}

    window.requestAnimationFrame(this.step.bind(this));
}
