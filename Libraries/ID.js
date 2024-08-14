class ID {
  constructor(len) {
    this.len = len;
    this.pass = '';
  }
  Gen() {
    var sym = '1234567890';
    for (var i = 0; i < this.len; i++) {
      this.pass += sym[Math.floor(Math.random() * 10)];
    }
    return this.pass;
  }
}
module.exports = ID;
