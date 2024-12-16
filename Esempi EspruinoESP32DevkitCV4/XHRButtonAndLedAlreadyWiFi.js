// Programma che coumunica con la scheda attraverso XMLHttpRequest 
const LED21 = 21;
const BTN18  = 18;

pinMode(BTN18, "input");
pinMode(LED21, "output");

var buttonState = 0;


var page = `
<html>
<head>
<meta charset="utf-8">
<script>

window.onload = () => {
    var led = document.getElementById('led');
    var state = document.getElementById("state");
    led.onchange = evt => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         state.innerHTML = this.response;
        }
      };
      state.innerHTML = "Chiamata";
      let query = led.value;
      xhttp.open("POST", "dummy.json?led="+query, true);
      xhttp.send();
    };

};


var buttonState = 0;

setInterval( () => {
  var xhttp1 = new XMLHttpRequest();
  buttonState = document.getElementById("button");
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     state.innerHTML = this.response;
    }
  };
  let query = led.value;
  xhttp1.open("POST", "dummy.json?led="+query, true);
  xhttp1.send();
  }, 1000);

</script>
</head>
<body>
  <p>
    BUTTON<br/>
    <div id="state">&nbsp</div><br/>
    LED <br/>
    <select id="led">
      <option value="0">off</option><option value="1">on</option>
    </select>
  </p>
</body>
</html>`;



setInterval( () => {
  buttonState = digitalRead(BTN18);
  }, 1000);

function onPageRequest(req, res) {
  var a = url.parse(req.url, true);
  res.writeHead(200, {'Content-Type': 'text/html'});
  //console.log(res);
  //console.log(a);
  if(a.pathname == "/dummy.json") {
    if (a.query && "led" in a.query) {
      digitalWrite(LED21, a.query["led"]);
    }
    res.end(buttonState);
  } else {
    res.end(page);
  }
}

console.log("Web Server is listening... on 8080");
require("http").createServer(onPageRequest).listen(8080);
