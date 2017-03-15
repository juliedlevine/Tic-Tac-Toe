# Tic Tac Toe
---
## [Live Demo](http://julies-tictactoe.bitballoon.com/)

## What It Is
Tic Tac Toe game using jQuery. User can play against the computer (who is not very smart), and wins and losses are tallied.

## Languages used
* HTML
* CSS
* JavaScript
* jQuery

## Game Walkthrough

### Landing Page
As user mouses over each square a purple X will appear in that particular square. When they click in a square the X 'sticks' and they've made their move.
<br>
![alt text](https://github.com/juliemdyer/Tic-Tac-Toe/blob/master/screenshots/landing_page.png)

### Computer Playing
After the user clicks a square, "Computer Playing..." text for a couple seconds before green 'O' is displayed. It is then the player's turn again.
<br>
![alt text](https://github.com/juliemdyer/Tic-Tac-Toe/blob/master/screenshots/computer_playing.png)

### Computer wins / Play Again
Here the computer has won. The user can click Play Again and the game board is re-set. The win count for Computer has increased to 1 here.
<br>
![alt text](https://github.com/juliemdyer/Tic-Tac-Toe/blob/master/screenshots/computer_wins.png)


## Challenges

### Adding Hover effects for each Player
I thought of lots of different ways to do this. The first thing I tried was appending the corresponding image depending on whose turn it was. So if it was Player 1's turn, an X would be appended to the square which had been moused into. This ended up not working, and was more complicated than it needed to be. The next thing I tried was swapping out the image source in the jQuery. This worked, but added a lot of code in the JavaScript file.

What I ended up doing was adding 2 classes in my CSS file, one for player 1 and another for player 2. Each had their own colors and background image (X and O). In my jQuery all I had to do was add and remove classes.

jQuery code for mouseenter and mouseleave events. The clicked class removes all pointer events, so once that square has been clicked, nothing happens when the user mousesover or clicks that square.
```JavaScript
//MOUSEENTER EVENT HANDLER
$(".square").on("mouseenter", function() {
    // If square has already beeb clicked, do nothing
    if ( $(this).hasClass('clicked') ) {
        return;
    // Otherwise add purple class
    } else {
        $(this).addClass('purple');
    }
}); // End mouseenter event handler

//MOUSELEAVE EVENT HANDLER
$('.square').on('mouseleave', function(){
    // If square has already been clicked, do nothing
    if ( $(this).hasClass('clicked') ) {
        return;
    // Otherwise remove all classes
    } else {
        $(this).removeClass('purple').removeClass('green');
    }
}); // End mouseleave event handler
```

CSS showing classes for each player and clicked class
```CSS
.purple {
	color: #6B7A8F; /*purple*/
	background-color: #6B7A8F; /*purple*/
	background-image: url('x.svg');
	background-size: 70%;
	background-position: center;
	background-repeat: no-repeat;
	cursor: pointer;
}
.green {
	color: #4ABDAC; /*green*/
	background-color: #4ABDAC; /*green*/
	background-image: url('o.svg');
	background-size: 70%;
	background-position: center;
	background-repeat: no-repeat;
	cursor: pointer;
}
.clicked {
	pointer-events: none;
}
```

### Getting the Computer to play randomly
In order to make Tic Tac Toe a fun game for someone to play on their own I wanted to integrate a play against the computer feature. I also wanted it to look like the computer was "thinking" so I wanted to delay the placement of the square.
To accomplish this I created a ComputerPlay function, which was called at the end of the user's turn (as long as the game is not over). Inside the function I used setTimeout for the delay.
To make the computer play randomly I first drew a random number from 1 to 9. Then I looped through each square and had the computer play on that square as long as it was not occupied. I did this in a loop so a new random number would continue to be generated until an empty random square was found.

```JavaScript
// COMPUTER PLAY FUNCTION
function computerPlay() {
    // Change to player 2 and increase play count
    player = '2';
    playCount++;
    $('h2').text('Computer playing...');
    // Wait a few seconds before playing computer square
    setTimeout(function() {
        $('h2').text('Your turn!');
        // Play random square for computer
        var squareFound = false;
        // Loop until available random square found
        while (squareFound === false) {
            var squareNum = Math.floor(Math.random() * 9);
            // If square is taken, start again with a new random number
            if (tacArray[squareNum] === '1' || tacArray[squareNum] === '2') {
                continue;
            } else {
                // Set square to computer theme & add to tacArray
                var compSquare = $('.square-' + squareNum);
                compSquare.text('2').addClass('green').addClass('clicked');
                tacArray[squareNum] = '2';
                squareFound = true;
            }
        }
        // Check winner after computer plays
        checkWinner();
    }, 1000); // End set Timeout
} // End computer play function
```

### Checking for a Winner
There are lots of different ways to check win scenarios in Tic Tac Toe. I ended up going with a very straightforward approach. I wrote down all the different win scenarios and wrote one (long) if statement which would check if any of those scenarios were met. This function which includes this statement is called after every player/computer move.
```JavaScript
// Check for winner
if (tacArray[0] === player && tacArray[1] === player && tacArray[2] === player || tacArray[3] === player && tacArray[4] === player && tacArray[5] === player || tacArray[6] === player && tacArray[7] === player && tacArray[8] === player || tacArray[0] === player && tacArray[3] === player && tacArray[6] === player || tacArray[1] === player && tacArray[4] === player && tacArray[7] === player || tacArray[2] === player && tacArray[5] === player && tacArray[8] === player || tacArray[0] === player && tacArray[4] === player && tacArray[8] === player || tacArray[2] === player && tacArray[4] === player && tacArray[6] === player) {
    gameOver = true;
    // Player 1 win scenario
    if (player === '1') {
        $('h2').html('You win!');
        player1WinCount += 1;
        $('#player1Wins').text(player1WinCount);

    // Computer win scenario
    } else if (player === '2') {
        $('h2').html('Computer wins!');
        player2WinCount += 1;
        $('#player2Wins').text(player2WinCount);
    }
```

### Implementing Play again / Win Count
After each win/loss/stalemate I wanted to allow the user to continue to play, and keep track of wins and losses. You can see in the code above that if a winner is found, the variable gameOver is set to true. If gameOver is true then
I append a play again button. If that button is clicked, the button is immediately hidden, and all game logic is reset.
```JavaScript
// Game over handler
if (gameOver === true) {
    // Add play again button and disable game squares
    $('h2').append('<br><button>Play again?</button');
    $('.square').addClass('clicked');

    // Replay button event handler
    $('h2').on('click', 'button', function(){
        // Remove button and re-initialize squares
        $(this).remove();
        $('h2').html('Your turn!');
        $('.square').removeClass('green').removeClass('purple').removeClass('clicked').text('');

        // Reset game logic variables
        gameOver = false;
        playCount = 0;
        player = '1';
    }); // End replay button click

} // End game Over if statement
```
