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
var stopTicTimerID;
var stopTacTimerID;
var stopToeTimerID;
var stopIntroAnimationID;


// FUNCTIONS
function onePlayerEventHandler(event) {
  
  if (gameActive) {
    placeX();
    setTimeout(computerPlayerO, 1000);
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

function computerPlayerO() {
  var randomNum = Math.floor(Math.random() * 9);

  if (gameActive) {
    if (gameBoardSquares[randomNum].textContent == "") {
      gameBoardSquares[randomNum].textContent = "o";
      lastPlayed.unshift("o");
    } else {
      computerPlayerO();
    }
  }
}

function computerPlayerX() {
  var randomNum = Math.floor(Math.random() * 9);

  if (gameActive) {
    if (gameBoardSquares[randomNum].textContent == "") {
      gameBoardSquares[randomNum].textContent = "x";
      lastPlayed.unshift("x");
    } else {
      computerPlayerX();
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

function addTwoPlayerEventListeners(event) {
  gameActive = true;
  gameBoardSquares.forEach((square) => square.removeEventListener("click", onePlayerEventHandler))
  gameBoardSquares.forEach((square) => square.addEventListener("click", twoPlayerEventHandler));
  addFlipAnimation();
  onePlayerBtn.classList.remove("flip");
  onePlayerBtn.classList.remove("one-player-selected");
  twoPlayerBtn.classList.add("two-player-selected");
  xScoreCounter.textContent = 0;
  oScoreCounter.textContent = 0;
}

function addOnePlayerEventListeners(event) {
  gameActive = true;
  gameBoardSquares.forEach((square) => square.removeEventListener("click", twoPlayerEventHandler));
  gameBoardSquares.forEach((square) => square.addEventListener("click", onePlayerEventHandler));
  addFlipAnimation();
  twoPlayerBtn.classList.remove("flip");
  twoPlayerBtn.classList.remove("two-player-selected");
  onePlayerBtn.classList.add("one-player-selected");
  xScoreCounter.textContent = 0;
  oScoreCounter.textContent = 0;
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

function addFlashToIntro() {

}


// EVENT LISTENERS:
onePlayerBtn.addEventListener("click", addOnePlayerEventListeners);
twoPlayerBtn.addEventListener("click", addTwoPlayerEventListeners);
restartBtn.addEventListener("click", resetGame);


// WORKSHOP: 

function computerVsComputer() {
  
  if (gameActive) {
    setInterval(computerPlayerX, 1000);
    setInterval(computerPlayerO, 2000);
  }
}


// EXTRA FEATURES:

// "Intro"/ intro screen - Tic Tac Toe / Select Player flashes across top of screen
// Watch computer play itself... during tic tac toe screen

/*
EXTRAS
* Get inventive with your styling - research CSS effects, animations to spiff things up
* **Research** **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
* Use timers to display "waiting..." messages while users are waiting to be matched
* **Research** web audio API and add sound effects to your game
* Be creative! Bend the rules and give it a twist!
* Allow players to customize their token (X, O, name, picture, avatar etc)
*/


// Illuminate background of winning squares
// Options menu


// Allow game customizable options, time limits, board size, game rounds, name & profiles etc  
// Full game restart (home menu?)

// CSS animation
// Piet Mondrian cat
// Local/session storage
// Draw counter


// NOTES:


// PROBLEMS:
// 7. One player - Win message does not display if computer wins. This seems to be a delay issue.


// CSS


// LESSONS: