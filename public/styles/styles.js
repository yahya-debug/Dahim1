window.addEventListener('load', responsive);
window.addEventListener('resize', responsive);


function stylesChange(appearance) {
  var root = document.querySelector(':root');
  var hh = document.querySelector('header').offsetHeight;
  root.style.setProperty('--header-h', hh + 'px');
}
function responsive() {
  var body = document.querySelector('.body');
  var header = document.querySelector('header');
  var h_nav = document.querySelector('.h_nav nav');
  if (window.innerWidth < 790) {
    if (body.classList[1] == 'profile') {
      var pb = body.querySelector('.profbody');
      var f = body.querySelector('.Followers');
      if (!pb.querySelector('.Followers')) {
        pb.insertBefore(f, pb.children[0])
      }
    }
  } else {
    if (body.classList[1] == 'profile') {
      var ph= body.querySelector('.profhead');
      var f = body.querySelector('.Followers');
      if (!ph.querySelector('.Followers')) {
        ph.appendChild(f)
      }
    }
  }
  if (window.innerWidth < 667) {
    if (!h_nav.querySelector('button[name="notifications"]')) {
      var nb = document.createElement('button');
      nb.setAttribute('name', 'notifications');
      nb.innerHTML = `<a href="/Notifications" class="innerLink">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7124 19.8802C14.2304 19.8955 14.7391 20.0219 15.2034 20.2506H15.2314C15.6193 20.5671 15.6853 21.1321 15.3805 21.5284C14.8255 22.3226 13.9376 22.8234 12.9668 22.8896C11.9695 23.0085 10.9651 22.7324 10.1711 22.1211C9.76276 21.841 9.49739 21.3982 9.44421 20.9081C9.44421 20.3895 9.92881 20.1488 10.3761 20.0469C10.9001 19.9366 11.4341 19.8807 11.9697 19.8802H13.7124ZM12.5382 2.08333C15.7626 2.08333 19.0895 4.41675 19.4343 7.79649C19.4902 8.49096 19.4343 9.21321 19.4902 9.91693C19.6732 10.8245 20.0943 11.6678 20.711 12.3615C21.0944 12.9315 21.3165 13.5936 21.3541 14.2782V14.4912C21.3598 15.415 21.0287 16.3096 20.4221 17.0098C19.6533 17.8318 18.6101 18.3485 17.4866 18.4635C14.1673 18.8894 10.8066 18.8894 7.4872 18.4635C6.35048 18.3572 5.29261 17.8399 4.5144 17.0098C3.92681 16.3029 3.61868 15.4075 3.64772 14.4912V14.2782C3.68409 13.5961 3.89934 12.9354 4.2721 12.3615C4.89152 11.6671 5.31864 10.8248 5.51155 9.91693C5.56746 9.21321 5.51155 8.50022 5.56746 7.79649C5.92159 4.41675 9.18328 2.08333 12.445 2.08333H12.5382Z" fill="black"/>
      </svg>
      </a>`;
      h_nav.insertBefore(nb, h_nav.children[3])
      h_nav.querySelector('button[name="notifications"]').addEventListener('click', openNoti)
      run();
    }
    if (body.classList[1] == 'home') {
      var psec = document.querySelector('.home .postsec');
      var stories = document.querySelector('.home .navigation nav .stories > div');
      if (!psec.querySelector('.stories')) {
        stories.classList.add('stories');
        psec.insertBefore(stories, psec.children[0])
      }
    }
  } else {
    if (h_nav.querySelector('button[name="notifications"]')) {
      h_nav.querySelector('button[name="notifications"]').remove();
    }
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
  stylesChange(0)
}
