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
const players = db.collection("players");

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
      paintPlayers();
    });
  };
  reader.readAsBinaryString(input.files[0]);
}

function paintPlayers() {
  playerList.innerText = "";
  players.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const span = document.createElement("span");
      span.innerText = doc.data().Name;
      playerList.appendChild(span);
    });
  });
}

function sendPlayerToDB(temp) {
  for (let i = 0; i < temp.length; i++) {
    players
      .doc(`player${i}`)
      .set(temp[i])
      .then(() => {
        console.log("Successfully written");
      });
  }
}
