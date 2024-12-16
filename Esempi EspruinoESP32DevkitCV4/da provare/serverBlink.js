var net = require('net');
pinMode(21, 'output');


function datiRicevuti(pezzi) {
   var stato = pezzi.toString();
  
    if(stato == 0) 
      digitalWrite(21, 0);
    else
      digitalWrite(21, 1);
    console.log(pezzi.toString());
}

function connEffServ(socket) {
    console.log('Ciao server connesso');
    
    socket.on('data', datiRicevuti);
}

var server = net.createServer(connEffServ);
server.listen(8080);
console.log('in ascolto');