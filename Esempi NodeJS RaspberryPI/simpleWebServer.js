var http = require('http')
http.createServer(function (_req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World");
}).listen(3100);

/*
var http = require('http')
var server = http.createServer();
server.on('request', function (_req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World");
});
server.listen(3100);
*/