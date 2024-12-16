
var ssid = 'Redmi Note 11';
var password = 'luisasaraale';

// Consente di settare e salvare (vedere il save)
// la configurazione del WiFi

var wifi = require('Wifi');
wifi.connect(ssid, {password: password}, function() {
    console.log('Connected to Wifi.  IP address is:', wifi.getIP().ip);
  //  wifi.save(); 
  // Al successivo reboot, la scheda leggera indirizzo 
  // IP dalla memoria
});

const BTN18 = 18;

var mqtt = require('MQTT');

var MQTT_HOST = '192.168.233.124';

var connessione = mqtt.connect({host: MQTT_HOST});

connessione.on('disconnected', function(){
  setTimeout(1000, function() {
    console.log('Riconnetti...');
    connessione.connect();
  });
});

setWatch(function() {
  console.log('Tasto rilasciato');
  connessione.publish('/tasto', '1');
}, BTN18, {edge:'rising',repeat:true,debounce:50});

setWatch(function() {
  console.log('Tasto premuto');
  connessione.publish('/tasto', '0');
}, BTN18, {edge:'falling',repeat:true,debounce:50});



