var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 9898
    });

wss.on('connection', function connection(ws) {
    ws.room = [];
    ws.send("User Joined");

    ws.on('message', function(message) {
        message = JSON.parse(message);
        if (message.join) {
            ws.room.push(message.join);
        }
        if (message.room) {
            broadcast(message);
        }
        if (message.msg) {
            console.log("Server got: " + message.msg);
        }
    });

    ws.on('error', function(er) {
        console.log(er);
    })


    ws.on('close', function() {
        console.log('Connection closed')
    })
});

function broadcast(message) {
    wss.clients.forEach(function each(client) {
        if (client.room.indexOf(message.room) > -1 || message.room == 'all') {
            client.send(message.msg);
        }
    });
}
