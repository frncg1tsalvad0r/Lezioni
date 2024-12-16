var http = require('http')
var url = require('url');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(17, 'out'); //use GPIO pin 17, and specify that it is output

const page =’<html> \
            <body> \
            </body> \
            <form type="GET" action="onoff"> \
            <input type="submit" name="on" value="Accendi"> \
            <input type="submit" name="off" value="Spegni"> \
            </form> \
            </html>’;
            
http.createServer(function (req, res) {
    if(req.method = "GET") console.log("GET catturato");
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;
    if(query.on=="Accendi")
        LED.writeSync(1);
    if(query.off=="Spegni")
        LED.writeSync(0);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}).list

