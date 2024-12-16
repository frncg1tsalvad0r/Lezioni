/* 
Questo programma fa lampeggiare un led collegato al PIN 21 della board ESP32DevkitV4. Il tempo di attesa
non è fatto con un timer ma viene fatto attraverso una attesa attiva (busy waiting) facendo svolgere delle
azioni inutili al processore
*/
const LED21 = 21;
const VOLTE = 1000;

// La seguente istruzione è inutile perché se uso il digitalWrite su un pin la porta si programma automaticamente 
// in output. Per chiarezza lo metto lo stesso.
pinMode(LED21, "output");

for(let i = 0; i < 10; i++) {
  // Metto il PIN21 a 1 (alto)
  digitalWrite(LED21, 1);
  for(let j = VOLTE; j> 0; j--) {
  }

  // Metto il PIN21 a 0 (basso)
  digitalWrite(LED21, 0);
  for(let j = VOLTE; j> 0; j--) {
  }
}
