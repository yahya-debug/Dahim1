socket.on('post', function (data) {
  if (document.querySelector('.postsec')) {
    Post.create([data], document.querySelector('.postsec'))
  }
  postsincache.push(data);
  if (data.author == UserInf.id) {
    profposts.push(data)
  }
})
