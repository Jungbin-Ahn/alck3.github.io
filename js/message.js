const teamSelectii = document.querySelector("#team-ii");
const messageSection = document.querySelector("#message-section");
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-form input");
const messageBtn = document.querySelector("#message-form button");

const rdb = firebaseApp.database();

function sendMessageToDB(info) {
  info.preventDefault();
  pointsDB
    .doc(teamSelectii.value)
    .get()
    .then((doc) => {
      if (doc.data().point < parseInt(messageInput.value)) {
        // alert("not enough points");
      } else {
        rdb
          .ref()
          .get()
          .then((snapshot) => {
            if (parseInt(snapshot.val().MAX) < parseInt(messageInput.value)) {
              rdb
                .ref("post/" + teamSelectii.value)
                .set({ message: messageInput.value })
                .then(() => {
                  rdb.ref().update({ MAX: messageInput.value });
                });
            } 
            // else {
            //   alert("PUT MORE POINT");
            // }
          });
      }
    });
}
function paintAuctionEnd() {
  const span = document.createElement("span");
  span.innerText =
    "--------------------------경매종료--------------------------";
  messageSection.appendChild(span);
  resetMessages();
}

function resetMessages() {
  rdb.ref().set({ MAX: 0 });
  for (let i = 0; i < 8; ++i) {
    rdb.ref("post/" + teamList[i]).set({ message: 0 });
  }
}

messageForm.addEventListener("submit", sendMessageToDB);

rdb.ref("post/").on("child_changed", (snapshot) => {
  const data = snapshot.val();
  console.log(snapshot);
  const span = document.createElement("span");
  span.innerText = snapshot.key + ": " + data.message;
  messageSection.appendChild(span);
  startTimer();
});
