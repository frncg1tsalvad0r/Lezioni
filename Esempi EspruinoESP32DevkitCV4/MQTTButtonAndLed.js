// QUESTO PROGRAMMA SI CONNETTE ALLA RETE E AD UN BROKER MQTT
// Alla pressione del tasto viene iniato un messaggio al broker
// Allo stesso tempo il programma si iscrive ad un argomento

const LED16 = 16;
const LED21 = 21;
const BTN18  = 18;

//var MQTT_HOST = "raspberrypi";
var MQTT_HOST = "192.168.233.124";
var MAIN_TOPIC = "/esp32/";
var mqtt;
var wifi;

function mqttMessage(pub) {
  console.log(
     "MQTT=> ",pub.topic,pub.message);
  if (pub.topic==MAIN_TOPIC+"LED21/set") {
    let v = pub.message!=0;
    digitalWrite(LED21, v);
    mqtt.publish(MAIN_TOPIC+"LED21/status", v?1:0);
  }
  if (pub.topic==MAIN_TOPIC+"LED16/set") {
    let v = pub.message!=0;
    digitalWrite(LED16, v);
    mqtt.publish(MAIN_TOPIC+"LED16/status", v?1:0);
  }
}

function mqttConnect() {
  mqtt = require("MQTT").connect({
    host: MQTT_HOST,
  });
  mqtt.on('connected', function() {
    console.log("MQTT connected");
    // subscribe to wildcard for our name
    mqtt.subscribe(MAIN_TOPIC+"#");
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
    MAIN_TOPIC+"BTN18",
    1);
}, BTN18, {edge:"rising",repeat:true,debounce:50});

setWatch(function() {
  if (!mqtt) return;
  mqtt.publish(
    MAIN_TOPIC+"BTN18",
    0);
}, BTN18, {edge:"falling",repeat:true,debounce:50});


mqttConnect();
