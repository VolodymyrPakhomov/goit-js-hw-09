// import Notiflix from 'notiflix';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// const date = new Date();
// const input = document.querySelector('#datetime-picker');
// const start = document.querySelector('button');
// const dataDays = document.querySelector('[data-days]');
// const dataHours = document.querySelector('[data-hours]');
// const dataMinutes = document.querySelector('[data-minutes]');
// const dataSeconds = document.querySelector('[data-seconds]');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectDate.selectedDates[0] > date) {
//       start.disabled = false;
//     } else {
//       start.disabled = true;
//       Notiflix.Notify.failure(
//         'Вибраний час вже в минулому. Введіть дату з майбутнього!',
//         { position: 'center-center', backoverlay: true }
//       );
//     }
//   },
// };

// const selectDate = flatpickr(input, options);
// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const reverseTime = Date.parse(selectDate.selectedDates[0]) - Date.now();

//       if (reverseTime > 0) {
//         const { days, hours, minutes, seconds } = convertMs(reverseTime);

//         dataHours.textContent = `${hours}`;
//         dataDays.textContent = `${days}`;
//         dataMinutes.textContent = `${minutes}`;
//         dataSeconds.textContent = `${seconds}`;
//       } else {
//         window.alert('The time is up');
//         window.location.reload();
//         clearInterval(this.intervalId);
//       }
//     }, 1000);
//   },
// };

// start.setAttribute('disabled', true);
// start.addEventListener('click', onStartBtn);

// function onStartBtn() {
//   start.setAttribute('disabled', true);
//   input.setAttribute('disabled', true);
//   timer.start();
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }


// Описаний в документації
import flatpickr from "flatpickr";
//import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


const refs = {
input: document.querySelector('#datetime-picker'),
startBtn: document.querySelector('[data-start]'),

days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]')
};

refs.startBtn.disabled = true;
let endTime = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function pad(value){
  return String(value).padStart(2, '0');
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] <= Date.now()) {
       Notify.failure('Please choose a date in the future');
      }  else {
        refs.startBtn.disabled = false;
        endTime = selectedDates[0];
        
      }
   },
  };

flatpickr(refs.input, options);

class Timer {

constructor() {
  this.intervalId = null;
  refs.startBtn.disabled = true;
}

start() {
     refs.startBtn.disabled = true;
     refs.input.disabled = true;
     this.intervalId = setInterval(() => {
    
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const ms = convertMs(deltaTime);

     if(deltaTime <= 1000){
      clearInterval(this.intervalId);
     }

     this.updateClockface(ms);
     
      }, 1000);
  }
 
  updateClockface ({ days, hours, minutes, seconds }) {

    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
    }
};

const timer = new Timer();
refs.startBtn.addEventListener('click', () => timer.start());