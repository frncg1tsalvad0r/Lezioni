var net = require('net');

console.log("Inizio");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(17, 'out'); //use GPIO pin 4, and specify that it is output

const port = 8080;

const server = new net.Server();

server.listen(port, function() {
        console.log('Attesa connessione');

});

var blinkInterval ;

server.on('connection', function(socket) {
        console.log('connessione effettuata');
        blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms
        setTimeout(endBlink, 5000); //stop blinking after 5 seconds
        console.log("Fine");


        socket.write("Accendo Led");
});


function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)

 }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}
