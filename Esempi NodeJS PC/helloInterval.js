let conta = 0;
function scaduto() {
    console.log(`Intervallo ${conta}`); 
	conta++;	
}

setInterval(scaduto, 1000);
console.log("Settato intervallo di timeout");