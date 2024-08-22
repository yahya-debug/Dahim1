const mongoose = require('mongoose');

const post = mongoose.Schema({
  id: Number,
  author: String,
  content: String,
  Date: Date,
  images: [String],
  likes: [String],
  comments: [String],
  url: String,
});
const Post = mongoose.model('Posts', post);

module.exports = { Post };
