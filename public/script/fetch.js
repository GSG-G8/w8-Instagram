function getPosts() {
  fetch("/posts")
      .then(res => res.json())
      .then(renderPosts)
}

function addPost(data) {
  fetch('/posts', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(getPosts);
}

function login(data) {
  fetch('/login', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
}

function register(data) {
  fetch('/register', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
}
