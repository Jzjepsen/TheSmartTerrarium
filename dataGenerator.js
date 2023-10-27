"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casual = require("casual");
setInterval(function () {
    var temperature = casual.integer(20, 35); // range for terrarium temperature in Celsius  
    var moisture = casual.integer(50, 100); // range for terrarium moisture in percentage  
    var data = {
        temperature: temperature,
        moisture: moisture
    };
    console.log(JSON.stringify(data));
}, 10000);
