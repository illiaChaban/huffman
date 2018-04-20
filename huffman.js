const fs = require('fs');

const rr = fs.createReadStream('text.txt');
rr.setEncoding('UTF-8');

let freqTable = {};

// rr.on('readable', () => {
//     while ( rr.readableLength > 0) {
//         let chunk = rr.read(1);
//         console.log(chunk)
//         if (freqTable.chunk) {freqTable.chunk ++; }
//         else freqTable.chunk = 1;
//     }



// });
rr.on('data', (chunk) => {
    chunk.split('').forEach( char => {
        if (freqTable[char]) {freqTable[char] ++; }
        else freqTable[char] = 1;
    })
    

})
rr.on('end', () => {
  console.log('end');
  console.log(freqTable)
});