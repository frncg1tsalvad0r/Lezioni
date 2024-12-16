var net = require('net');

pinMode(21, 'output');

function dataArrivata(dati) {
    var s = dati.toString();
    console.log(s);
    if(s == "A") {
        digitalWrite(21, 1);
    } else if(s == "S") {
        digitalWrite(21, 0);
    }
}

function connessioneEffettuata(socket) {
    socket.on('data', dataArrivata);
}

var server = net.createServer(connessioneEffettuata);

server.listen('8080');
console.log("sono in ascolto sulla porta 8080");