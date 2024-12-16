const LED19 = 19;
const LED21 = 21;
const BTN18  = 18;

var WIFI_NAME = "Wind3 HUB-2D8E61";
var WIFI_OPTIONS = { password : "3bqaup03odlw2kua" };
//var MQTT_HOST = "raspberrypi";
var MQTT_HOST = "192.168.1.88";
var PATH = "/esp32/";
var mqtt;
var wifi;

function mqttMessage(pub) {
  console.log(
     "MQTT=> ",pub.topic,pub.message);
  if (pub.topic==PATH+"LED21/set") {
    let v = pub.message!=0;
    digitalWrite(LED21, !v);
    mqtt.publish(PATH+"LED21/status", v?1:0);
  }
  if (pub.topic==PATH+"LED19/set") {
    let v = pub.message!=0;
    digitalWrite(LED19, !v);
    mqtt.publish(PATH+"LED19/status", v?1:0);
  }
}

function mqttConnect() {
  mqtt = require("MQTT").connect({
    host: MQTT_HOST,
  });
  mqtt.on('connected', function() {
    console.log("MQTT connected");
    // subscribe to wildcard for our name
    mqtt.subscribe(PATH+"#");
  });
  mqtt.on('publish', mqttMessage);
  mqtt.on('disconnected', function() {
    console.log("MQTT disconnected... reconnecting.");
    setTimeout(function() {
      mqtt.connect();
    }, 1000);
  });
}


setWatch(function() {
  if (!mqtt) return;
  mqtt.publish(
    PATH+"BTN18",
    1);
}, BTN18, {edge:"rising",repeat:true,debounce:50});

setWatch(function() {
  if (!mqtt) return;
  mqtt.publish(
    PATH+"BTN18",
    0);
}, BTN18, {edge:"falling",repeat:true,debounce:50});


mqttConnect();
