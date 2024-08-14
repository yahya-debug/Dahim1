const router = require('express').Router();
const bcrypt = require('bcrypt');
const ID = require('./Libraries/ID');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('./models/userSchema');
let newMem;

// user authentication
router.post('/Signup', function (req, res) {
  const { name, email, password, birth, dev } = req.body;
  const ei = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (name.trim() == '' || !ei.test(email) || email.trim() == '' || password.trim() == '' || dev == '') {
    res.send({ msg: 'error' })
    return;
  }
  bcrypt.hash(password, password.length, function (err, hash) {
    newMem = {
      id: uuidv4(),
      name: name,
      email: email,
      birth: birth,
      url: `Profile/${new ID(20).Gen()}`,
      devices: [dev],
    }
    jwt.sign({newMem}, process.env.sk, function (err, tok) {
      newMem.password = hash;
      newMem.token = tok;
      new User(newMem).save().then(function (data) {
        res.json({ tok });
      })
    })
  })
})
router.post('/Login', function (req, res) {
  const { email, password, dev } = req.body;
  if (email.trim() == '' || password.trim() == '' || dev == '' || !dev) {
    res.send({ msg: 'error' })
    return 0;
  }
  User.find({ email: email, }).then(function (users) {
    if (users.length == 0) {
      res.send({ msg: 'No user with this email', })
      return 0;
    }
    var ress, u;
    for (var i = 0; i < users.length; i++) {
      u = i;
      bcrypt.compare(password, users[i].password, function (err, result) {
        if (!result && !res.headersSent) {
          return res.send({ msg: 'Wrong password!', });
        }
        if (result && !res.headersSent) {
          res.send({ tok: users[u].token, })
        }
      })
    }
  })
})
router.post('/get_user', function (req, res) {
  const { tok, dev } = req.headers;
  User.findOne({ token: tok, devices: dev }).then(function (result) {
    console.log(result);
    if (!result) {
      return res.send({ msg: 'err' })
    }
    const send = {
      id: result.id,
      name: result.name,
      url: result.url,
      image: result.image,
    }
    res.send(send)
  })
})
module.exports = router;
