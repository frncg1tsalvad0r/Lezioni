	
pinMode(21, 'output');
pinMode(18, 'input');

while(true) {
  var val = digitalRead(18);
  if(val == 0) {
    digitalWrite(21, 0);
  } else {
    digitalWrite(21, 1);
  }
  
}