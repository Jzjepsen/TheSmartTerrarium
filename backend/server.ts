import express = require('express');
import { connect, getClient } from './db';
import * as prettyjson from 'prettyjson';

const app = express();
const port = 3100;

app.get('/', async (req, res) => {
    try {
        await connect();
        console.log("Connected to MongoDB");
        const dbClient = getClient();
        const dbo = dbClient.db("TerrariumData");

        const query = { deviceId: "device2" };
        const result = await dbo.collection("Data").findOne(query);
        res.send(`<pre>${JSON.stringify(result, null, 2)}</pre>`);
        dbClient.close();
    } catch (error) {
        console.error('Error:', error);
        res.send('Error occurred while fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});  
