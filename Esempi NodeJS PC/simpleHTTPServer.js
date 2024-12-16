// Crea un Web Server e si mette in ascolto sulla porta 3100. Alla richiesta 
// risponde con "Hello World !!!"

var http = require('http')
var server = http.createServer();
server.on('request', function (_req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("<h1>Hello World !!!</h1>");
});
server.listen(3100);
