const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('set username', (username) => {
    socket.username = username;
    io.emit('user joined', username);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('user left', socket.username);
    }
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', { username: socket.username, message });
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
