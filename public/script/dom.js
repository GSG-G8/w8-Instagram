const modal = document.getElementById('myModal');
const newPost = document.querySelector('.new-post');
const span = document.getElementsByClassName('close')[0];

newPost.addEventListener('click', () => {
  modal.style.display = 'block';
});
span.addEventListener('click', () => {
  modal.style.display = 'none';
});
