var WIFI_NAME = "Redmi Note 11";
var WIFI_OPTIONS = { password : "luisasaraale" };

var wifi;

function onInit() {
  wifi = require("Wifi");
  wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
    if (err) {
      console.log("Connection error: "+err);
      return;
    }
    console.log("Connected!");
    getPage();
  });
}