BURIALSCOUNT = 0;
const burialButton = document.querySelector("#burialButton");
const burialToPlayerButton = document.querySelector("#burial-to-players");
const burialList = document.querySelector("#burial-list");
const burialsDB = db.collection("burials");

function sendToBurialList() {
  if (playerName.innerText === "") {
    alert("플레이어를 추첨해주세요!");
  } else {
    burialsDB
      .doc(`player${BURIALSCOUNT}`)
      .set(lotteryPlayer)
      .then(console.log("burial success"));
    BURIALSCOUNT++;
  }
}
function sendBurialToPlayer() {
  if (BURIALSCOUNT === 0) {
    alert("유찰자가 없습니다!");
  } else {
    lotteryIndex = Array.from({ length: BURIALSCOUNT }, (v, i) => i);

    burialsDB.get().then((snap) => {
      snap.forEach((doc) => {
        playersDB.doc(doc.id).set(doc.data());
      });
    });
    alert("유찰경매를 시작하겠습니다!");
    burialList.innerText = "";
    paintPlayersDB();
    burialToPlayerButton.classList.remove("hidden");
  }
}

function paintBurialPlayers() {
  console.log("bural painted");
  burialList.innerText = "";
  burialsDB.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const span = document.createElement("span");
      span.innerText = doc.data().Name;
      burialList.appendChild(span);
    });
  });
}

burialButton.addEventListener("click", sendToBurialList);
burialToPlayerButton.addEventListener("click", sendBurialToPlayer);
burialsDB.onSnapshot((doc) => {
  resetPlayerSlot();
  paintBurialPlayers();
});
