"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mqtt = __importStar(require("mqtt"));
const prettyjson_1 = __importDefault(require("prettyjson"));
const app = (0, express_1.default)();
const port = 3100;
let terrariumData = []; // This array will store the terrarium data temporarily  
app.get('/', (req, res) => {
    res.send(`<pre>${prettyjson_1.default.render(terrariumData)}</pre>`);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// MQTT client setup  
const client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', () => {
    console.log('Connected to the MQTT broker.');
    client.subscribe('terrariumData', (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Subscribed to the topic terrariumData.');
        }
    });
});
client.on('message', (topic, message) => {
    let messageStr = message.toString();
    console.log(`Received message from topic ${topic}: ${messageStr}`);
    if (topic === 'terrariumData') {
        const data = JSON.parse(messageStr);
        terrariumData.push(data); // Add the received data to the array  
    }
});
