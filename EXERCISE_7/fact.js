"use strict";

// получаем параметры скрипта
let numb = process.argv[2];
let base = 1;
let result = 1;
while(base <= numb) {
    result *= base;
    base++;
}
console.log(result);
