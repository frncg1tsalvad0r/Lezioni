// Questo esempio mostra come avviare una connessione con i WebSocket
// Il browser, dopo aver caricato la pagina, invia un Hello Espruino alla scheda
// ed il browser risponde Hello Browser
var page = `
<html>
<head>
<script>
  var ws;
  setTimeout(function(){
    ws = new WebSocket("ws://" + location.host + "/my_websocket", "protocolOne");
    ws.onmessage = function (event) {
      console.log("MSG:"+event.data);
    };
    setTimeout(function() { 
      ws.send("Hello Espruino!!");
    }, 1000);
  },1000);
</script>
</head>
<body>
<h1>Hello World... see the console</h1>
</body>
</html>
`;

function onPageRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(page);
}

var server = require('ws').createServer(onPageRequest);
server.listen(8000);
server.on("websocket", function(ws) {
    ws.on('message',function(msg) { print("[WS] "+JSON.stringify(msg)); });
    ws.send("Hello Browser!!!");
});