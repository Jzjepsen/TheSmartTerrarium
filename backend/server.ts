import express from 'express';
import * as mqtt from 'mqtt';
import prettyjson from 'prettyjson';

const app = express();
const port = 3100;

let terrariumData: any[] = []; // This array will store the terrarium data temporarily  

app.get('/', (req, res) => {
    res.send(`<pre>${prettyjson.render(terrariumData)}</pre>`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// MQTT client setup  
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('Connected to the MQTT broker.');

    client.subscribe('terrariumData', (err: any) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Subscribed to the topic terrariumData.');
        }
    });
});

client.on('message', (topic: string, message: Buffer) => {
    let messageStr = message.toString();
    console.log(`Received message from topic ${topic}: ${messageStr}`);
    if (topic === 'terrariumData') {
        const data = JSON.parse(messageStr);
        terrariumData.push(data); // Add the received data to the array  
    }
});  
