"use strict"

// библиотека для создания http сервера
const express = require("express");

// запускаем сервер http://localhost:5000
const app = express();
const port = 5000;
app.listen(port);
console.log("Server on port ", port);

// отправка статических файлов
// можно перейти по адресу http://localhost:5000/code.js
// можно перейти по адресу http://localhost:5000/page.js
// можно перейти по адресу http://localhost:5000/style.js
const way = __dirname + "/static";
app.use(express.static(way));

// подключаем заголовки
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// обработка запроса по адресу http://localhost:5000/sum?a=123&b=3
app.get("/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const s = parseInt(a) + parseInt(b);
    response.end(JSON.stringify({
        result: s
    }));
});