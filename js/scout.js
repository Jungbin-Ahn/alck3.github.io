const scoutForm = document.querySelector("#scout-form");
const pointInput = document.querySelector("#scout-form input");
const teamSelect = document.querySelector("#team-number");
const point = document.querySelector("#point");

const teamsDB = db.collection("team");
const pointsDB = db.collection("point");
let lotteryPlayer;

function assignPlayer(info) {
  info.preventDefault();
  if (playerName.innerText === "") {
    alert("먼저 선수 추첨 부탁해요!");
  } else {
    pointCalculation(teamSelect.value, pointInput.value);
    scoutPlayer(teamSelect.value);
    pointInput.value = "";
  }
}
function scoutPlayer(t) {
  teamsDB
    .doc(t)
    .update({
      member: firebase.firestore.FieldValue.arrayUnion(lotteryPlayer.Name),
    })
    .then(console.log("scouted to", t));
}

function paintScoutedPlayer() {
  var i = 1;
  teamsDB.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let teamSection = document.querySelector(`#team :nth-child(${i})`);
      teamSection.innerHTML = doc.data().member;
      teamSection.innerHTML = teamSection.innerHTML.replaceAll(",", "     |     ");
      i++;
    });
  });
}

function pointCalculation(t, p) {
  pointsDB
    .doc(t)
    .update({ point: firebase.firestore.FieldValue.increment(-p) });
}

function paintRemainingPoint() {
  for (let i = 1; i < 9; i++) {
    const pointDiv = point.querySelector(`div:nth-child(${i})`);
    const pointFirstSpan = pointDiv.querySelector("div :first-child");
    const pointSecondSpan = pointDiv.querySelector("div :last-child");
    pointsDB
      .doc(teamList[i-1])
      .get()
      .then((doc) => {
        temp = doc.data();
        pointSecondSpan.innerText = temp.point;
        pointFirstSpan.innerText = teamList[i-1];
      });
  }
  console.log("remaining point painted");
}

function resetPoints() {
  for (var i = 0; i < 8; i++) {
    pointsDB.doc(teamList[i]).set({ point: aList[i] });
  }
  paintRemainingPoint();
}

function resetPlayers() {
  for (var i =0; i < 8; i++) {
    teamsDB.doc(teamList[i]).set({ member: [] });
  }
  paintRemainingPoint();
}

scoutForm.addEventListener("submit", assignPlayer);

pointsDB.onSnapshot((doc) => {
  paintRemainingPoint();
});
teamsDB.onSnapshot((doc) => {
  paintScoutedPlayer();
  resetPlayerSlot();
});
