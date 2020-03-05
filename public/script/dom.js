
const modal = document.getElementById('myModal');
const newPost = document.querySelector('.new-post');
const span = document.querySelector('.close');

const postContainer = document.querySelector('.posts');

newPost.addEventListener('click', () => {
  modal.style.display = 'block';
});
span.addEventListener('click', () => {
  modal.style.display = 'none';
});

function createPostElement(obj) {
  const postsItem = document.createElement('div');
  const postsUser = document.createElement('div');
  const postsPost = document.createElement('div');
  const postsFolio = document.createElement('div');
  const postsUsername = document.createElement('h1');
  const postsPhoto = document.createElement('img');
  const postsThumbnail = document.createElement('div');
  const postsDetails = document.createElement('div');
  const postsImage = document.createElement('img');
  const postsTitle = document.createElement('h2');
  const postsContent = document.createElement('p');

  postsItem.className = 'posts__item';
  postsUser.className = 'posts__user';
  postsPost.className = 'posts__post';
  postsFolio.className = 'posts__folio';
  postsPhoto.className = 'posts__img';
  postsThumbnail.className = 'posts_thumbnail';
  postsPhoto.src = "/images/user.png";
  postsImage.src = obj.image;
  postsTitle.textContent = obj.title;
  postsContent.textContent = obj.details;
  postsUsername.textContent = 'Matt Johney';

  postsItem.appendChild(postsUser);
  postsItem.appendChild(postsPost);
  postsUser.appendChild(postsFolio);
  postsUser.appendChild(postsUsername);
  postsPost.appendChild(postsThumbnail);
  postsPost.appendChild(postsDetails);
  postsFolio.appendChild(postsPhoto);
  postsThumbnail.appendChild(postsImage);
  postsDetails.appendChild(postsTitle);
  postsDetails.appendChild(postsContent);

  return postsItem;
}

function renderPosts(arr) {
  postContainer.textContent = '';
  arr.forEach((post) => {
    postContainer.appendChild(createPostElement(post));
  });
}
