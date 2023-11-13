"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casual = require("casual");
var mqtt = require("mqtt");
var TEMP_MIN = 0;
var TEMP_MAX = 50;
var HUMIDITY_MIN = 0;
var HUMIDITY_MAX = 100;
var client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', function () {
    console.log('Connected to the MQTT broker.');
    client.subscribe('terrariumData', function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Subscribed to the topic terrariumData.');
        }
    });
});
client.on('message', function (topic, message) {
    console.log("Received message from topic ".concat(topic, ": ").concat(message.toString()));
});
var temperature = casual.integer(TEMP_MIN, TEMP_MAX);
var humidity = casual.integer(HUMIDITY_MIN, HUMIDITY_MAX);
setInterval(function () {
    var tempChange = casual.integer(-1, 1);
    var humidityChange = casual.integer(-1, 1);
    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    humidity = Math.max(60, Math.min(90, humidity + humidityChange));
    var data = {
        temperature: temperature,
        humidity: humidity
    };
    console.log(JSON.stringify(data));
    client.publish('terrariumData', JSON.stringify(data));
}, 100);
