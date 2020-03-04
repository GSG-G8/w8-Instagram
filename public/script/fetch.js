function getPosts() {
  fetch('/posts')
    .then(res => res.json())
    .then(renderPosts);
}

function addPost(data) {
  fetch('/posts', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(getPosts);
}

function login(data) {
  return fetch('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function register(data) {
  return fetch('/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
