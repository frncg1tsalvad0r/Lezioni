var dht = require("DHT11");
const DHT11_16= 17;
dht.connect(DHT11_16);
dht.read(function (a) {
      console.log(a);
      console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());}, 10);

function onInit() {

  setInterval( () => {
    dht.read(function (a) {
      console.log(a);
      console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());});
  }, 1000);
}

onInit();