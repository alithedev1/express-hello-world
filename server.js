const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://jacksparrow:BJHdgjsagkjgsahRHGf@cluster0.ohjvwzw.mongodb.net';
const client = new MongoClient(uri);

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const dbName = 'World';
const collectionName = 'People';

app.use(cors());
// app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  try {
      // Connect to the MongoDB server
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Retrieve all student data from the collection
      const data = await collection.find({}).toArray();

      // Render the homepage with the student data
      res.send(data);
  } catch (error) {
      // If an error occurs, render an error page
      res.send('No page found', error);
  } finally {
      // Close the MongoDB client connection
      await client.close();
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});