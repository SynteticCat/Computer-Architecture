"use strict"

const fs = require("fs");
const readlineSync = require("readline-sync");

const fileExtention = readlineSync.question('enter extention (without point): ');
const filenames = fs.readdirSync('./task3');
console.log('files: ', filenames);

filenames.forEach(filename => {
    if (filename.includes(`.${fileExtention}`)) {
        const content = fs.readFileSync(`./task3/${filename}`, 'utf-8');
        console.log(content);
    }
})