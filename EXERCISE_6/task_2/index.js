"use strict";

// импортируем библиотеки
const fs = require("fs");
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// выдача страницы с массивом учеников
app.get("/personal/info", function(request, response) {
    const cookie = request.session;

    const personCookie = {
        login: cookie.login,
        password: cookie.password,
        age: cookie.age
    };

    if (!personCookie.login || !personCookie.password || !personCookie.age) {
        response.render("personalPage.hbs", {});
    } else {
        const signedIn = () => {
            const persons = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

            const res = persons.some(person => {
                const isLogin = person.login === personCookie.login;
                const isPassword = person.password === personCookie.password;
                const isAge = person.age === personCookie.age;
                return isLogin && isPassword && isAge;
            });


            return res;
        };

        const hasCookie = () => {
            return personCookie.login && personCookie.password && personCookie.age;
        }

        const infoObject = {
            signedIn: signedIn(),
            hasCookie: hasCookie(),
            login: personCookie.login,
            password: personCookie.password,
            age: personCookie.age
        };
    
        response.render("personalPage.hbs", infoObject);
    }
});

app.get("/personal/add", function(request, response) {
    const query = request.query;
    // получаем параметры запроса
    const [ login, password, age ] = [ query.login, query.password, query.age ];

    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    if(!age) return response.end("Age not set");

    // выставляем cookie
    request.session.login = login;
    request.session.password = password;
    request.session.age = age;

    // добавляем инцормацию в data.json
    const persons = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    persons.push({ login, password, age });
    fs.writeFileSync('./data.json', JSON.stringify(persons));

    // отправляем ответ об успехе операции
    response.end("User added successfuly to cookie and database");
});

// // получить cookie
// app.get("/api/get", function(request, response) {
//     // контролируем существование cookie
//     if(!request.session.login) return response.end("Not exists");
//     if(!request.session.age) return response.end("Not exists");
//     // отправляем ответ с содержимым cookie
//     const login = request.session.login;
//     const age = request.session.age;
//     response.end(JSON.stringify({
//         login,
//         age
//     }));
// });

// // удалить все cookie
// app.get("/api/delete", function(request, response) {
//     request.session = null;
//     response.end("Delete cookie ok");
// });