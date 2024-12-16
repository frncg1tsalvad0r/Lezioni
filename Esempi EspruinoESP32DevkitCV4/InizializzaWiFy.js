/**
 * Inizializzazione della scheda WiFi
 */
 
var ssid = 'Redmi Note 11';
var password = 'luisasaraale';

// Consente di settare e salvare (vedere il save)
// la configurazione del WiFi

var wifi = require('Wifi');
wifi.connect(ssid, {password: password}, function() {
    console.log('Connected to Wifi.  IP address is:', wifi.getIP().ip);
    wifi.save(); // Al successivo reboot, la scheda leggerà l'indirizzo IP dalla memoria
});
