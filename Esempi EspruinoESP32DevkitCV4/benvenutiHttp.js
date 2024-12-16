var http = require("http");

function richiestaRisorsa(req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head>');
  res.write('</head><body>');
  res.write('<h1>Benvenuti al corso IOT</h1>');
  res.end('</body></html>');
}
let server = http.createServer(richiestaRisorsa);
server.listen(8080);