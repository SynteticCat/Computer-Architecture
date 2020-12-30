"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {

    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";

    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            console.log("ERROR!")
            callback(null);
        } else {
            console.log("OK!")
            callback(body);
        }
    });
}

// принимаем GET запрос и отправляем POST запрос на другой сервер
app.get("/select/car", function(request, response) {
    let name = request.query.name;
    if (name[0] === '"') {name = name.slice(1, -1);}
    console.log(name);
    sendPost("http://localhost:5002/select/record", JSON.stringify({
        name: name,
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        response.end(JSON.stringify({
            name: answerObject.name,
            value: answerObject.value,
        }));
    });
});

app.get("/select/storage", function(request, response) {
    let name = request.query.name;
    if (name[0] === '"') {name = name.slice(1, -1);}
    sendPost("http://localhost:5003/select/record", JSON.stringify({
        name: name,
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const cars = answerObject.cars;
        response.end(JSON.stringify({name: name, cars: cars}));
    });
});

app.get("/insert/car", function(request, response) {
    let name = request.query.name;
    if (name[0] === '"') {name = name.slice(1, -1);}
    const value = request.query.value;
    sendPost("http://localhost:5002/insert/record", JSON.stringify({
        name: name,
        value: value,
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end(JSON.stringify({answer: answer}));
    });
});

app.get("/insert/storage", function(request, response) {
    let name = request.query.name;
    let cars = request.query.cars;
    if (name[0] === '"') {name = name.slice(1, -1);}
    if (cars[0] === '"') {cars = cars.slice(1, -1);}
    const value = request.query.value;
    sendPost("http://localhost:5003/insert/record", JSON.stringify({
        name: name,
        cars: cars,
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const answer = answerObject.answer;
        response.end(JSON.stringify({answer: answer}));
    });
});
