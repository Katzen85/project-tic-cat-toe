// ELEMENTS & VARIABLES:
var gameBoardSquares = document.querySelectorAll(".squares");
var xScoreCounter = document.querySelector(".x-score-counter");
var oScoreCounter = document.querySelector(".o-score-counter");
var restartBtn = document.querySelector(".restart-button");
var onePlayerBtn = document.querySelector(".one-player");
var twoPlayerBtn = document.querySelector(".two-player");
var ticBox = document.querySelector(".tic");
var tacBox = document.querySelector(".tac");
var toeBox = document.querySelector(".toe");
var winMessage = document.querySelector(".tac");
var lastPlayed = [];
var gameActive = false;
var stopIntroBotID;
var stopTicAnimation;


// FUNCTIONS
function onePlayerEventHandler(event) {
  
  if (gameActive) {
    placeX();
    setTimeout(oBot, 900);
    checkForDraw();
    checkForWinner();
  }
}

function twoPlayerEventHandler(event) {

  if (gameActive) {
    if (lastPlayed[0] == undefined || lastPlayed[0] == "o") { 
      placeX();

    } else {
      placeO();
    }
    checkForDraw();
    checkForWinner();
  }  
}

function oBot() {

  var randomNum = Math.floor(Math.random() * 9);

  if (gameActive) {
    if (gameBoardSquares[randomNum].textContent == "") {
      gameBoardSquares[randomNum].textContent = "o";
      lastPlayed.unshift("o");
    } else {
      oBot();
    }
  }
}

function xBot() {

  var randomNum = Math.floor(Math.random() * 9);

  if (gameActive) {
    if (gameBoardSquares[randomNum].textContent == "") {
      gameBoardSquares[randomNum].textContent = "x";
      lastPlayed.unshift("x");
    } else {
      xBot();
    }
  }
}

function placeX() {

  if (event.target.textContent == "") {
    event.target.textContent = "x";
    lastPlayed.unshift("x");
  }
}

function placeO() {

  if (event.target.textContent == "") {
    event.target.textContent = "o";
    lastPlayed.unshift("o");
  }
}

function checkForWinner() {

  var winningCombinations = {
    rowTop: [gameBoardSquares[0].textContent, gameBoardSquares[1].textContent, gameBoardSquares[2].textContent],
    rowMiddle: [gameBoardSquares[3].textContent, gameBoardSquares[4].textContent, gameBoardSquares[5].textContent],
    rowBottom: [gameBoardSquares[6].textContent, gameBoardSquares[7].textContent, gameBoardSquares[8].textContent],
    columnLeft: [gameBoardSquares[0].textContent, gameBoardSquares[3].textContent, gameBoardSquares[6].textContent],
    columnMiddle: [gameBoardSquares[1].textContent, gameBoardSquares[4].textContent, gameBoardSquares[7].textContent],
    columnRight: [gameBoardSquares[2].textContent, gameBoardSquares[5].textContent, gameBoardSquares[8].textContent],
    diagonalForward: [gameBoardSquares[6].textContent, gameBoardSquares[4].textContent, gameBoardSquares[2].textContent],
    diagonalBackward: [gameBoardSquares[0].textContent, gameBoardSquares[4].textContent, gameBoardSquares[8].textContent]
  }

  var winningCombinationKeys = Object.keys(winningCombinations);

  winningCombinationKeys.forEach((key) => {
    if (winningCombinations[key].every((element) => element == "x")) {
      displayXWins();
      addPointToX();
      gameActive = false;

    } else if (winningCombinations[key].every((element) => element == "o")) {
      displayOWins();
      addPointToO();
      gameActive = false;
    }  
  });
}

function launchTwoPlayerGame(event) {
  gameActive = true;
  gameBoardSquares.forEach((square) => square.removeEventListener("click", onePlayerEventHandler))
  gameBoardSquares.forEach((square) => square.addEventListener("click", twoPlayerEventHandler));
  addFlipAnimation();
  onePlayerBtn.classList.remove("flip");
  onePlayerBtn.classList.remove("one-player-selected");
  twoPlayerBtn.classList.add("two-player-selected");
  xScoreCounter.textContent = 0;
  oScoreCounter.textContent = 0;
  ticBox.textContent = "";
  tacBox.textContent = "";
  toeBox.textContent = "";
}

function launchOnePlayerGame(event) {
  gameActive = true;
  gameBoardSquares.forEach((square) => square.removeEventListener("click", twoPlayerEventHandler));
  gameBoardSquares.forEach((square) => square.addEventListener("click", onePlayerEventHandler));
  addFlipAnimation();
  twoPlayerBtn.classList.remove("flip");
  twoPlayerBtn.classList.remove("two-player-selected");
  onePlayerBtn.classList.add("one-player-selected");
  xScoreCounter.textContent = 0;
  oScoreCounter.textContent = 0;
  ticBox.textContent = "";
  tacBox.textContent = "";
  toeBox.textContent = "";
}

function checkForDraw() {
  var boardSquares = Array.from(gameBoardSquares);
  if (boardSquares.every((square) => square.textContent != "")) {
    winMessage.textContent = "It's a Draw!"
  }
}

function resetGame() {
  gameBoardSquares.forEach((square) => square.textContent = "");
  winMessage.textContent = "";
  removeFlashAnimation();
  lastPlayed = [];
  gameActive = true;
}

function addPointToX() {
  xScoreCounter.textContent = Number(xScoreCounter.textContent) + 1;
}

function displayXWins() {
  winMessage.textContent = "X Wins!";
  addFlashAnimation();
}

function addPointToO() {
  oScoreCounter.textContent = Number(oScoreCounter.textContent) + 1;
}

function displayOWins() {
  winMessage.textContent = "O Wins!";
  addFlashAnimation();
}

function addFlipAnimation() {
  event.target.classList.add("flip");
}

function addFlashAnimation() {
  winMessage.classList.add("flash");
}

function removeFlashAnimation() {
  winMessage.classList.remove("flash");
}


// INTRO BOT FUNCTIONS:
function startIntroBot() {

  if (!gameActive) {
    stopIntroBotID = setInterval(introBot, 1500);
  }
}

function introBot() {

  var randomNum = Math.floor(Math.random() * 9);

  if (gameBoardSquares[randomNum].textContent == "") {

    if (lastPlayed[0] == undefined || lastPlayed[0] == "o") {
      gameBoardSquares[randomNum].textContent = "x";
      lastPlayed.unshift("x");

    } else {
      gameBoardSquares[randomNum].textContent = "o";
      lastPlayed.unshift("o");
    }

  } else {
    introBot();
  }
  checkIntroGameForWin();
  checkIntroGameForDraw();
}

function resetIntroBoard() {
  gameBoardSquares.forEach((square) => square.textContent = "");
}

function stopIntroBot() {
  clearInterval(stopIntroBotID);
}

function checkIntroGameForWin() {

  var winningCombinations = {
    rowTop: [gameBoardSquares[0].textContent, gameBoardSquares[1].textContent, gameBoardSquares[2].textContent],
    rowMiddle: [gameBoardSquares[3].textContent, gameBoardSquares[4].textContent, gameBoardSquares[5].textContent],
    rowBottom: [gameBoardSquares[6].textContent, gameBoardSquares[7].textContent, gameBoardSquares[8].textContent],
    columnLeft: [gameBoardSquares[0].textContent, gameBoardSquares[3].textContent, gameBoardSquares[6].textContent],
    columnMiddle: [gameBoardSquares[1].textContent, gameBoardSquares[4].textContent, gameBoardSquares[7].textContent],
    columnRight: [gameBoardSquares[2].textContent, gameBoardSquares[5].textContent, gameBoardSquares[8].textContent],
    diagonalForward: [gameBoardSquares[6].textContent, gameBoardSquares[4].textContent, gameBoardSquares[2].textContent],
    diagonalBackward: [gameBoardSquares[0].textContent, gameBoardSquares[4].textContent, gameBoardSquares[8].textContent]
  }

  var winningCombinationKeys = Object.keys(winningCombinations);

  winningCombinationKeys.forEach((key) => {
    if (winningCombinations[key].every((element) => element == "x")) {
      stopIntroBot();
      resetIntroBoard();
      startIntroBot();
    } else if (winningCombinations[key].every((element) => element == "o")) {
      stopIntroBot();
      resetIntroBoard();
      startIntroBot();
    }
  });
}

function checkIntroGameForDraw() {
  var boardSquares = Array.from(gameBoardSquares);
  if (boardSquares.every((square) => square.textContent != "")) {
    stopIntroBot();
    resetIntroBoard();
    startIntroBot();
  }
}


// EVENT LISTENERS:
onePlayerBtn.addEventListener("click", launchOnePlayerGame);
twoPlayerBtn.addEventListener("click", launchTwoPlayerGame);
restartBtn.addEventListener("click", resetGame);


// FUNCTION CALLS;
startIntroBot();

// --------------------------------------------------------//

// CURRENTLY IN WORKSHOP: 
// "Intro"/ intro screen - Tic Tac Toe / Select Player flashes across top of screen

function setTicIntervalTimer() {
  stopTicAnimation = setInterval(addOrRemoveTic, 1000);
}

function addOrRemoveTic() {

  if (ticBox.textContent == "") {
    ticBox.textContent = "Tic";
  } else {
    ticBox.textContent = "";
  }
}



setTicIntervalTimer();


// EXTRA FEATURES TO BE ADDED:
// Board colours move to background of winning squares