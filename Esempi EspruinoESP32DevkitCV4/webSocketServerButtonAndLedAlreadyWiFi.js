var client;

const LED21 = 21;
const BTN18  = 18;

pinMode(BTN18, "input");
pinMode(LED21, "output");

var watchID;

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
  client = ws;
  console.log('WebSocket Connected');
  ws.on('message', msg => {
    digitalWrite(LED21, msg == 'on');
  });
  ws.on('close', evt => {
    console.log('WebSocket Disconnected');
    clearWatch(watchID);
  });
}


// Create and start server
function startServer() {
  const server = require('ws').createServer(pageHandler);
  server.on('websocket', wsHandler);
  server.listen(8000);
  console.log("Listening Server...8000");
}



// Watch for button events (rising and falling)
watchID = setWatch(evt => {
  client.send(evt.state ? 'up' : 'down');
}, BTN18, {repeat: true, edge: 'both'});

console.log("Connecting Web Server...");
startServer();
