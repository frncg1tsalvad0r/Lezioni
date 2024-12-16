/**
 * Inizializzazione della scheda WiFi
 */
var MQTT_HOST = '192.168.26.124';

//var ssid = 'TPL3';
//var password = 'tipilinktre';
var ssid = 'Redmi Note 11';
var password = 'luisasaraale';

// Consente di settare e salvare (vedere il save)
// la configurazione del WiFi
/*
var wifi = require('Wifi');
wifi.connect(ssid, {password: password}, function() {
    console.log('Connected to Wifi.  IP address is:', wifi.getIP().ip);
    wifi.save(); // Al successivo reboot, la scheda leggerà l'indirizzo IP dalla memoria
});
*/
var con = require('MQTT').connect({host: MQTT_HOST});

const BTN18 = 18;
con.on('disconnected', function(){
  setTimeout(1000, function() {
    console.log('Riconnetti...');
    con.connect();
  });
});

setWatch(function() {
  console.log("Tasto rilasciato");
  con.publish("tasto", "1");
}, BTN18, {edge:"rising",repeat:true,debounce:50});

setWatch(function(){
  console.log("Tasto premuto");
  con.publish("tasto", "0");
}, BTN18, {edge:"fa lling",repeat:true,debounce:50});

