var LED21 = 21;
var  on = false;

// Viene settata una funzione di callback che viene 
// richiamata dai timer ogni secondo
setInterval(function() {
  on = !on;
  digitalWrite(LED21, on);
}, 1000);