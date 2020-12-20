"use strict";

window.onload = function() {
    const f1 = document.getElementById("field-name");
    const f2 = document.getElementById("field-email"); 
    const f3 = document.getElementById("field-tel"); 
    const btn = document.getElementById("send-info-btn");
    const operationList = document.getElementById("operations-info");

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
        const [name, email, tel] = [f1.value, f2.value, f3.value];
        const url = `/add?name=${name}&email=${email}&tel=${tel}`;
        ajaxGet(url, res => {
            const resJS = JSON.parse(res);
            const [message, added] = [resJS.message, resJS.added];
            const newOperationElement = document.createElement('p');
            const newOperationClass = added ? 'person-added' : 'person-exist';
            newOperationElement.innerHTML = message;
            newOperationElement.classList.add(newOperationClass);
            operationList.append(newOperationElement);
        });
    };
};