// Inlcude 
var net = require('net');

var client = new net.Socket();
// Connetto all'host locale 
client.connect(8080, '127.0.0.1', function() {
    
	console.log('Connected');
    
    // Uso il socket per spedire dati al server
	client.write('\n');
	client.write('END\n');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // Termina bruscamente la connessione
});

client.on('close', function() {
	console.log('Connection closed');
});