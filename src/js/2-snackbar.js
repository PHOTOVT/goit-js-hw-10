import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector("input[name='delay']");
  const delay = parseInt(delayInput.value);

  const stateRadio = document.querySelector("input[name='state']:checked");
  const state = stateRadio ? stateRadio.value : null;

  if (delay && state) {
    const promise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else if (state === 'rejected') {
        setTimeout(() => reject(delay), delay);
      }
    });

    promise.then(
      delay => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      },
      delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      }
    );
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please fill in all fields.',
    });
  }

  delayInput.value = '';
  stateRadio.checked = false;
});