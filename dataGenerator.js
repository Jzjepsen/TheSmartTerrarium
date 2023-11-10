"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var casual = require("casual");
var mqtt = require("mqtt");
var client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', function () {
    console.log('Connected to the MQTT broker.');
    // Subscribe to a topic (Optional, if you want to receive messages)
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
var temperature = casual.integer(20, 35); // Initial temperature  
var humidity = casual.integer(50, 100); // Initial humidity  
setInterval(function () {
    // Determine if the temperature and humidity should go up or down  
    var tempChange = casual.integer(-1, 1);
    var humidityChange = casual.integer(-1, 1);
    // Update temperature and humidity  
    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    humidity = Math.max(50, Math.min(100, humidity + humidityChange));
    var data = {
        temperature: temperature,
        humidity: humidity
    };
    console.log(JSON.stringify(data));
    // Publish the updated data to the MQTT broker
    client.publish('terrariumData', JSON.stringify(data));
}, 100);
