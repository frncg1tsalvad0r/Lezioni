// Inlcude 
var net = require('net');

var client = new net.Socket();
// Connetto all'host locale 
client.connect(8080, '192.168.1.232', function() {
    
	console.log('Connected');
    
    // Uso il socket per spedire dati al server
	client.write('Hello Server!!!');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // Termina la connessione
});

client.on('close', function() {
	console.log('Connection closed');
});