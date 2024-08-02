const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use('/:path/:path', express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/app.html'));
})
app.get('/myProfile', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/app.html'));
})
app.get('/Chat', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/app.html'));
})

const PORT = process.env.PORT || 1400;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
