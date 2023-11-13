/*
var mqtt = require('mqtt');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mydb'; // replace mydb with your database name  

var client = mqtt.connect('mqtt://localhost:1883'); // replace with your mqtt broker details  

client.on('connect', function () {
    console.log('connected to mqtt broker');
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        console.log("connected to mongoDB");
        var dbo = db.db("mydb");

        client.subscribe('topic', function (err) {  // replace 'topic' with your topic  
            if (!err) {
                client.on('message', function (topic, message) {
                    // message is Buffer, convert to string  
                    var msg = message.toString();
                    console.log(msg);
                    var myobj = JSON.parse(msg);
                    dbo.collection("mqttData").insertOne(myobj, function (err, res) { // replace "mqttData" with your collection  
                        if (err) throw err;
                        console.log("data inserted");
                        db.close();
                    });
                })
            }
        })
    });
});  

*/