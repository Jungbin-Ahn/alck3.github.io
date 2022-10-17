const playerButton = document.querySelector("#playerbutton");
const playerName = document.querySelector("#playername");
const playerId = document.querySelector("#playerid");
const tier = document.querySelector("#tier");
const position = document.querySelector("#position");
const champion = document.querySelector("#champion");
const intro = document.querySelector("#intro");

let chosenPlayer;

function randomNumberGenerator() {
  if (players.length === 0) {
    alert("본 추첨 끝!!");
    burialToPlayerButton.classList.remove("hidden");
  } else {
    players.get().then((snap) => {
      arr = Math.floor(Math.random() * snap.size);
      players
        .doc(`player${arr}`)
        .get()
        .then((doc) => {
          chosenPlayer = doc.data();
          playerName.innerText = `이름: ${chosenPlayer.Name}`;
          playerId.innerText = `소환사명: ${chosenPlayer.ID}`;
          tier.innerText = `티어: ${chosenPlayer.Tier}`;
          position.innerText = `포지션: ${chosenPlayer.Position}`;
          intro.innerText = `자기소개: ${chosenPlayer.Intro}`;
          players
            .doc(`player${arr}`)
            .delete()
            .then(() => {
              console.log("deleted");
              paintPlayers();
            });
        });
    });
  }
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
