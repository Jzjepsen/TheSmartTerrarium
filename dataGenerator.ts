import * as casual from 'casual';
import * as mqtt from 'mqtt';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Connected to the MQTT broker.');

    // Subscribe to a topic (Optional, if you want to receive messages)
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
let moisture = casual.integer(50, 100); // Initial moisture  

setInterval(() => {
    // Determine if the temperature and moisture should go up or down  
    let tempChange = casual.integer(-1, 1);
    let moistureChange = casual.integer(-1, 1);

    // Update temperature and moisture  
    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    moisture = Math.max(50, Math.min(100, moisture + moistureChange));

    const data = {
        temperature: temperature,
        moisture: moisture
    };

    console.log(JSON.stringify(data));

    // Publish the updated data to the MQTT broker
    client.publish('terrariumData', JSON.stringify(data));
}, 100);
