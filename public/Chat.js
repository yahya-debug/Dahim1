class Chat {
  constructor(id = null) {
    this.id = id;
  }
  get() {
    fetch(`/allchats/${user.id}`).then(function (data) {
      return data.json();
    }).then(function (res) {
      console.log(res);
    })
  }
}
