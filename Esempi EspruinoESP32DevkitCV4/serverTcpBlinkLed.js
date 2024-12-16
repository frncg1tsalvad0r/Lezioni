//Include il modulo net
const net = require('net');

// The port on which the server is listening.
const port = 8080;
const LED21 = 21;

var intervalID;
var ledState = false;

// Il server si mette in ascolto di un client per effettuare la connessione.
// Pensa al socket come un end point.
var server = net.createServer(function(socket) {
    console.log(`Server listening for connection requests on socket localhost:${port}`);

    console.log('A new connection has been established.');
  
    // La connessione è stata fatta rispondo al client attraverso il socket
    socket.write('Hello Client!!!');

    intervalID = setInterval(blinkLED, 1000); //run the blinkLED function every 250ms
    setTimeout(endBlink, 10000); //stop blinking after 5 seconds

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


// Funzione che fa lampeggiare il led
function blinkLED() {
  if(ledState) {
    digitalWrite(LED21, 1);
  
  } else {
    digitalWrite(LED21, 0);
  }
  ledState = !ledState;
}

// Termina il blinking
function endBlink() { //function to stop blinking
  clearInterval(intervalID); // Stop blink intervals
  digitalWrite(LED21, 0);
}
