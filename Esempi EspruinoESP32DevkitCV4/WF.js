var server = "192.168.1.10"; // the ip of your MQTT broker
var options = { // ALL OPTIONAL - the defaults are below
  client_id : "random",   // the client ID sent to MQTT - it's a good idea to define your own static one based on `getSerial()`
  keep_alive: 60,         // keep alive time in seconds
  port: 1883,             // port number
  clean_session: true,
  protocol_name: "MQTT",  // or MQIsdp, etc..
  protocol_level: 4,      // protocol level
};
var mqtt = require("MQTT").create(server, options /*optional*/);

mqtt.on('connected', function() {
  mqtt.subscribe("test");
});

mqtt.on('publish', function (pub) {
  console.log("topic: "+pub.topic);
  console.log("message: "+pub.message);
});

var WIFI_NAME = "Redmi Note 11";
var WIFI_OPTIONS = { password : "luisasaraale" };
wifi = require("Wifi");
wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log('Connected to Wifi.  IP address is:', wifi.getIP().ip);
  mqtt.connect();
});

