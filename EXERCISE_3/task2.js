"use strict"

const fs = require("fs");

const stringsReadJSON = fs.readFileSync('task1.json');
const stringsRead = JSON.parse(stringsReadJSON);

const areLettersVowels = str => {
    const vowels = ['e', 'a', 'y', 'u', 'i', 'o'];
    const areVowels = str.split('').every(letter => vowels.includes(letter));
    return areVowels;
}

stringsRead.forEach(str => {
    if (areLettersVowels(str)) {
        console.log(str);
    }
})