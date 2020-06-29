// initial declaration
const minInput = document.querySelector('#min');
const maxInput = document.querySelector('#max');
const resultDiv = document.querySelector('div.result');
const audioControl = document.querySelector('audio#background');
const toneControl = document.querySelector('audio#tone');
const startButton = document.querySelector('button#start');
const resetButton = document.querySelector('button#reset');
const speakerImg = document.querySelector('button#mute img');
let infinityTimer;
let timeoutTimer;

// initial values
minInput.value = 1;
maxInput.value = 100;
audioControl.loop = true;
audioControl.volume = 0.6;
audioControl.play();

function getValue() {
  let min = Number(minInput.value) || 1;
  let max = Number(maxInput.value) || 100;
  if (min > max) {
    min = 1;
    max = 100;
  }
  minInput.value = min;
  maxInput.value = max;
  return { min, max };
}

function disabledElements() {
  startButton.setAttribute('disabled', true);
  resetButton.setAttribute('disabled', true);
}

function enableElements() {
  startButton.removeAttribute('disabled');
  resetButton.removeAttribute('disabled');
}

function showResult() {
  const { min, max } = getValue();
  const result = Math.round(Math.random() * (max + 1 - min) + min);
  resultDiv.innerHTML = result + '';
}

function showLoading() {
  clearInterval(infinityTimer);
  audioControl.pause();
  toneControl.play();

  infinityTimer = setInterval(() => {
    showResult();
  }, 30);

  setTimeout(() => {
    clearInterval(infinityTimer);
    toneControl.pause();
    toneControl.currentTime = 0;
    audioControl.play();
    enableElements();
  }, 4000);
}

function handleClick() {
  disabledElements();
  showLoading();
}

function handleReset() {
  minInput.value = 1;
  maxInput.value = 100;
  resultDiv.innerHTML = '--';
}

function toggleBackground() {
  const current = audioControl.muted;
  audioControl.muted = !current;
  toneControl.muted = !current;
  speakerImg.setAttribute(
    'src',
    `static/${current ? 'speaker' : 'speaker-mute'}.svg`
  );
}
