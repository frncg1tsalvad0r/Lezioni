var clients = [];

const LED21 = 21;
const BTN18  = 18;

pinMode(BTN18, "input");
pinMode(LED21, "output");


var page = `
<html>
<head>
<script>
window.onload = () => {
  var ws = new WebSocket('ws://' + location.host, 'protocolOne');
  var btn = document.getElementById('btn');
  var led = document.getElementById('led');
  ws.onmessage = evt => {
    btn.innerText = evt.data;
  };
  led.onchange = evt => {
    ws.send(led.value);
  };
};
</script>
</head>
<body>
  <p>Button: <span id="btn">up</span></p>
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
  broadcast(evt.state ? 'down' : 'up');
}, BTN18, {repeat: true, edge: 'both'});

console.log("Connecting Web Server...");
startServer();
