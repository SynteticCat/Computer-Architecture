"use strict";

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдача страницы с массивом учеников
app.get("/games", function(request, response) {
    const age = request.query.age;

    const initGames = [
        {name: "Game Of War", description: "game about war", ageRestriction: 12 },
        {name: "Snoop Dog", description: "game about snoop dog", ageRestriction: 6 },
        {name: "Run by road 4", description: "game about run by road", ageRestriction: 18 },
        {name: "Snikker Jump", description: "game about snikker jump", ageRestriction: 18 },
        {name: "Whole day", description: "game about whole day", ageRestriction: 16 },
        {name: "Among Us", description: "game about among us", ageRestriction: 16 },
        {name: "Cars and Dogs", description: "game about cars and dogs", ageRestriction: 12 }
    ];

    const infoObject = {
        games: initGames.filter(game => game.ageRestriction <= age)
    };

    response.render("pageGames.hbs", infoObject);
});