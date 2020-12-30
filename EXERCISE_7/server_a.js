"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");
const way = __dirname;

const sep = /[\n]/;
let content = fs.readFileSync(way + "/cars.txt", "utf8").split(sep);
console.log(content);

let cars = []
for(let car of content) {
    car = car.split(";");
    cars.push({name: car[0], value: car[1]})
}
console.log(cars);

// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// приём запроса
app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        let car_name = obj.name;
        let return_car = null;
        for(let car of cars) {
            if (car.name === car_name) {
                return_car = car;
                break;
            }
        }
        if (return_car === null) {
            return_car = {name: "None", value: "None"};
        }
        response.end(JSON.stringify({
            name: return_car.name,
            value: return_car.value,
        }));
    });
});

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        const value = obj.value;
        const car = {name: name, value: value};

        cars.push(car);
        fs.appendFileSync(way + "/cars.txt", ("\n" + car.name + ";" + car.value));

        response.end(JSON.stringify({
            answer: "Car was successfully added!",
        }));
    });
});
