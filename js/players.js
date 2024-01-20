const playerList = document.querySelector("#player-list");
const teamList = ['김민혁팀','김병우팀','김인수팀','심민석팀','안상원팀','이용준팀','장민혁팀','홍순원팀']
const aList = [770, 790, 770, 770, 910, 770, 820, 880]
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
const playersDB = db.collection("players").doc("players");
const headerBtn = document.querySelector("#headerBtn");
const headerSection = document.querySelector("header");
headerBtn.addEventListener("click", function () {
  headerSection.classList.toggle("hidden");
});

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
  resetPlayerSlot();
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
  playersDB.set({ playerslist }).then(() => {
    console.log("successfully written");
  });
}

function paintPlayersDB() {
  playerList.innerText = "";
  playersDB.get().then((doc) => {
    for (let i = 0; i < doc.data().playerslist.length; i++) {
      const span = document.createElement("span");
      span.innerText = doc.data().playerslist[i].Name;
      playerList.appendChild(span);
    }
  });
  console.log("players painted");
}

paintPlayersDB();

db.collection("players").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "modified") {
      console.log("modified");
      paintPlayersDB();
    }
  });
});
