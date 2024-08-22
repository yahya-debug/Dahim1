const socket = io('/');
var UserInf, dark;
if (!localStorage.getItem('UI')) {
  location.replace('/Login')
}
function Dark() {
  document.querySelector('.toggleBtn').classList.toggle('fe');
  if (!dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark')
    fetch(`/settings/edit?user=${UserInf.id}&theme=dark`).then(function () {})
    dark = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light')
    fetch(`/settings/edit?user=${UserInf.id}&theme=light`).then(function () {})
    dark = false;
  }
}
var pu = localStorage.getItem('CU') != null ? localStorage.getItem('CU') : localStorage.getItem('UI');
new User({ tok: pu, dev: navigator.userAgent, }).get().then(function (res) {
  if (res.msg) {
    return location.replace('/Login');
  }
  UserInf = res;
  open();
  if (res.settings.theme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.toggleBtn').classList.add('fe');
    localStorage.setItem('theme', 'dark')
    dark = true;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelector('.toggleBtn').classList.remove('fe');
    localStorage.setItem('theme', 'light')
    dark = false;
  }
})
