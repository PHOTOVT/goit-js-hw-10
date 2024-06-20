const formData = {
  email: '',
  message: '',
};

const saveToLocalStorage = (key, value) => {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
};

const loadFromLocalStorage = key => {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
};

const form = document.querySelector('.feedback-form');
const formEvent = form.addEventListener('input', e => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  saveToLocalStorage('feedback-form-state', formData);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  form.reset();
  localStorage.removeItem('feedback-form-state');
});

document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage('feedback-form-state');
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
  }

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});
