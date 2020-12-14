"use strict";

window.onload = function() {
    const f1 = document.getElementById("field-first");
    const f2 = document.getElementById("field-second");

    const btn = document.getElementById("sum-find-btn");

    const label = document.getElementById("result-label");

    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    btn.onclick = function() {
        const a = f1.value;
        const b = f2.value;
        const url = `/sum?a=${a}&b=${b}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};