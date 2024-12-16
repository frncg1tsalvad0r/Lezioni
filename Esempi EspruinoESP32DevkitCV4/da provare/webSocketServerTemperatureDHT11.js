var wifi = require('Wifi');

var clients = [];

const LED21 = 21;
const BTN18  = 18;
const DHT11 = 33;

var ssid = "Wind3 HUB-2D8E61";

var WIFI_OPTIONS = {
  password: "3bqaup03odlw2kua"
};

pinMode(BTN18, "input");
pinMode(LED21, "output");

var dht11 = require("DHT11").connect(DHT11);


var page = `
<html>
<head>
<script>
window.onload = () => {
  var ws = new WebSocket('ws://' + location.host, 'protocolOne');
  var led = document.getElementById('led');
  ws.onmessage = evt => {
    btn.innerText = evt.data;
    temp.innerText = evt.data;
  };
  led.onchange = evt => {
    ws.send(led.value);
  };
};
</script>
</head>
<body>
  <p>Button: <span id="btn">...</span></p>
  <p>Temp Rh: <span id="temp">...</span></p>
  <p>
    LED on:
    <select id="led">
      <option>off</option><option>on</option>
    </select>
  </p>
</body>
</html>`;



// Page request handler
function pageHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(page);
}

// WebSocket request handler
function wsHandler(ws) {
  clients.push(ws);
  ws.on('message', msg => {
    digitalWrite(LED21, msg == 'on');
  });
  ws.on('close', evt => {
    var x = clients.indexOf(ws);
    if (x > -1) {
      clients.splice(x, 1);
    }
  });
}


// Create and start server
function startServer() {
  const server = require('ws').createServer(pageHandler);
  server.on('websocket', wsHandler);
  server.listen(8000);
  console.log("Listening Server...");
}




// Send msg to all current websocket connections
function broadcast(msg) {
  clients.forEach(cl => cl.send(msg));
}

// Watch for button events (rising and falling)
setWatch(evt => {
   dht11.read(function (a) {
     let temp = a.temp.toString();
     let rh = a.rh.toString();
     let s = "Temp is "+temp+" and RH is "+rh; 
     console.log(s);
   });
   
   broadcast(evt.state = s);
   //broadcast(evt.state ? 'down' : 'up');
}, BTN18, {repeat: true, edge: 'both'});



console.log("Connecting Web Server...");
startServer();
