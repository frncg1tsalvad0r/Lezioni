var net = require('net');


function datiRicevuti(pezzi) {
    console.log(pezzi.toString());
}

function connEffServ(socket) {
    console.log('Ciao server connesso');
    
    socket.on('data', datiRicevuti);
}

var server = net.createServer(connEffServ);
server.listen(8080);
