const router = require('express').Router();
const ID = require('./Libraries/ID.js');
const bodyparser = require('body-parser');
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
  new Post(req.body).save().then(function () {});
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
