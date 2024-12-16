var http = require("http");

function richiestaRisorsa(req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head>');
  res.write('</head><body>');
  res.write('<h1>Benvenuti al corso IOT</h1>');
  res.write(`<form method="post" action="accendi">`);
  res.write(`<input type="submit">`);
  res.write(`</form>`);
  res.end('</body></html>');
  console.log(req);
}
let server = http.createServer(richiestaRisorsa);
server.listen(8080);