 "use strict";

const express = require("express");
const fs = require("fs");

// Запустить сервер
const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

// Реализовать страницу с формой ввода для отправки запроса на сервер
app.get("/", function(request, response) {
    const htmlContent = fs.readFileSync('./index.html', "utf8");
    response.end(htmlContent);
});

// Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них
app.get("/compare", function(request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c);
    const max = a > b ? (a > c ? a : c) : (b > c ? b : c);
    const answer = `Answer: ${max}`;
    response.end(answer);
});

// Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу
app.get("/json", function(request, response) {
    const index = parseInt(request.query.index);
    const arrJSON = fs.readFileSync('./data.json', 'utf-8');
    const arr = JSON.parse(arrJSON);
    let answer = `
        <p>Array: ${arrJSON}</p>
        <p>Index: ${index}</p>
        <p>Element: ${JSON.stringify(arr[index])}</p>
    `;
    response.end(answer);
});

// Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу
app.get("/generate", function(request, response) {
    const fields = request.query.fields.split(' ');

    const fieldsHTML = fields.map(field => `
        <p>Введите ${field}:</p>
        <input name='${field}' spellcheck="false" autocomplete="off"/>
    `).join('');

    let answer = `
        <h1>Форма GET запроса ${address}</h1>
        <form method="GET" action='${address}'>
            ${fieldsHTML}
            <br />
            <br />
            <input type="submit" value="Вычислить" />
        </form>
    `;

    response.end(answer);
});

