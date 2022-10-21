const time = document.querySelector("#timer span");
const timerStartButton = document.querySelector("#timer button");
const timerResetButton = document.querySelector("#timer :last-child");

let TIME = 10;
let timer;
const timeDB = rdb.ref("timer");

function showAlert() {
  paintAuctionEnd();
  resetTimer();
  alert("시간초과!");
}

function startTimer() {
  TIME = 10;
  timeDB.set({ time: TIME });
  updateTimer();
  stopTimer();
  timer = setInterval(updateTimer, 1000);
}
function stopTimer() {
  clearInterval(timer);
}
function updateTimer() {
  timeDB.set({ time: TIME });
  console.log(TIME);
  TIME--;
}
function resetTimer() {
  timeDB.set({ time: 10 });
  TIME = 10;
  time.innerText = TIME + "s";
  stopTimer();
}
timerStartButton.addEventListener("click", startTimer);
timerResetButton.addEventListener("click", resetTimer);

timeDB.on("child_changed", (snapshot) => {
  const timeData = snapshot.val();
  time.innerText = timeData + "s";
  if (timeData < 0) {
    showAlert();
    stopTimer();
    TIME = 10;
  }
});
