"use strict";

// получаем параметры скрипта
const input = ("" + process.argv[2]).split(" ");

// импортируем библиотеку
const execSync = require('child_process').execSync;

// функция для вызова программы и получения результата её работы
function useCmd(s) {
    const options = {encoding: 'utf8'};
    const cmd = s.toString();
    const answer = execSync(cmd, options);
    return answer.toString();
}

// получаем сумму
let res = ""
for (let numb of input) {
    const sumCommand = `node fact.js ${numb}`;
    res += useCmd(sumCommand).slice(0, -1) + " ";
}
console.log(res);
