const mongoose = require('mongoose');

const user = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  Birth: Date,
  url: String,
  token: String,
  bio: String,
  phone: [String],
  image: {
    type: String,
    default: './noImagde_user.jpg'
  },
  search: [String],
  followers: [String],
  following: [String],
  blocked: [String],
  chats: [String],
  devices: [String],
  settings: {
    theme: String,
  },
});
const User = mongoose.model('Users', user);

class User_ {
  constructor(id) {
    this.id = id;
  }
}

module.exports = { User };
