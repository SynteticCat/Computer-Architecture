"use strict"

const fs = require("fs");

function calcObjectDepth(item, n = 0) {
    if (typeof item != 'object') {
        return n;
    } else if (typeof item === 'function') {
        return n;
    //  корректно работает для объектом и для массивов, массивы это тоже объекты
    } else {
        const depths = [];
        for (const key in item) {
            const depth = calcObjectDepth(item[key], n + 1);
            depths.push(depth);
        }
        return Math.max(...depths);
    }
};

const json = fs.readFileSync('./task7/in.json', 'utf-8');
const jsonToObject = JSON.parse(json);
console.log('Вложенность объекта JSON равна ', calcObjectDepth(jsonToObject));