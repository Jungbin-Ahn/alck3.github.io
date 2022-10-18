const playerList = document.querySelector("#player-list");
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwBA0U9iQqRtYwKNDv3j96zYOnQXnBpxg",
  authDomain: "alck-f0c35.firebaseapp.com",
  databaseURL: "https://alck-f0c35-default-rtdb.firebaseio.com",
  projectId: "alck-f0c35",
  storageBucket: "alck-f0c35.appspot.com",
  messagingSenderId: "89179356630",
  appId: "1:89179356630:web:12ac618cf29459633cb877",
});

const db = firebaseApp.firestore();
const playersDB = db.collection("players");

function readExcel() {
  let input = event.target;
  let reader = new FileReader();
  temp = [];
  reader.onload = function () {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: "binary" });
    workBook.SheetNames.forEach(function (sheetName) {
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
      temp = rows;
      sendPlayerToDB(temp);
    });
  };
  paintPlayersDB();
  reader.readAsBinaryString(input.files[0]);
}

function resetAll() {
  lotteryIndex = [];
  resetPoints();
  resetPlayers();
  db.collection("selectedplayer").doc("selected").delete();
  resetPlayerSlot();
}

function sendPlayerToDB(playerslist) {
  for (let i = 0; i < playerslist.length; i++) {
    lotteryIndex.push(i);
    playersDB
      .doc(`player${i}`)
      .set(playerslist[i])
      .then(() => {
        console.log("Successfully written");
      });
  }
}

function paintPlayersDB() {
  playerList.innerText = "";
  playersDB.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("함수");
      const span = document.createElement("span");
      span.innerText = doc.data().Name;
      playerList.appendChild(span);
    });
  });
  console.log("players painted");
}
playersDB.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "removed") {
      console.log("리스너");
      playerList.innerText = "";
      paintPlayersDB();
    }
  });
});
paintPlayersDB();
