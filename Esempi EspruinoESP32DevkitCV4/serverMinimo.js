var net = require('net');


function dataArrivata(dati) {
    console.log(dati.toString());
}

function connessioneEffettuata(socket) {
    sk = socket;
    sk.on('data', dataArrivata);
    sk.write("Ciao client");
}

var server = net.createServer(connessioneEffettuata);

server.listen('8080');