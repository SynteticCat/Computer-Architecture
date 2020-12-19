"use strict"

const obj1 = {
    a: {
        b: {
            c: 12,
            d: { 
                e: 'asd' 
            }
        }
    }
};

const obj2 = {
    a: {
        b: {
            c: 12,
            d: () => 123
        }
    }
};

const obj3 = {
    a: {
        b: [
            12,
            { 
                e: 'asd' 
            }
        ]
    }
};

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

console.log('Depth of object 1:', calcObjectDepth(obj1));
console.log('Depth of object 2:', calcObjectDepth(obj2));
console.log('Depth of object 3:', calcObjectDepth(obj3));