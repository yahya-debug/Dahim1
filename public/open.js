var UserInf;
if (!localStorage.getItem('UI')) {
  location.replace('/Login')
}
fetch('/get_user', {
  method: 'POST',
  headers: {
    tok: localStorage.getItem('UI'),
    dev: navigator.userAgent,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}).then(data => data.json()).then(function (res) {
  if (res.msg) {
    location.replace('/Login');
  }
  UserInf = res;
})
