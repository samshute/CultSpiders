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
        Game.changeStage(new TestStage(this.connection, this.connections.length));
    }
}

ConnectionStage.prototype.register = function() {
    this.connection.send({Type: MessageTypes.RegisterDisplay });
}

ConnectionStage.prototype.draw = function(ctx) {
    var bg = Util.Sprites.get("splash");
    ctx.drawImage(bg, 0, 0);

    let startX = 1450;
    let startY = 600;
    for (let i = 0; i < this.connections.length; i++) {
        ctx.drawImage(Util.Sprites.get('p' + (i + 1)), startX, startY + i * 95); 
    }
}

ConnectionStage.prototype.onReceive = function(msg) {
    if (msg.Type == MessageTypes.RegisterTalk) {
        if (this.connections.length >= 4) 
            return;

        this.connections.push("placeholder name");
    } else if (msg.Type == MessageTypes.StartTimer) 
        this.startTime = new Date(msg.Data.Time).getTime();
}

Util.Sprites.preload("splash", "assets/splash/background_purple_splash.jpg");
Util.Sprites.preload("p1", "assets/splash/player_connects_1.png");
Util.Sprites.preload("p2", "assets/splash/player_connects_2.png");
Util.Sprites.preload("p3", "assets/splash/player_connects_3.png");
Util.Sprites.preload("p4", "assets/splash/player_connects_4.png");
