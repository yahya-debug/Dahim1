class ID {
  constructor(len) {
    this.len = len;
    this.num = '';
  }
  Gen() {
    var sym = '1234567890';
    for (var i = 0; i < this.len; i++) {
      this.num += sym[Math.floor(Math.random() * 10)];
    }
    return parseInt(this.num);
  }
}
Object.prototype.checkParent = function (parent, child = this) {
  if (child == parent) {
    return true;
  }
  var elpar = child.parentElement;
  while (elpar != null) {
    if (elpar == parent) {
      return true;
    }
    elpar = elpar.parentElement;
  }
  return false;
};
Object.prototype.disn = function () {
  console.log(this);
  this.classList.add('dn');
  this.classList.remove('df');
};
Object.prototype.clickOut = function (important, condition = true, blank = this) {
  if (blank != important && !blank.checkParent(important) && condition) {
    important.remove()
  }
};
