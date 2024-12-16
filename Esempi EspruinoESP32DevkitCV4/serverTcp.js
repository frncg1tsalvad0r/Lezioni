//Include il modulo net
const net = require('net');

// The port on which the server is listening.
const port = 8080;



// Il server si mette in ascolto di un client per effettuare la connessione.
// Pensa al socket come un end point.
var server = net.createServer(function(socket) {
    console.log(`Server listening for connection requests on socket localhost:${port}`);

    console.log('A new connection has been established.');

    // La connessione è stata fatta rispondo al client attraverso il socket
    socket.write('Hello Client!!!');

    // Eventuale dati inviati dal client vengono trattati così
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);
    });

    // Se il client richiede la sconnessione TCP al server 
    // il server termina la connessione
    socket.on('close', function() {
        console.log('Closing connection with the client');
    });

});

console.log(`Listening at port ${port}`);
server.listen(port);