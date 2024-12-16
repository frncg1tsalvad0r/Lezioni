var client = require("net").connect({host: "192.168.233.124", port: 1883}, function() {
    console.log('client connected');
    client.write("Hello");
    client.on('data', function(data) {
      console.log(">"+JSON.stringify(data));    
    });
    client.on('end', function() {
      console.log('client disconnected');
    });
  });