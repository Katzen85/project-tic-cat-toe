console.log("Tic Cat Toe");

/*
Requirements:
* Done - Render a game in the browser
* Done - Switch turns between more than one player
* Done - Design logic for winning & visually display which player won
* Done - Include separate HTML / CSS / JavaScript files
* Done - Use Javascript for DOM manipulation
* Done - Use semantic markup for HTML and CSS (adhere to best practices)
* Deploy your game online, where the rest of the world can access it


Bonus extensions:
These are for extra credit! DON'T focus on these until you've hit the core requirements.

Complete - Keep track of multiple game rounds with a win counter
* Allow game customizable options, time limits, board size, game rounds, name & profiles etc  

* Get inventive with your styling - research CSS effects, animations to spiff things up
* **Research** **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
* Use timers to display "waiting..." messages while users are waiting to be matched
* **Research** web audio API and add sound effects to your game
* Be creative! Bend the rules and give it a twist!
* Allow players to customize their token (X, O, name, picture, avatar etc)


BRAINSTORM:
 Data, presentation, style,
*/


// ELEMENTS & VARIABLES:
var gameBoardSquares = document.querySelectorAll(".squares");
var xScoreCounter = document.querySelector(".x-score-counter");
var oScoreCounter = document.querySelector(".o-score-counter");
var restartBtn = document.querySelector(".restart-button");
var onePlayerBtn = document.querySelector(".one-player");
var twoPlayerBtn = document.querySelector(".two-player");
var winMessage = document.querySelector(".win-message");
var lastPlayed = [];
var gameActive = true;


// FUNCTIONS
function onePlayerEventHandler(event) {
  
  if (gameActive) {
    placeX();
    setTimeout(computerPlayer, 1000);
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

function computerPlayer() {

  var randomNum = Math.floor(Math.random() * 9);

  if (gameActive) {
    if (gameBoardSquares[randomNum].textContent == "") {
      gameBoardSquares[randomNum].textContent = "o";
    } else {
      computerPlayer();
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

function addTwoPlayerEventListeners() {
  gameBoardSquares.forEach((square) => square.removeEventListener("click", onePlayerEventHandler))
  gameBoardSquares.forEach((square) => square.addEventListener("click", twoPlayerEventHandler));
}

function addOnePlayerEventListeners() {
  gameBoardSquares.forEach((square) => square.removeEventListener("click", twoPlayerEventHandler));
  gameBoardSquares.forEach((square) => square.addEventListener("click", onePlayerEventHandler));
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

function addFlashAnimation() {
  winMessage.classList.add("flash");
}

function removeFlashAnimation() {
  winMessage.classList.remove("flash");
}



// EVENT LISTENERS:
onePlayerBtn.addEventListener("click", addOnePlayerEventListeners);
twoPlayerBtn.addEventListener("click", addTwoPlayerEventListeners);
restartBtn.addEventListener("click", resetGame);


// EXTRA FEATURES:

// "Intro"/ intro screen - Tic Tac Toe / Select Player flashes across top of screen
// Watch computer play itself... during tic tac toe screen

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
// JAVASCRIPT:
// Fixed 1. Clicking outside of the board results in the board disappearing and an x being placed in the center of the screen
// Fixed 2. twoPlayerEventHandler function - First click produces o, not x when condition is set to lastPlayed === [] (for first play). Have used == undefined to get around this.
// Fixed 3. At the beginning of a new game, if lastPlayer[0] was x, next player is o. Could have resetGame also reset lastPlayed array to []
// Fixed 4. after winner is declared, further clicks still increment the score counter(s) and adds pieces to board - Cancel event handle to combat this - solved this by removing event listeners and then re-adding with restart button
// Fixed 5. On draw after reset part way through a game, x score increments by 1. This does not seem to happen for o.
// Fixed 6. If there is a win on final play, counter ticks over, but message displayed is "Draw!"
// 7. One player - Win message does not diaplay if computer wins. This seems to be a delay issue.


// CSS
// .squares - When adding content to a square, the height was changing until content had been added to squares on each row. The current fix is height set to 33.3333333%.
// flex-basis is set to 30%. Setting it to 33% results in the squares wrapping to 2 per row rather than 3, and extending beyond the bottom border of the board.


// LESSONS:
// addEventListener needs to be applied TO a node. Eg: resetBtn.AddEventListener("eventToListenFor", functionToRun);
// if not, it will implicitly be applied to all window items.


// STYLE NOTES:
// Inspired by the work of Piet Mondrian - Dutch, Neoplasticist artist.


