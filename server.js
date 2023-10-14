const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.get('/data', (req, res) => {
  res.send({
    name: 'Ali',
    age : '20'
  })
})

app.use(cors());
app.use(express.static(__dirname + '/public'));


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
