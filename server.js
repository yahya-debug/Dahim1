const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { User } = require('./models/userSchema');
const io = socketio(server)
require('dotenv').config();

mongoose.connect(`${process.env.MONGO_PASS}`).then(function () {
  console.log('connected to DB');
}).catch(function (err) {
  console.error(err);
})

app.set('socketio', io)
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparser.json({limit: '5gb', extended: true}))
app.use('/', require('./User'));
app.use('/', require('./Post'));
app.use('/:path/:path', express.static(path.join(__dirname, '/public')));

app.get(['/Profile', '/myProfile', '/Chat', '/Notifications', '/'], function (req, res) {
  res.sendFile(path.join(__dirname, '/public/app.html'));
})
app.get(['/Login', '/Signup'], function (req, res) {
  res.sendFile(path.join(__dirname, '/public/Authenticate.html'));
});
app.get('/image/:img', function (req, res) {
  res.sendFile(path.join(__dirname, `/public/${req.params.img}.jpg`));
})

io.on('connection', (socket) => {
  socket.on('post', (data) => {
    User.findOne({ id: data.author, }).select('name image url -_id').then(function (result) {
      data.author = JSON.stringify(result);
      socket.emit('post', data)
    })
  });
});


const PORT = process.env.PORT || 1400;
server.listen(PORT, () => console.log(`Server started on ${PORT}`));
