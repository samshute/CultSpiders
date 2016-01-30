"use strict";

// let CONNECTION_URL = "ws://127.0.0.1:6969/game";
let CONNECTION_URL = "ws://54.206.33.185:6969/game";

function Connection(url, opts) {
    this.connected = false;
    this.socket = new WebSocket(url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);

    this.onConnect = opts.onConnect;
    this.onReceive = opts.onReceive;
}

Connection.prototype.onOpen = function(event) {
    console.log(event);

    this.connected = true;

    if (this.onConnect)
        this.onConnect(event);
}

Connection.prototype.onMessage = function(event) {
    var data = JSON.parse(event.data);
    console.log(data);

    if (this.onReceive)
        this.onReceive(data);
}

Connection.prototype.onError = function(event) {
    console.log(event);

    alert("Bad stuff happened, debug it bruh");

    this.connected = false;
}

Connection.prototype.send = function(data) {
    this.socket.send(JSON.stringify(data));
}
