const fs = require('fs');
const express = require('express');

const app = express();
const port = "5015";

// запускает приложение и слушает соединения на 5015 порту
app.listen(port);
console.log("My server on port " + port);

// Приложение выдает сумму чисел на запрос, 
// адресованные по url c заданными параметрами
// Для всех остальных путей ответом будет 404 Not Found
app.get("/calculate/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a + b;
    const answerJSON = JSON.stringify(sum);
    res.end(answerJSON);
});

// Приложение выдает html страницу
app.get('/me/page', (req, res) => {
    const htmlpage = req.query.htmlpage;
    if (fs.existsSync(htmlpage)) {
        const goodpage = fs.readFileSync(htmlpage, 'utf-8');
        res.end(goodpage);
    } else {
        const badpage = fs.readFileSync('bad.html', 'utf-8');
        res.end(badpage);
    }
});

