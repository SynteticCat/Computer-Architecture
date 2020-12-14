"use strict"

const fs = require("fs");

function readItemsRec(items, root) {
    items.forEach(item => {
        if (!item.includes('.')) {
            const newRoot = `${root}/${item}`;
            const newItems = fs.readdirSync(newRoot);
            readItemsRec(newItems, newRoot);
        } else {
            const fileContent = fs.readFileSync(`${root}/${item}`);
            if (fileContent.length <= 10) {
                console.log(`In file "${root}/${item}" less or 10 symbols: ${fileContent}`);
            } else {
                console.log(`In file "${root}/${item}" more than 10 symbols`);
            }
        }
    })
}

const items = fs.readdirSync('./task4');
readItemsRec(items, './task4');