$( document ).ready(function() {

    // Keep track of wins for each player, don't reset these variables
    var player1WinCount = 0;
    var player2WinCount = 0;

    function startGame() {

        // Initialize game logic variables
        var tacArray;
        var gameOver = false;
        var playCount = 0;
        var player = '1';

        // CHECK WINNER FUNCTION
        function checkWinner() {
            // Get array of values at each point of click or computer play
            tacArray = $('.square').map(function(){
                return $(this).text();
            });

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

            }// End check winner if statement scenarios

            // Stalemate scenario
            if (gameOver === false && playCount === 9) {
                $('h2').html('Stalemate!');
                gameOver = true;
            }

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

        } // End check winner function


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



        //CLICK EVENT HANDLER
        $(".square").on("click", function(){
            // Change to player 1 and increase play count
            player = '1';
            playCount++;
            // Update square to player 1 theme
            $(this).addClass('clicked').addClass('purple').text('1');
            // Check winner after player clicks
            checkWinner();
            // If no winner found, let computer play
            if (gameOver === false) {
                computerPlay();
            }

        }); // End click event handler

    } // End start game function

    startGame();
}); // End document.ready
