
const formLogin = document.querySelector('.login__form');
const formRegister = document.querySelector('.register__form');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputConfirm = document.querySelector('#confirm');

const errorMessage = document.querySelector('.form__message');

if (formRegister) {
  formRegister.onsubmit = (event) => {
    event.preventDefault();
    errorMessage.textContent = '';
    register({
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
      confirm: inputConfirm.value,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = '/login.html';
        } else {
          res.json().then((results) => {
            errorMessage.textContent = results.message;
          });
        }
      });
  };
}

if (formLogin) {
  formLogin.onsubmit = (event) => {
    event.preventDefault();
    errorMessage.textContent = '';
    login({
      email: inputEmail.value,
      password: inputPassword.value,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = '/';
        } else {
          res.json().then((results) => {
            errorMessage.textContent = results.message;
          });
        }
      });
  };
}
