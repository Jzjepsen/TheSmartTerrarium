${toc}

# The Idea


![Screenshot 2023-10-27 at 10.43.52.png](:/24ee2a2239dd410db358538702ddc587)


# First steps
Creating a script and running it. 
This script fakes some numbers, later to be changed to seem like analogous numbers, temperature and humidity only changing +/-1 at a time. 

## Step-by-step
First go into the repo:
`cd <project_directory>`

intall packages:
`npm install`
`npm install casual`
`npm install -g typescript`


compile typescript to javascript
`tsc`

run file:
`node dataGenerator.js`

___
# Setting up the MQTT broker
Integrate MQTT functionality into a TypeScript script to send simulated terrarium data (temperature and moisture) to an MQTT broker.

## Steps Taken

### 1. Initialization of the MQTT Broker
Run the Mosquitto MQTT broker:

`mosquitto`

### 2. Updated TypeScript Script
Below is the update TypeScript code:

```typescript

import * as casual from 'casual';
import * as mqtt from 'mqtt';

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
let moisture = casual.integer(50, 100); // Initial moisture  

setInterval(() => {
    let tempChange = casual.integer(-1, 1);
    let moistureChange = casual.integer(-1, 1);
    temperature = Math.max(20, Math.min(35, temperature + tempChange));
    moisture = Math.max(50, Math.min(100, moisture + moistureChange));
    const data = {
        temperature: temperature,
        moisture: moisture
    };
    console.log(JSON.stringify(data));
    client.publish('terrariumData', JSON.stringify(data));
}, 100);
```

### 3. Compile and Run the TypeScript Script
Use the following commands:

`tsc yourScript.ts`
`node yourScript.js`

### 4. Testing & Validation
To Monitor Published Messages:

`mosquitto_sub -t "terrariumData"`


## Result


