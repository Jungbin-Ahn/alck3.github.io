const playerButton = document.querySelector("#playerbutton");
const playerName = document.querySelector("#playername");
const playerId = document.querySelector("#playerid");
const tier = document.querySelector("#tier");
const position = document.querySelector("#position");
const champion = document.querySelector("#champion");
const selectedDB = db.collection("selectedplayer").doc("selected");

function randomNumberGenerator() {
  playersDB
    .get()
    .then((doc) => {
      if (doc.data().playerslist.length !== 0) {
        arr =
          doc.data().playerslist[
            Math.floor(Math.random() * doc.data().playerslist.length)
          ];
        lotteryPlayer = arr;
        playersDB.update({
          playerslist: firebase.firestore.FieldValue.arrayRemove(arr),
        });
        selectedDB.set(arr);
      } else {
        alert("본 추첨 끝!!");
        resetPlayerSlot();
        burialToPlayerButton.classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function paintPlayerToCenter() {
  console.log("paintplayertocenter");
  db.collection("selectedplayer")
    .doc("selected")
    .get()
    .then((doc) => {
      playerName.innerText = `이름: ${doc.data().Name}`;
      playerId.innerText = `소환사명: ${doc.data().ID}`;
      tier.innerText = `티어: ${doc.data().Tier}`;
      position.innerText = `포지션: ${doc.data().Position}`;
    });
}

function resetPlayerSlot() {
  playerName.innerText = "";
  playerId.innerText = "";
  tier.innerText = "";
  position.innerText = "";
  champion.innerText = "";
}

playerButton.addEventListener("click", randomNumberGenerator);
db.collection("selectedplayer").onSnapshot((doc) => paintPlayerToCenter());
