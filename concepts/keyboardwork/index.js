"use strict"

const readlineSync = require("readline-sync");

const a = readlineSync.questionInt("enter digit a: ");
const b = readlineSync.questionInt("enter digit b: ");
console.log("summ of a and b: ", a + b);

