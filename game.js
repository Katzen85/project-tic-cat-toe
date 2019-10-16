console.log("Tic Cat Toe");

/*
Requirements:
* Render a game in the browser
* Switch turns between more than one player
* Design logic for winning & visually display which player won
* Include separate HTML / CSS / JavaScript files
* Stick with KISS (Keep It Simple Stupid) principles
* Use Javascript for DOM manipulation
* Deploy your game online, where the rest of the world can access it
* Use semantic markup for HTML and CSS (adhere to best practices)


Bonus extensions:
These are for extra credit! DON'T focus on these until you've hit the core requirements.

Complete - Keep track of multiple game rounds with a win counter
* Allow game customizable options, time limits, board size, game rounds, name & profiles etc  
* Allow players to customize their token (X, O, name, picture, avatar etc)
* Get inventive with your styling - research CSS effects, animations to spiff things up
* **Research** **LocalStorage** or **SessionStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
* Use timers to display "waiting..." messages while users are waiting to be matched
* **Research** web audio API and add sound effects to your game
* Be creative! Bend the rules and give it a twist!
** If winner or if all squares are "full" game asks player to reset

BRAINSTORM:
 Data, presentation, markup, style, DOM manipulation
*/


// ELEMENTS & VARIABLES:
var gameBoardSquares = document.querySelectorAll(".squares");
var xScoreCounter = document.querySelector(".x-score-counter");
var oScoreCounter = document.querySelector(".o-score-counter");
var restartBtn = document.querySelector(".restart-button");
var winMessage = document.querySelector(".win-message");

var lastPlayed = [];

// FUNCTIONS
function playHandler(event) {

  if (lastPlayed[0] == undefined || lastPlayed[0] == "o") { 
    placeX();

  } else {
   placeO();
  }
  checkForWinner();
  checkForDraw();
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
    } else if (winningCombinations[key].every((element) => element == "o")) {
      displayOWins();
      addPointToO();
    }  
  });
}

function checkForDraw() {

  var boardSquares = Array.from(gameBoardSquares);

  if (boardSquares.every((square) => square.textContent != "")) {
    winMessage.textContent = "It's a Draw!"
  }
}

function resetGame(event) {
  gameBoardSquares.forEach((square) => square.textContent = "");
  winMessage.textContent = "";
  lastPlayed = [];
}

function addPointToX() {
  xScoreCounter.textContent = Number(xScoreCounter.textContent) + 1;
}

function displayXWins() {
  winMessage.textContent = "X Wins!";
}

function addPointToO() {
  oScoreCounter.textContent = Number(oScoreCounter.textContent) + 1;
}

function displayOWins() {
  winMessage.textContent = "O Wins!";
}

// EVENT LISTENERS:
gameBoardSquares.forEach((square) => square.addEventListener("click", playHandler));
restartBtn.addEventListener("click", resetGame);



// EXTRA FEATURES:
// Draw counter
// Illuminate background of winning squares
// Play 1 or 2 player
// Select 1st player (x or o)
// Full game restart (home menu?)



// NOTES:
// ITEMS FOR CLARIFICATION:
// Adding console log test to the above produces 9 logs each time a single square is clicked. 
// When calling a function with the event passed to it only logs once for each square.


// PROBLEMS:
// JAVASCRIPT:
// 1. Clicking outside of the board results in the board disappearing and an x being placed in the center of the screen - Problem disappeared?!
// 2. Playhandler function - First click produces o, not x when if condition is set to lastPlayed === [] (for first play). Have used == undefined to get around this.
// 3. At the beginning of a new game, if lastPlayer[0] was x, next player is o. Could have resetGame also reset lastPlayed array to []
// 4. after winner is declared, further clicks still increment the score counter(s)


// CSS
// .squares - When adding content to a square, the height was changing until content had been added to squares on each row. The current fix is height set to 33.3333333%.
// flex-basis is set to 30%. Setting it to 33% results in the squares wrapping to 2 per row rather than 3, and extending beyond the bottom border of the board.

// LESSONS:
// addEventListener needs to be applied TO a node. Eg: resetBtn.AddEventListener("eventToListenFor", functionToRun);
// if not, it will implicitly be applied to all window items.