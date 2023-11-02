import * as casual from 'casual';
import * as mqtt from 'mqtt';

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

let temperature = casual.integer(20, 35); // Initial temperature    
let humidity = casual.integer(60, 90); // Initial humidity    

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
