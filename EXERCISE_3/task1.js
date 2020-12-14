"use strict"

const fs = require("fs");
const readlineSync = require("readline-sync");

// task1
const strings = [];
const n = readlineSync.questionInt('enter integer: ');

for (let i = 0; i < n; i++) {
    const str = readlineSync.question(`enter string #${i + 1}:`);
    strings.push(str);
}

const stringsJSON = JSON.stringify(strings);

fs.writeFileSync('task1.json', stringsJSON);