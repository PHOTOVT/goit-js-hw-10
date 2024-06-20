import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');

let userSelectedDate;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  if (userSelectedDate <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  startTimer();
  calendar.destroy();
});

function startTimer() {
  startButton.disabled = true;

  const timerInterval = setInterval(() => {
    const remainingTime = userSelectedDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimer(0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      startButton.disabled = false;
    } else {
      updateTimer(remainingTime);
    }
  }, 1000);
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

function updateTimer(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}