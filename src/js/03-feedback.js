import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const saveFormStateToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

const loadFormStateFromLocalStorage = () => {
  const formDataJSON = localStorage.getItem('feedback-form-state');
  if (formDataJSON !== null) {
    const formData = JSON.parse(formDataJSON);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

const handleSubmit = event => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log('Form data:', formData);

  localStorage.removeItem('feedback-form-state');

  emailInput.value = '';
  messageTextarea.value = '';
};

form.addEventListener('input', saveFormStateToLocalStorage);

document.addEventListener('DOMContentLoaded', loadFormStateFromLocalStorage);

form.addEventListener('submit', handleSubmit);
