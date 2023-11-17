var mqtt = require('mqtt');
var { connect, getClient } = require('./db'); // db is our mongo connection module  

var client = mqtt.connect('mqtt://localhost:1883'); // replace with your mqtt broker details      

client.on('connect', async function () {
    console.log('connected to mqtt broker');
    try {
        await connect();
        console.log("connected to mongoDB");
        var dbClient = getClient();
        var dbo = dbClient.db("TerrariumData");

        client.subscribe('terrariumData', function (err: any) {  // replace 'topic' with your topic      
            if (!err) {
                client.on('message', function (topic: any, message: { toString: () => any; }) {
                    // message is Buffer, convert to string      
                    var msg = message.toString();
                    console.log(msg);
                    var myobj = JSON.parse(msg);
                    var query = { deviceId: "device2" };
                    var newvalues = { $set: myobj };
                    dbo.collection("Data").updateOne(query, newvalues, function (err: any, res: any) {
                        if (err) throw err;
                        console.log("data updated");
                        dbClient.close();
                    });
                })
            }
        })
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
});  
