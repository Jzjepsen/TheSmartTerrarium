const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://TST-user:TSTPW2023@thesmartterrarium.jrqzew4.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

function getClient() {
  return client;
}

module.exports = { connect, getClient };