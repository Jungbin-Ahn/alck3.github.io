const burialButton = document.querySelector("#burialButton");
const burialToPlayerButton = document.querySelector("#burial-to-players");
const burialList = document.querySelector("#burial-list");
const burialsDB = db.collection("burials").doc("players");

function sendToBurialList() {
  if (playerName.innerText === "") {
    alert("플레이어를 추첨해주세요!");
  } else {
    selectedDB.get().then((doc) => {
      burialsDB.update({
        playerslist: firebase.firestore.FieldValue.arrayUnion(doc.data()),
      });
    });
  }
}

function sendBurialToPlayer() {
  burialsDB.get().then((doc) => {
    if (doc.data().playerslist.length !== 0) {
      playersDB.set({ playerslist: doc.data().playerslist });
      burialsDB.update({ playerslist: [] });
    } else {
      alert("유찰자가 없습니다!");
    }
  });
  alert("유찰경매를 시작하겠습니다!");
  burialList.innerText = "";
  paintPlayersDB();
  burialToPlayerButton.classList.remove("hidden");
}

function paintBurialPlayers() {
  console.log("burial painted");
  burialList.innerText = "";
  burialsDB.get().then((doc) => {
    for (let i = 0; i < doc.data().playerslist.length; i++) {
      const span = document.createElement("span");
      span.innerText = doc.data().playerslist[i].Name;
      burialList.appendChild(span);
    }
  });
}

burialButton.addEventListener("click", sendToBurialList);
burialToPlayerButton.addEventListener("click", sendBurialToPlayer);

db.collection("burials").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "modified") {
      console.log("modified");
      paintBurialPlayers();
      resetPlayerSlot();
    }
  });
});
