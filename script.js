const form = document.querySelector('.login-form');
const identityInput = document.querySelector('#identity');
const passwordInput = document.querySelector('#password');
const formMessage = document.querySelector('.form-message');
const toast = document.querySelector('.toast');
const backButton = document.querySelector('.back-button');
const forgotLink = document.querySelector('.forgot-link');
const createButton = document.querySelector('.create-button');

let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function clearMessage() {
  formMessage.textContent = '';
}

[identityInput, passwordInput].forEach((input) => {
  input.addEventListener('input', clearMessage);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const identity = identityInput.value.trim();
  const password = passwordInput.value.trim();

  if (!identity || !password) {
    formMessage.textContent = 'Please enter your mobile number or email and password.';
    (!identity ? identityInput : passwordInput).focus();
    return;
  }

  if (password.length < 4) {
    formMessage.textContent = 'Password must be at least 4 characters.';
    passwordInput.focus();
    return;
  }

  showToast('Demo only — no login request was sent.');
});

backButton.addEventListener('click', () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    showToast('You are already at the first page.');
  }
});

forgotLink.addEventListener('click', (event) => {
  event.preventDefault();
  showToast('Password recovery is not connected in this visual demo.');
});

createButton.addEventListener('click', () => {
  showToast('Account creation is not connected in this visual demo.');
});
