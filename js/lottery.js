const playerButton = document.querySelector("#playerbutton");
const playerName = document.querySelector("#playername");
const playerId = document.querySelector("#playerid");
const tier = document.querySelector("#tier");
const position = document.querySelector("#position");
const champion = document.querySelector("#champion");
const intro = document.querySelector("#intro");
let lotteryIndex = [];
let lotteryPlayer;
const selectedDB = db.collection("selectedplayer").doc("selected");

function randomNumberGenerator() {
  // playersDB.get().then((snap) => {
  //   arr = lotteryIndex[Math.floor(Math.random() * lotteryIndex.length)];
  //   console.log(arr);
  //   playersDB
  //     .doc(`player${arr}`)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         db.collection("selectedplayer")
  //           .doc("selected")
  //           .set(doc.data())
  //           .then();
  //         playersDB
  //           .doc(`player${arr}`)
  //           .delete()
  //           .then(() => {
  //             lotteryIndex.splice(lotteryIndex.indexOf(arr), 1);
  //             console.log(arr, " deleted", "=> ", lotteryIndex);
  //           });
  //       } else {
  //         alert("본 추첨 끝!!");
  //         resetPlayerSlot();
  //         burialToPlayerButton.classList.remove("hidden");
  //       }
  //     });
  // });
  playersDB
    .get()
    .then((doc) => {
      if (doc.data().playerslist.length !== 0) {
        arr =
          doc.data().playerslist[
            Math.floor(Math.random() * doc.data().playerslist.length)
          ];
        console.log(arr);
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
      lotteryPlayer = doc.data();
      playerName.innerText = `이름: ${doc.data().Name}`;
      playerId.innerText = `소환사명: ${doc.data().ID}`;
      tier.innerText = `티어: ${doc.data().Tier}`;
      position.innerText = `포지션: ${doc.data().Position}`;
      intro.innerText = `자기소개: ${doc.data().Intro}`;
    });
}

function resetPlayerSlot() {
  playerName.innerText = "";
  playerId.innerText = "";
  tier.innerText = "";
  position.innerText = "";
  champion.innerText = "";
  intro.innerText = "";
}

playerButton.addEventListener("click", randomNumberGenerator);
db.collection("selectedplayer").onSnapshot((doc) => paintPlayerToCenter());
