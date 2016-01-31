"use strict";


let WIN_SCORE = 5;

function ScoreKeeper(homes, scale) {
    this.scores = [];
    this.homes = homes;
    this.scale = scale;
}

ScoreKeeper.prototype.update = function(timestamp) {

    for(var i = 0; i < this.scores.length; i++) {
        if (this.scores[i] > WIN_SCORE){
            console.log("player " + i + "won");
			Game.changeStage(new WinStage(Game.currentStage.connection, Game.currentStage.playerList.length, Game.currentStage.playerList[i], i));
		}
    }
}

ScoreKeeper.prototype.addPoints = function(playerId, points) {
    this.scores[playerId] = (this.scores[playerId] || 0) + points;
}

ScoreKeeper.prototype.draw = function(ctx) {
    for(var i = 0; i < this.homes.length; i++) {
        ctx.font = "12px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText((this.scores[i] || 0) + "pts", (this.homes[i].x) * this.scale + this.homes[i].sprite.width / 2, (this.homes[i].y) * this.scale - 10);
    }
}
