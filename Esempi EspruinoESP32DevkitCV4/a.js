// QUESTO PROGRAMMA SI CONNETTE ALLA RETE E AD UN BROKER MQTT
// Alla pressione del tasto viene iniato un messaggio al broker
// Allo stesso tempo il programma si iscrive ad un argomento

const LED16 = 16;
const LED21 = 21;
const BTN18  = 18;

pinMode(LED21, 'output');
pinMode(BTN18, 'input');

//var MQTT_HOST = "raspberrypi";
var MQTT_HOST = "192.168.26.124";

var mqtt = require("MQTT").create(MQTT_HOST);

mqtt.on("connected", function(){
  console.log("connected");
  mqtt.subscribe("esp32In");

});

mqtt.on("message", function(msg){
  console.log("message");
  console.log(msg.topic);
  console.log(msg.message);
});

mqtt.on("published", function(){
    console.log("published");
});

mqtt.on("disconnected", function(){
    console.log("disconnected");
});



mqtt.on('publish', function (pub) {
  console.log("publish");
  console.log("topic: "+pub.topic);
  console.log("message: "+pub.message);
  if (pub.message == "On") {
    digitalWrite(LED21, HIGH);
  }
  if (pub.message == "Off") {
    digitalWrite(LED21, LOW);
  }
});

setWatch(function() {
  console.log("Tasto rilasciato");
  mqtt.publish("esp32Out", "1");
}, BTN18, {edge:"rising",repeat:true,debounce:50});

setWatch(function(){
  console.log("Tasto premuto");
  mqtt.publish("esp32Out", "0");
}, BTN18, {edge:"falling",repeat:true,debounce:50});

console.log("Try to connect");
mqtt.connect(); //Porta 1883
