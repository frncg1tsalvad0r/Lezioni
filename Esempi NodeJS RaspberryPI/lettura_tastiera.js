const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (key, data) => {
  if (data.ctrl && data.name === 't') {
    process.exit();
  } else {
    console.log('key', key);
    console.log('data', data);
  }
});
console.log('Press a key');
