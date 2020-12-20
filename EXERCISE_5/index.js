"use strict"

const fs = require("fs");
const express = require("express");

// запуск сервера
const port = 5000;
const app = express();

// добавляю статические файлы
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка главной страницы
app.get('/', (req, res) => {
    const mainpageContent = fs.readFileSync('./static/index.html', 'utf-8');
    res.send(mainpageContent);
});

app.get('/add', (req, res) => {
    const database = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));
    
    const newPerson = {
        name: req.query.name, 
        email: req.query.email, 
        tel: req.query.tel
    };

    const newResponse = {
        added: false,
        message: `Person with email: '${newPerson.email}' or tel: '${newPerson.tel}' is exist.`
    };

    if (isUniquePerson(database, newPerson)) {
        database.push(newPerson);
        fs.writeFileSync('./database.json', JSON.stringify(database));
        newResponse.added = true;
        newResponse.message = `Person with email: '${newPerson.email}' or tel: '${newPerson.tel}' was added.`;
    }
    
    res.end(JSON.stringify(newResponse));
});

const isUniquePerson = (database, newPerson) => {
    const isUniqueEmail = !database.some(person => person.email === newPerson.email);
    const isUniqueTel = !database.some(person => person.tel === newPerson.tel);
    return isUniqueEmail && isUniqueTel;
}

console.log(`Server on port ${port}`);
app.listen(port);