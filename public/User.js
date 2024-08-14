class User {
  constructor(obj) {
    this.user = obj;
  }
  Register(Req){
    return fetch(Req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(this.user)
    }).then(function (data) {
      return data.json();
    })
  }
  get() {
    
  }
}
