
// server.js
const app = require('express')();
const https = require('https');
const fs = require('fs');
const { Server } = require("socket.io");

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var messages=[{
  id: 1,
  text: "Hola! Soy un mensaje de prueba",
  author: "Anonimo"
}];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



let server = https.createServer(options, app)
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});