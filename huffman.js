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
rr.on("data", (chunk) => {
    chunk.split("").forEach( char => {
        if (freqTable[char]) {freqTable[char] ++; }
        else freqTable[char] = 1;
    })


})
rr.on("end", () => {
    let sortedArray = Object.keys(freqTable).slice();
    sortedArray.sort( (a, b) => {
        if (freqTable[a] > freqTable[b]) {
            return 1;
        }
        else if (freqTable[a] < freqTable[b]) {
            return -1;
        }
        else if (freqTable[a] === freqTable[b]) {
            return 0;
        }
        else {
            throw new Error("Sorting error");
        }
    });
    sortedArray.reverse();
    createEncodingObj(sortedArray);

});

let createEncodingObj= (sortedArray) => {
    let encodingObj = {};
    sortedArray.forEach( (char, i) => {
        encodingObj[char] = getBinaryCode(i);
    })
    return encodingObj;
}

let getBinaryCode = (index) => {
    return '1'.repeat(index)+ '0';
}

