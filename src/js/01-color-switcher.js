function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btn = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

btn.stop.disabled = true;

btn.start.addEventListener('click', onStartClick);
btn.stop.addEventListener('click', onStopClick);

let interval = null;

function onStartClick() {
  interval = setInterval(() => {
    btn.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btn.start.disabled = true;
  btn.stop.disabled = false;
}

function onStopClick() {
  clearTimeout(interval);
  btn.start.disabled = false;
  btn.stop.disabled = true;
}
