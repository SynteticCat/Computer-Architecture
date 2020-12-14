"use strict"

const fs = require("fs");
const readlineSync = require("readline-sync");

const root = 'task5';
const arr = [];
const n = readlineSync.questionInt('enter integer: ');

for (let i = 0; i < n; i++) {
    const str = readlineSync.question(`enter filename #${i + 1}: `);
    arr.push(str);
}

let mixcontent = '';
arr.forEach(filename => {
    mixcontent += fs.readFileSync(`${root}/${filename}`, 'utf-8');
});

const dst = `${root}/dst.txt`;
fs.writeFileSync(dst, mixcontent);