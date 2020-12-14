"use strict"

const obj = {
    a: {
        b: [
            12,
            { 
                c: 'asd' 
            }
        ]
    },
    d: {
        e: [
            12,
            { 
                f: {
                    g: 34
                } 
            }
        ]
    }
};

function isObject(item) {
    return item === Object(item);
};

function calcObjectDepth(item, n) {
    if (isObject(item)) {

        for (let key in item) {
            const newItem = item[key];
        }
    }

    return 
};
