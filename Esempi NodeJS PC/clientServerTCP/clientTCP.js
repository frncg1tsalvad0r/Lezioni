var net = require('net');

var client = net.Socket();

var stato = 0;

function invia() {
    if(stato == 0)
        stato = 1;
    else 
        stato = 0;
        
    client.write(''+stato);
}

function connEff() {
    console.log('Ciao client connesso');
    
    setInterval(invia, 2000);
}

client.connect(8080, '127.0.0.1', connEff);
