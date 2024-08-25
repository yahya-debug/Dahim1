var postsincache, profposts;
postsincache = profposts = [];
class Post {
  constructor(obj) {
    this.post = obj;
  }
  Post() {
    fetch('/posts/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.post),
    }).then(function (data) {
      return data.json();
    }).then(function (res) {
    })
  }
  static get(url) {
    fetch(`/posts${url}`).then(function (data) {
      return data.json();
    }).then(function (res) {
      var area;
      if (url == `/${UserInf.id}`) {
        profposts = res;
        area = document.querySelector('.postsinprof');
      } else {
        postsincache = res;
        area = document.querySelector('.postsec');
      }
      Post.create(res, area)
    })
  }
  static delete(post, el) {
    fetch(`/posts/${post}`, {
      method: 'DELETE',
      headers: {
        uid: UserInf.id,
      },
    }).then(function () {
      el.remove();
    })
  }
  static create(posts, area) {
    console.log(posts);
    for (var i = 0; i < posts.length; i++) {
      if (typeof posts[i].author == 'string') {
        posts[i].author = JSON.parse(posts[i].author);
      }
      var imgs = posts[i].images;
      var imgsdiv = document.createElement('div');
      imgsdiv.classList.add('post_div_img');
      for (var j = 0; j < imgs.length; j++) {
        var img = document.createElement('img');
        img.setAttribute('src', `/image/${imgs[i]}`);
        imgsdiv.appendChild(img);
      }
      var post = document.createElement('div');
      post.classList.add('post');
      post.setAttribute('data-id', posts[i].id);
      post.setAttribute('data-a', (posts[i].author.id || posts[i].id));
      post.innerHTML = `<div class="postinfo">
        <div class="author">
          <img src="${posts[i].author.image}" alt="" class="simg">
          <div>
            <a href="${posts[i].author.url}"><h5>${posts[i].author.name}</h5></a>
            <i class="time">1h ago</i>
          </div>
        </div>
        <button type="button" name="post settings">
          <svg width="25" height="25" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1126_7)">
          <path d="M22 24.75C23.5188 24.75 24.75 23.5188 24.75 22C24.75 20.4812 23.5188 19.25 22 19.25C20.4812 19.25 19.25 20.4812 19.25 22C19.25 23.5188 20.4812 24.75 22 24.75Z" fill="black"/>
          <path d="M11 24.75C12.5188 24.75 13.75 23.5188 13.75 22C13.75 20.4812 12.5188 19.25 11 19.25C9.48122 19.25 8.25 20.4812 8.25 22C8.25 23.5188 9.48122 24.75 11 24.75Z" fill="black"/>
          <path d="M33 24.75C34.5188 24.75 35.75 23.5188 35.75 22C35.75 20.4812 34.5188 19.25 33 19.25C31.4812 19.25 30.25 20.4812 30.25 22C30.25 23.5188 31.4812 24.75 33 24.75Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0_1126_7">
          <rect width="44" height="44" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        </button>
      </div>
      <p class="cont">${posts[i].content}</p>
      <div class="activity">
        <button type="button" name="like">
          <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.9499 11.7833C35.5577 10.2276 34.7605 8.80353 33.6392 7.65595C32.518 6.50836 31.1128 5.67824 29.5666 5.25001C27.6999 4.78334 24.0833 4.61667 19.9999 8.33334C15.9333 4.63334 12.3333 4.78334 10.4666 5.25001C8.91936 5.67426 7.51209 6.50074 6.38793 7.64539C5.26377 8.79004 4.46284 10.212 4.06661 11.7667C3.56008 13.7839 3.60202 15.8999 4.18809 17.8955C4.77417 19.8911 5.88306 21.6937 7.39994 23.1167L18.7833 34.5C18.9415 34.6615 19.131 34.7892 19.3402 34.8751C19.5494 34.9611 19.7738 35.0036 19.9999 35C20.4396 34.9937 20.8589 34.814 21.1666 34.5L32.5499 23.1333C34.0786 21.7175 35.2001 19.918 35.798 17.9221C36.3959 15.9261 36.4484 13.8064 35.9499 11.7833ZM30.1833 20.7667L19.9999 30.9667L9.76661 20.7667C8.66337 19.7637 7.84944 18.483 7.40971 17.0583C6.96999 15.6336 6.92057 14.117 7.26661 12.6667C7.51019 11.6809 8.00759 10.7761 8.70934 10.0422C9.41109 9.30825 10.2927 8.77083 11.2666 8.48334C11.6645 8.38363 12.0731 8.33325 12.4833 8.33334C13.7003 8.44046 14.8835 8.79066 15.9628 9.36322C17.042 9.93578 17.9955 10.7191 18.7666 11.6667C18.9201 11.8322 19.1056 11.9648 19.3119 12.0565C19.5181 12.1482 19.7409 12.197 19.9666 12.2C20.1951 12.1993 20.4211 12.1515 20.6304 12.0598C20.8397 11.968 21.0279 11.8342 21.1833 11.6667C23.7166 9.00001 26.4166 7.85001 28.7666 8.43334C29.7429 8.72556 30.6243 9.27126 31.321 10.0149C32.0178 10.7585 32.5051 11.6735 32.7333 12.6667C33.0733 14.1214 33.016 15.6408 32.5674 17.0659C32.1188 18.4909 31.2954 19.7691 30.1833 20.7667Z" fill="black"/>
          </svg>
          Like
        </button>
        <button type="button" name="comment">
          <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.1817 11.8788C37.5757 11.8788 36.9696 12.4848 36.9696 13.0909C36.9696 13.0909 36.9696 13.0909 36.9696 13.2121V24.9697C36.9696 26.9091 35.3938 28.6061 33.3332 28.6061H30.7878C30.4241 28.6061 30.1817 28.7273 29.9393 28.9697C29.6969 29.2121 29.5757 29.4545 29.5757 29.8182V32.4848L25.0908 28.8485C24.8484 28.7273 24.606 28.6061 24.3635 28.6061H6.66656H6.54535C5.93929 28.6061 5.33323 29.0909 5.33323 29.8182C5.33323 30.4242 5.81808 31.0303 6.54535 31.0303H13.8181H13.9393H23.9999L30.0605 36C30.3029 36.1212 30.5453 36.2424 30.7878 36.2424C31.0302 36.2424 31.1514 36.2424 31.2726 36.1212C31.6363 35.8788 31.9999 35.5151 31.9999 35.0303V31.0303H33.3332C36.7272 31.0303 39.3938 28.3636 39.3938 24.9697V13.0909C39.3938 12.4848 38.7878 11.8788 38.1817 11.8788ZM3.0302 24.9697V9.81818C3.0302 7.87878 4.60596 6.18181 6.66656 6.18181H33.3332C35.2726 6.18181 36.8484 7.75757 36.9696 9.57575C36.9696 10.1818 37.5757 10.7879 38.3029 10.6667C39.0302 10.6667 39.515 10.0606 39.3938 9.45454C39.1514 6.30302 36.606 3.75757 33.4544 3.75757H6.66656C3.27262 3.75757 0.605957 6.42424 0.605957 9.81818V24.9697C0.605957 26.5454 1.21202 28.1212 2.42414 29.3333C2.66656 29.5758 2.90899 29.697 3.27262 29.697C3.63626 29.697 3.87868 29.5758 4.12111 29.3333C4.36353 29.0909 4.48474 28.8485 4.48474 28.4848C4.48474 28.1212 4.36353 27.8788 4.12111 27.6364C3.39384 26.9091 3.0302 25.9394 3.0302 24.9697Z" fill="#2E3238"/>
          <path d="M9.57568 16.7273C9.57568 17.8182 10.5454 18.7879 11.6363 18.7879C12.7272 18.7879 13.6969 17.8182 13.6969 16.7273C13.6969 15.6364 12.7272 14.6667 11.6363 14.6667C10.4242 14.6667 9.57568 15.5152 9.57568 16.7273ZM17.9393 16.7273C17.9393 17.8182 18.909 18.7879 19.9999 18.7879C21.0908 18.7879 22.0605 17.8182 22.0605 16.7273C22.0605 15.6364 21.0908 14.6667 19.9999 14.6667C18.909 14.6667 17.9393 15.5152 17.9393 16.7273ZM26.303 16.7273C26.303 17.8182 27.2727 18.7879 28.3636 18.7879C29.4545 18.7879 30.4242 17.8182 30.4242 16.7273C30.4242 15.6364 29.4545 14.6667 28.3636 14.6667C27.2727 14.6667 26.303 15.5152 26.303 16.7273Z" fill="#2E3238"/>
          </svg>
          Comment
        </button>
        <button type="button" name="share">
          <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.6667 26.6667C22.6667 27.1667 24 27 24.8333 26.3333L33.5 19.1667C34.3333 18.5 34.8333 17.3333 34.8333 16.3333C34.8333 15.3333 34.5 14 33.6667 13.3333L25 6.16667C24.1667 5.5 22.8333 5.33333 21.8333 5.83333C20.8333 6.33333 20.1667 7.33333 20.1667 8.5V10.3333H17.8333C10.6667 10.5 5 16 5 22.8333V30.1667C5 31.5 5.83333 32.6667 7.16667 33C7.5 33 7.66667 33.1667 8 33.1667C9 33.1667 10 32.6667 10.5 31.6667L13.3333 26.6667C14.6667 24.3333 17.1667 22.6667 19.8333 22.1667V23.8333C20 25.1667 20.6667 26.1667 21.6667 26.6667ZM10.6667 25L8.33333 28.8333V22.8333C8.33333 17.8333 12.5 13.6667 17.8333 13.6667H21.6667C22.6667 13.6667 23.3333 13 23.3333 12V9.33333L31.5 16C31.6667 16 31.6667 16.1667 31.6667 16.3333C31.6667 16.5 31.6667 16.5 31.5 16.6667L23.3333 23.3333V20.5C23.3333 19.5 22.6667 18.8333 21.6667 18.8333C17.1667 18.8333 12.8333 21.1667 10.6667 25Z" fill="black"/>
          </svg>
          Share
        </button>
      </div>`;
      post.insertBefore(imgsdiv, post.querySelector('.activity'))
      area.appendChild(post)
      var pso = false;
      post.querySelector('button[name="post settings"]').addEventListener('click', opensets)
      function opensets(event) {
        var p = event.target.parentElement.parentElement;
        var post = p.className == 'post' ? p : p.parentElement;
        if (post.querySelector('.postsets') != null) {
          post.querySelector('.postsets').remove()
          return;
        }
        let settings = document.createElement('nav');
        settings.classList.add('postsets');
        if (post.getAttribute('data-a') == UserInf.id) {
          settings.innerHTML = `<h5>Post settings</h5>
          <hr/>
          <button type="button" name="Delete post">Delete</button>
          <button type="button" name="Edit post">Edit</button>`;
          post.appendChild(settings)
          settings.querySelector('button[name="Delete post"]').addEventListener('click', function (event) {
            Post.delete(post.getAttribute('data-id'), post)
            settings.remove();
          })
        }
        window.addEventListener('click', function (event) {
          event.target.clickOut(settings, !event.target.checkParent(post.querySelector('button[name="post settings"]')))
        })
      }
    }
  }
}
