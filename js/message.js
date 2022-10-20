const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDwBA0U9iQqRtYwKNDv3j96zYOnQXnBpxg",
  authDomain: "alck-f0c35.firebaseapp.com",
  databaseURL: "https://alck-f0c35-default-rtdb.firebaseio.com",
  projectId: "alck-f0c35",
  storageBucket: "alck-f0c35.appspot.com",
  messagingSenderId: "89179356630",
  appId: "1:89179356630:web:12ac618cf29459633cb877",
});
const teamSelect = document.querySelector("#team-ii");
const messageSection = document.querySelector("#message-section");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-form input");
const messageBtn = document.querySelector("#message-form button");

const rdb = firebaseApp.database();

function sendMessageToDB(info) {
  info.preventDefault();
  rdb.ref()
    .get()
    .then((snapshot) => {
      if (parseInt(snapshot.val().MAX) < parseInt(messageInput.value)) {
        rdb.ref("post/" + teamSelect.value)
          .set({ message: messageInput.value })
          .then(() => {
            console.log("written!");
            rdb.ref().update({ MAX: messageInput.value });
          });
      } else {
        alert("PUT MORE POINT");
      }
    });
}
function paintAuctionEnd(){
    const span = document.createElement("span");
    span.innerText = '-----경매종료-----';
    messageSection.appendChild(span);  
    resetMessages();
}

function resetMessages() {
  rdb.ref().set({ MAX: 0 });
  for (let i = 1; i < 9; ++i) {
    rdb.ref("post/" + `TEAM${i}`).set({ message: 0 });
  }
}

messageForm.addEventListener("submit", sendMessageToDB);

rdb.ref("post/").on("child_changed", (snapshot) => {
  const data = snapshot.val();
  console.log(snapshot);
  const span = document.createElement("span");
  span.innerText = snapshot.key + " " + data.message;
  messageSection.appendChild(span);
});
