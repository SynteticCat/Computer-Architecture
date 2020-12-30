"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");
const way = __dirname;

const sep = /[\n]/;
let content = fs.readFileSync(way + "/storages.txt", "utf8").split(sep);

//console.log(content);
let storages = []
for(let storage of content) {
    storage = storage.split(";");
    storages.push({name: storage[0], cars: JSON.parse(storage[1])})
}

// запускаем сервер
const app = express();
const port = 5003;
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
        let storage_name = obj.name;
        let return_storage;
        for(let storage of storages) {
            if (storage.name === storage_name) {
                return_storage = storage;
                break;
            }
        }
        if (return_storage === null) {
            return_storage = {name: "None", cars: "None"};
        }
        response.end(JSON.stringify({
            name: return_storage.name,
            cars: return_storage.cars,
        }));
    });
});

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        const cars = JSON.stringify(obj.cars.split(","));
        const storage = {name: name, cars: cars};

        storages.push(storage);
        fs.appendFileSync(way + "/storages.txt", ("\n" + storage.name + ";" + storage.cars));

        response.end(JSON.stringify({
            answer: "Storage was successfully added!",
        }));
    });
});