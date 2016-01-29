"use strict";

function ConnectionStage(url) {
    StageBase.call(this);

    this.url = url;
    this.connections = [];
    this.connection = new Connection(url, {
        onConnect: this.register.bind(this),
        onReceive: this.onReceive.bind(this),
    });

    this.startTime = null;
}

ConnectionStage.prototype = Object.create(StageBase.prototype);
ConnectionStage.prototype.constructor = ConnectionStage;

ConnectionStage.prototype.update = function(timestamp) {
    if (this.startTime !== null && new Date().getTime() > this.startTime) {
        Game.changeStage(new TestStage());
    }
}

ConnectionStage.prototype.register = function() {
    this.connection.send({Type: MessageTypes.RegisterDisplay });
}

ConnectionStage.prototype.draw = function(ctx) {
    ctx.font = "30px Arial";
    if (this.startTime === null)
        ctx.fillText("Waiting on connections...", 10, 50);
    else
        ctx.fillText("Starting game in " + (this.startTime - new Date().getTime()) / 1000, 10, 50); 

    ctx.font = "18px Arial";

    let y = 100;
    let playerId = 1;
    for(let conn of this.connections) {
        ctx.fillText("Player " + playerId + " connected", 10, y + playerId * 20);
        playerId++;
    }
}

ConnectionStage.prototype.onReceive = function(msg) {
    if (msg.Type == MessageTypes.RegisterTalk)
        this.connections.push("placeholder name");
    else if (msg.Type == MessageTypes.StartTimer) 
    {
        this.startTime = new Date(msg.Data.Time).getTime();
    }
}
