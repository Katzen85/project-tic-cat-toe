**TIC TAC TOE**

1. How to Play
2. Development
3. Problems


HOW TO PLAY:

Tic Tac Toe (aka noughts & crosses) is a classic game that dates back to antiquity: According to Wikipedia "Games played on three-in-a-row boards can be traced back to ancient Egypt, where such game boards have been found on roofing tiles dating from around 1300 BCE."

The objective is to get 3 of the same symbole in a row. Each player plays as either "x" or "o", and the first player to get 3 in a row wins the match. 

To begin a game, click either one player to play against the computer, or two player to play against a friend. X's always plays first. For one player, the computer will always be O (therefore playing second).

At the end of a game, click the restart button to start a new game. The counters to the left and right of the board will keep track of player scores (games won). To reset the scores to 0, click either the one player or two player button.

Have Fun!


DEVELOPMENT:

1. Planning:

1a: Rough sketch - I started with opening a notebook and drawing a rough sketch of how my game would look. This included the game board, score counters, and buttons, and this process allowed me to visually map out all of the features that would requir styling and game logic. 

1b: Basic structure - I created a basic game board with html and some css, simply to translate my sketch to screen and give me a basic visual model. There was no styling at this point, simply boxes making up the board and score counters, and basic buttons. 

1c: Pseudo-code: I then started writing the pseudo code for the game logic. I didn't know where to start and so started with what intuitivelly came to mind - Creating x's and o'x on the board. This process inevitably brought to mind other aspects of would be required in the logic, and I continued this process until I had what I thought was a somewhat comprehensive map of what logic would be required in order to create a functional game. 

2. Writing The Game Logic: This process followed on directly from the pseudo-code. I simply started back at the top and started translating the preudo-code I had written into working logic.

3. Styling: I completed the styling as a secondary item, knowing that the functionality of the game would be more of a challenge and likely require significantly more time. The style of the game is inspired by the artist Piet Mondrian, one of the pioneers of 20th century Abstract Art. He developed a "non-representational" form of art known as "Neoplasticism", making use of only the three primary colours (red, blue, yellow) and two primary directions (vertical & horizontal). 


PROBLEMS:
FIXED:
Clicking outside of the board results in the board disappearing and an x being placed in the center of the screen (addEvenetListener had not been applied to a node and therefore was automatically applied to window).

twoPlayerEventHandler function - First click produces o, not x when condition is set to lastPlayed === [] (for first play). Have used == undefined to get around this.

At the beginning of a new game, if lastPlayer[0] was x, next player is o. Have had resetGame also reset lastPlayed array to [].

After winner is declared, further clicks still increment the score counter(s) and adds pieces to board - Initially fixed this by having a function cancel and re-add event handlers but this gets messy - Finally resolved this by using a gameActive variable set to true or false.

On draw after reset part way through a game, x score increments by 1. This does not seem to happen for o. This problem disappeared before I could figure out why it was happening.

If there is a win on final play, counter ticks over, but message displayed is "Draw!". This was a runtime error, simply fixed by having the checkForDraw function called prior to the checkForWin function.  

.squares (css) - When adding content to a square, the height was changing until content had been added to squares on each row. The current fix is height set to 33.3333333%.

flex-basis is set to 30%. Setting it to 33% results in the squares wrapping to 2 per row rather than 3, and extending beyond the bottom border of the board.


NOT YET FIXED:
7. One player - Win message does not diaplay if computer wins. This seems to be a delay issue.

8. One player - Human player is able to place consecutive x's before the computer has played their turn.


CHALLENGES:
- Writing accurate pseudocode - Accurately thinking of all of the required game logic prior to begging the actual coding.
- Accidentally writing bugs into the program when adding further features
- Functions! When not to use them?! (I have about a million)

Toys!
- Playing vs (currently stupid) computer!


LESSONS:
addEventListener needs to be applied TO a node. Eg: resetBtn.AddEventListener("eventToListenFor", functionToRun);
if not, it will implicitly be applied to all window items.

Naming things is the holy grail of good coding. 

