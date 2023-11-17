const { connect, getClient } = require('./db');

async function run() {
  await connect();

  // Your MongoDB operations go here
  const db = getClient().db('TerrariumData');
  const usersCollection = db.collection('Users');
  const dataCollection = db.collection('Data');
  const devicesCollection = db.collection('Devices');

  // Example: Insert a user document
  await usersCollection.insertOne({
    userId: 'user2',
    name: 'john_doe',
    email: 'john.doe@example.com'
  });

  // Example: Insert data
  await dataCollection.insertOne({
    deviceId: 'device2',
    timestamp: new Date(),
    temperature: '25',
    humidity: '30'
  });

  // Example: Insert a device
  await devicesCollection.insertOne({
    deviceId: 'device2',
    userId: 'user2',
    deviceName: 'Terrarium 2',
    deviceNLocation: 'Kitchen'
  });

  // Example: Query documents
  const userData = await usersCollection.find().toArray();
  console.log('Users:', userData);

  const sensorData = await dataCollection.find().toArray();
  console.log('Data:', sensorData);

  const deviceData = await devicesCollection.find().toArray();
  console.log('Devices:', deviceData);

  // Close the MongoDB connection
  getClient().close();
}

run();