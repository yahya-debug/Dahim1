window.addEventListener('load', responsive);
window.addEventListener('resize', responsive);

function responsive() {
  var body = document.querySelector('.body');
  var header = document.querySelector('header');
  if (window.innerWidth < 790) {
    if (body.classList[1] == 'profile') {
      var pb = body.querySelector('.profbody');
      var f = body.querySelector('.Followers');
      if (!pb.querySelector('.Followers')) {
        pb.insertBefore(f, pb.children[0])
        console.log('"obj"');
      }
    }
  } else {
    if (body.classList[1] == 'profile') {
      var ph= body.querySelector('.profhead');
      var f = body.querySelector('.Followers');
      if (!ph.querySelector('.Followers')) {
        ph.appendChild(f)
        console.log('obj');
      }
    }
  }
  if (window.innerWidth < 667) {
    if (body.classList[1] == 'home') {
      var psec = document.querySelector('.home .postsec');
      var stories = document.querySelector('.home .navigation nav .stories > div');
      if (!psec.querySelector('.stories')) {
        stories.classList.add('stories');
        psec.insertBefore(stories, psec.children[0])
      }
    }
  } else {
    if (body.classList[1] == 'home') {
      var nav = document.querySelector('.home .navigation');
      var stories = document.querySelector('.home .postsec .stories');
      if (!nav.querySelector('.stories > div')) {
        stories.classList.remove('stories');
        nav.querySelector('.stories').appendChild(stories)
      }
    }
  }
  if (window.innerWidth < 450) {
    var stsbtn = document.querySelector('header .h_nav > button');
    if (stsbtn) {
      header.appendChild(stsbtn);
    }
  } else {
    var stsbtn = document.querySelector('header .h_nav > button');
    if (!stsbtn) {
      document.querySelector('.h_nav').appendChild(document.querySelector('header > button'));
    }
  }
}
