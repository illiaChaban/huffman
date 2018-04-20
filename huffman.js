const fs = require('fs');

const rr = fs.createReadStream('text.txt');
rr.setEncoding('UTF-8');

let freqTable = {};
let originalString = "";

rr.on("data", (chunk) => {
    originalString += chunk;
    chunk.split("").forEach( char => {
        if (freqTable[char]) {freqTable[char] ++; }
        else freqTable[char] = 1;
    })


})
rr.on("end", () => {
    let sortedArray = getSortedArray(freqTable);
    let encodingObj = createEncodingObj(sortedArray);
    let output = encodeMessage(originalString, encodingObj);
    console.log(output);
    console.log('###################')
    console.log(decodeMessage(output, encodingObj));
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

let encodeMessage = (msg, encodingObj) => {
    let encoded = '';
    msg.split('').forEach( char => {
        encoded += encodingObj[char];
    })
    return encoded;
}

let decodeMessage = (encodedMsg, encodingKey) => {
    let sortedArray = getSortedArray(encodingKey, true)
    let msg = '';
    let count = 0;
    for (let x of encodedMsg) {
        if (x === '1') {
            count++;
        } else {
            msg += sortedArray[count];
            count = 0;
        }
    }
    return msg;
}

let getSortedArray = (sortedObj, reverse = false) => {
    let arr = Object.keys(sortedObj);
    let sorted = arr.sort( (a,b) => sortedObj[b] - sortedObj[a]);
    if (reverse) sorted.reverse();
    return sorted;
}
