switch (location.pathname) {
  case '/Login':
    changeSite('L')
    break;
  case '/Signup':
    changeSite('S')
    break;
}
function changeSite(p) {
  var form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault()
  });
  var switchbtn = document.querySelector('p button');
  var title = document.querySelector('title');
  if (p == 'L') {
    form.setAttribute('action', '/Login');
    form.innerHTML = `
    <input type='email' placeholder='Email' name="email"/>
    <input type='password' placeholder='Password' name="password" autocomplete="current-password"/>
    <button type='submit'>Login</button>`;
    form.addEventListener('submit', Login);
    switchbtn.textContent = 'Signup';
    switchbtn.addEventListener('click', () => changeSite('S'))
    history.pushState('', {}, '/Login');
    title.textContent = 'Dahim | Login';
  } else {
    form.setAttribute('action', '/Signup');
    form.innerHTML = `
    <input type="name" name="name" placeholder="Name" autocomplete="username"/>
    <input type="email" name="email" placeholder="Email"/>
    <input type="password" name="password" placeholder="Password" autocomplete="new-password"/>
    <input type="date" name="Birth date"/>
    <button type="submit">Signup</button>`;
    form.addEventListener('submit', Signup)
    switchbtn.textContent = 'Login';
    switchbtn.addEventListener('click', () => changeSite('L'))
    history.pushState('', {}, '/Signup');
    title.textContent = 'Dahim | Signup';
  }
}

function err(errfield) {

}
function test(email, pass) {
  var form = document.querySelector('form');
  const ei = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var msg = document.createElement('small');
  msg.classList.add('warn');
  if (!ei.test(email)) {
    msg.textContent = 'Invalid email address';
    form.insertBefore(msg, form.children[0]);
    return false;
  }
  if (pass.length < 8) {
    msg.textContent = 'Password must contain 8 characters at least';
    form.insertBefore(msg, form.children[0]);
    return false;
  }
  return true;
}

function Login(event) {
  var email = event.target.querySelector('input[name="email"]').value.trim(),
      password = event.target.querySelector('input[type="password"]').value.trim(),
      msg = document.createElement('small');
  msg.classList.add('warn');
  if (test(email, password)) {
    new User({ email, password, dev: navigator.userAgent }).Register('/Login').then(function (res) {
      if (res.msg) {
        msg.textContent = res.msg;
        event.target.insertBefore(msg, event.target.children[0]);
        return 0;
      }
      localStorage.setItem('UI', res.tok)
      location.replace('/');
    });
  }
}
function Signup() {
  var name = event.target.querySelector('input[name="name"]').value.trim(),
      email = event.target.querySelector('input[type="email"]').value.trim(),
      password = event.target.querySelector('input[type="password"]').value.trim(),
      birth = event.target.querySelector('input[type="date"]').value.trim(),
      msg = document.createElement('small');
  msg.classList.add('warn');
  if (name.length == 0 || birth.length == 0) {
    msg.textContent = 'Please fill all the fields';
    event.target.insertBefore(msg, event.target.children[0]);
    return false;
  }
  if (test(email, password)) {
    new User({ name, email, password, birth, dev: navigator.userAgent }).Register('/Signup').then(function (res) {
      localStorage.setItem('UI', res.tok)
      location.replace('/');
    });
  }
}
