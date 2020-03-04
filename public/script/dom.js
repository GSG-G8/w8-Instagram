
const modal = document.getElementById('myModal');
const newPost = document.querySelector('.new-post');
const span = document.getElementsByClassName('close')[0];

newPost.addEventListener('click', () => {
  modal.style.display = 'block';
});
span.addEventListener('click', () => {
  modal.style.display = 'none';
});

function createPostElement(obj) {
  const postsItem = document.createElement('div');

  const postsUser = document.createElement('div');
  const postsFolio = document.createElement('div');
  const postsPhoto = document.createElement('div');
  const postsUsername = document.createElement('h1');

  const postsPost = document.createElement('div');
  const postsThumbnail = document.createElement('div');
  const postsImage = document.createElement('img');

  const postsDetails = document.createElement('div');
  const postsTitle = document.createElement('h2');
  const postsContent = document.createElement('p');

  postsFolio.appendChild(postsPhoto);
  postsUser.appendChild(postsFolio);
  postsUser.appendChild(postsUsername);


  postsThumbnail.appendChild(postsImage);

  postsDetails.appendChild(postsTitle);
  postsDetails.appendChild(postsContent);

  postsPost.appendChild(postsThumbnail);
  postsPost.appendChild(postsDetails);

  postsItem.appendChild(postsUser);
  postsItem.appendChild(postsPost);

  postsItem.className = 'posts__item';

  postsUser.className = 'posts__user';
  postsFolio.className = 'posts__folio';
  postsPhoto.className = 'posts__img';

  postsPost.className = 'posts__post';
  postsThumbnail.className = 'posts_thumbnail';
  postsImage.src = obj.image;

  postsDetails.className = 'posts__user';
  postsTitle.textContent = obj.title;
  postsContent.textContent = obj.details;
  return postsItem;
}

function renderPosts(arr) {
}
