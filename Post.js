const router = require('express').Router();
const ID = require('./Libraries/ID.js');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Post } = require('./models/postSchema');
const { User, User_ } = require('./models/userSchema');

router.get('/posts/:param', function (req, res) {
  var response = []
  switch (req.params.param) {
    case 'all':
      Post.find({}).select('-_id').then(function (data) {
        for (var i = 0; i < data.length; i++) {
          User_.getInfo(data[i], function (result) {
            response.push(result);
            if (response.length == data.length) {
              res.send(response);
            }
          })
        }
      })
      break;
    default:
      Post.find({ author: req.params.param, }).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          User_.getInfo(data[i], function (result) {
            response.push(result);
            if (response.length == data.length) {
              res.send(response);
            }
          })
        }
      })
  }
});
router.post('/posts/new', function (req, res) {
  let images = req.body.images;
  let srcs = Object.values(images);
  for (var i = 0; i < Object.keys(images).length; i++) {
    srcs[i] = srcs[i].replace(`data:image/jpeg;base64`, '');
    fs.writeFileSync(path.join(__dirname, `/public/sources/${Object.keys(images)[i]}.jpg`), Buffer.from(srcs[i], 'base64'))
  }
  let toDB = req.body;
  toDB.images = Object.keys(images);
  new Post(toDB).save().then(function () {});
})
router.delete('/posts/:post', function (req, res) {
  Post.findOne({ id: req.params.post, }).select('author').then(function (data) {
    if (data.author == req.headers.uid) {
      Post.findOneAndDelete({ id: req.params.post, }).then(function () {
        res.send({})
      })
    }
  })
})

module.exports = router;
