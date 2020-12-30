"use strict";

window.onload = function() {
    const car_name_input = document.getElementById("car_name_input");
    const btn_car = document.getElementById("button_car");
    const car_name_div = document.getElementById("car_name_div");
    const car_value_div = document.getElementById("car_value_div");


    const car_name_inserting_input = document.getElementById("car_name_inserting_input");
    const car_value_inserting_input = document.getElementById("car_value_inserting_input");
    const button_insert_car = document.getElementById("button_insert_car");
    const inserting_car_status = document.getElementById("inserting_car_status");

    const storage_name_input = document.getElementById("storage_name_input");
    const button_storage_search = document.getElementById("button_storage_search");
    const storage_name_div = document.getElementById("storage_name_div");
    const storage_cars_div = document.getElementById("storage_cars_div");


    const storage_name_inserting_input = document.getElementById("storage_name_inserting_input");
    const storage_cars_inserting_input = document.getElementById("storage_cars_inserting_input");
    const button_insert_storage = document.getElementById("button_insert_storage");
    const inserting_storage_status = document.getElementById("inserting_storage_status");

    // ajax get
    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    }

    // click event
    btn_car.onclick = function() {
        const name = car_name_input.value;
        const url = `/select/car?name=${name}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            car_name_div.innerHTML = "Car name: " + name;
            car_value_div.innerHTML = "Car value: " + objectAnswer.value;
        });
    };

    button_insert_car.onclick = function() {
        const name = car_name_inserting_input.value;
        const value = car_value_inserting_input.value;
        const url = `/insert/car?name=${name}&value=${value}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            inserting_car_status.innerHTML = "Status: " + objectAnswer.answer;
        });
    };


    button_storage_search.onclick = function() {
        const name = storage_name_input.value;
        const url = `/select/storage?name=${name}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            storage_name_div.innerHTML = "Storage name: " + name;
            storage_cars_div.innerHTML = "Storage cars: " + objectAnswer.cars;
        });
    };

    button_insert_storage.onclick = function() {
        const name = storage_name_inserting_input.value;
        const cars = storage_cars_inserting_input.value;
        const url = `/insert/storage?name=${name}&cars=${cars}`;

        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            inserting_storage_status.innerHTML = "Status: " + objectAnswer.answer;
        });
    };
};
