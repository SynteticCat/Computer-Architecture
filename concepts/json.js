"use script"

const manA = {
    name: "James",
    age: 22,
    cards: [142, 167]
};

const manB = {
    name: "Jhon",
    age: 21,
    cards: [444, 312, 888]
};

const swedishFamily = {
    parentA: manA,
    parentB: manB
};

console.log('swedishFamily: ', swedishFamily)

const swedishFamilyJSON = JSON.stringify(swedishFamily);
console.log('swedishFamily in JSON: ', swedishFamilyJSON);

// Человекочитаемый формат, добавил переносы и отступ в 4 пробела
const swedishFamilyFormatedJSON = JSON.stringify(swedishFamily, null, 4);
console.log('swedishFamily in formated JSON: ', swedishFamilyFormatedJSON);

const swedishFamilyObj = JSON.parse(swedishFamilyJSON);
console.log('swedishFamilyObj from JSON to Object: ', swedishFamilyObj);
