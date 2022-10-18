const time = document.querySelector("#timer span");
const timerStartButton = document.querySelector("#timer button");
const timerResetButton = document.querySelector("#timer :last-child");

let TIME = 10;
let timer;

function showAlert() {
  alert("시간초과!");
}

function startTimer() {
  TIME = 10;
  updateTimer();
  stopTimer();
  timer = setInterval(updateTimer, 1000);
}
function stopTimer() {
  clearInterval(timer);
}
function updateTimer() {
  time.innerText = `${TIME}s`;
  TIME--;
  if (TIME < 0) {
    showAlert();
    stopTimer();
    TIME = 10;
  }
}
function resetTimer() {
  TIME = 10;
  stopTimer();
  time.innerText = `${TIME}s`;
}
timerStartButton.addEventListener("click", startTimer);
timerResetButton.addEventListener("click", resetTimer);
