console.log("Hello World !!!");

var intervalID;
var times = 10;
intervalID = setInterval( function () {
    
    if(times > 0)
        console.log("Hello World !!! -" + times);
    else 
        clearInterval(intervalID);
    times--;
    
}, 1000);