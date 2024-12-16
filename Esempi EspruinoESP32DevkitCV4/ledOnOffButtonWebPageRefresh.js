var ssid = 'Wind3 HUB-2D8E61';
var password = '3bqaup03odlw2kua';

var wifi = require('Wifi');

wifi.connect(ssid, {password: password}, function() {
    console.log('Connected to Wifi.  IP address is:', wifi.getIP().ip);
    wifi.save(); // Next reboot will auto-connect
});

const LED21 = 21;
const BTN18  = 18;

pinMode(LED21, "output");
pinMode(BTN18, "input");



function onPageRequest(req, res) {
  var a = url.parse(req.url, true);
  if (a.query && "led" in a.query)
    digitalWrite(21, a.query.led);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head>');
  res.write('<meta http-equiv="refresh" content="1">');
  res.write('</head><body>');
  res.write('<p>Button on 18 is '+ (digitalRead(BTN18) == 1 ?'ON':'OFF')+ '</p>');
  res.write('<p>Pin on 21 is '+ (digitalRead(LED21) == 1 ?'ON':'OFF')+ '</p>');
  res.write('<a href="?led=1">on</a><br/><a href="?led=0">off</a>');
  res.end('</body></html>');
}
require("http").createServer(onPageRequest).listen(8080);