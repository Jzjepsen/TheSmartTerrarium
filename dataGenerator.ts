import * as casual from 'casual';
import * as mqtt from 'mqtt';

const TEMP_MIN = 0;  
const TEMP_MAX = 50; 

const HUMIDITY_MIN = 20;   
const HUMIDITY_MAX = 100; 

interface ITerrariumData {
    temperature: number;
    humidity: number;
}

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Connected to the MQTT broker.');

    client.subscribe('terrariumData', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Subscribed to the topic terrariumData.');
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message from topic ${topic}: ${message.toString()}`);
});

let temperature = casual.integer(TEMP_MIN, TEMP_MAX);
let humidity = casual.integer(HUMIDITY_MIN, HUMIDITY_MAX);

setInterval(() => {
    let tempChange = casual.integer(-1, 1);
    let humidityChange = casual.integer(-1, 1);

    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    humidity = Math.max(50, Math.min(100, humidity + humidityChange));

    const data: ITerrariumData = {
        temperature: temperature,
        humidity: humidity
    };

    console.log(JSON.stringify(data));

    client.publish('terrariumData', JSON.stringify(data));
}, 100);  
