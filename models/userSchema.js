const mongoose = require('mongoose');

const user = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  Birth: Date,
  url: String,
  token: String,
  bio: {
    type: String,
    default: '',
  },
  phone: [String],
  image: {
    type: String,
    default: '/noImagde_user.jpg'
  },
  search: [String],
  followers: [String],
  following: [String],
  blocked: [String],
  chats: [String],
  devices: [String],
  settings: {
    theme: {
      type: String,
      default: 'light',
    },
  },
});
const User = mongoose.model('Users', user);

class User_ {
  constructor(id) {
    this.id = id;
  }
  static getInfo(data, callBack) {
    User.findOne({ id: data.author, }).select('id name image url -_id').then(function (res) {
      data.author = JSON.stringify(res);
      callBack(data)
    })
  }
}

module.exports = { User, User_ };
