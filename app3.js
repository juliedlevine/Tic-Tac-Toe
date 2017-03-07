$( document ).ready(function() {

    // Keep track of wins for each player
    var player1WinCount = 0;
    var player2WinCount = 0;

    function startGame() {

        var tacArray;
        var gameOver = false;
        var plays = 0;
        var player;

        function playerTurn() {
            if (plays % 2 === 0) {
                player = '1';
            } else {
                player = '2';
            }
        }

        playerTurn();


        // CHECK WINNER FUNCTION
        function checkWinner() {
            // Get array of values at each point of click or computer play
            tacArray = $('.square').map(function(){
                return $(this).text();
            });

            if (tacArray[0] === player && tacArray[1] === player && tacArray[2] === player || tacArray[3] === player && tacArray[4] === player && tacArray[5] === player || tacArray[6] === player && tacArray[7] === player && tacArray[8] === player || tacArray[0] === player && tacArray[3] === player && tacArray[6] === player || tacArray[1] === player && tacArray[4] === player && tacArray[7] === player || tacArray[2] === player && tacArray[5] === player && tacArray[8] === player || tacArray[0] === player && tacArray[4] === player && tacArray[8] === player || tacArray[2] === player && tacArray[4] === player && tacArray[6] === player) {
                gameOver = true;
                // Player 1 win scenario
                if (player === '1') {
                    $('h2').html('You win!');
                    player1WinCount += 1;
                    $('#player1Wins').text(player1WinCount);

                // Player 2 win scenario
                } else if (player === '2') {
                    $('h2').html('Computer wins!');
                    player2WinCount += 1;
                    $('#player2Wins').text(player2WinCount);
                }
            } // End check winner if statement scenarios

            // Stalemate scenario
            if (gameOver === false && plays === 9) {
                $('h2').html('Stalemate!');
                gameOver = true;
            }

            // Game over handler
            if (gameOver === true) {
                $('h2').append('<br><button>Play again?</button');

                // Replay button event handler
                $('h2').on('click', 'button', function(){
                    $(this).remove();
                    $('h2').html('Your turn!');
                    $('.square').removeClass('green').removeClass('purple').removeClass('clicked').text('');

                    gameOver = false;
                    plays = 0;
                    playerTurn();

                }); // end replay button click

            } // end game Over if statement

        } // End check winner function


        // COMPUTER PLAY FUNCTION
        function computerPlay(){
            $('h2').text('Computer playing...');

            setTimeout(function() {
                $('h2').text('Your turn!');
                for (var i = 0; i < tacArray.length; i ++) {
                    var squareNum = Math.floor(Math.random() * 9);
                    if (tacArray[squareNum] === '1' || tacArray[squareNum] === '2') {
                        continue;
                    } else {
                        var compSquare = $('.square-' + squareNum);
                        compSquare.text('2').addClass('green').addClass('clicked');
                        tacArray[squareNum] = '2';
                        break;
                    }
                }

                // Check winner after computer plays and change to player 1
                checkWinner();
                plays++;
                playerTurn();

            }, 1000); // End set Timeout

        } // End computer play function



        //MOUSEENTER EVENT HANDLER
        $(".square").on("mouseenter", function() {

            if ( $(this).hasClass('clicked') ) {
                return;
            //PLAYER 1 turn - Purple
            } else if (player === '1') {
                $(this).addClass('purple');
            }

        }); // End mouseenter event handler



        //MOUSELEAVE EVENT HANDLER
        $('.square').on('mouseleave', function(){
            if ( $(this).hasClass('clicked') ) {
                return;
            } else {
                $(this).removeClass('purple').removeClass('green');
            }
        }); // End mouseleave event handler



        //CLICK EVENT HANDLER
        $(".square").on("click", function(){
            plays ++;
            $(this).addClass('clicked');

            //PLAYER click - Purple
            if (player === '1') {
                $(this).addClass('purple').text('1');
            }

            // Check winner after user clicks
            checkWinner();

            // If no winner found, let computer play
            if (gameOver === false) {
                computerPlay();
                playerTurn();
            }

        }); // End click event handler

    } // end start game function


    startGame();
}); // end document.ready
