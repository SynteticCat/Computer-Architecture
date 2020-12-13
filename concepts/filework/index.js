"use strict";

const fs = require("fs");

const filename = 'newfile.txt';
const filecontent = 'My heart will go wonderful!';

// проверка существования файла
console.log('Is file "newfile.txt" exist?: ', fs.existsSync(filename));

// создание файла и запись строки в него
fs.writeFileSync(filename, filecontent);
console.log('created file "newfile.txt"');

// проверка существования файла
console.log('Is file "newfile.txt" exist?: ', fs.existsSync(filename));

// чтение из файла
const filecontentRead = fs.readFileSync(filename, 'utf-8');
console.log('read from "newfile.txt": ', filecontentRead)

// удаление файла
fs.unlinkSync(filename);
console.log('deleted file "newfile.txt"');

// проверка существования файла
console.log('Is file "newfile.txt" exist?: ', fs.existsSync(filename));

// чтение файлов в текущем каталоге
const folder = "./";
const files = fs.readdirSync(folder);

console.log('number of files in current catalog "./": ' + files.length);
console.log('files in current catalog "./": ');
files.forEach(file => console.log(file));