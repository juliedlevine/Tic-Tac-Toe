$( document ).ready(function() {

    // Keep track of wins for each player
    var player1WinCount = 0;
    var player2WinCount = 0;

    function startGame() {

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
            // Get array of values at each point of click
            var tacArray = $('.square').map(function(){
                return $(this).text();
            });
            // console.log(tacArray);

            if (tacArray[0] === player && tacArray[1] === player && tacArray[2] === player || tacArray[3] === player && tacArray[4] === player && tacArray[5] === player || tacArray[6] === player && tacArray[7] === player && tacArray[8] === player || tacArray[0] === player && tacArray[3] === player && tacArray[6] === player || tacArray[1] === player && tacArray[4] === player && tacArray[7] === player || tacArray[2] === player && tacArray[5] === player && tacArray[8] === player || tacArray[0] === player && tacArray[4] === player && tacArray[8] === player || tacArray[2] === player && tacArray[4] === player && tacArray[6] === player) {
                gameOver = true;
                if (player === '1') {
                    $('h2').html('Player 1 wins!');
                    player1WinCount += 1;
                    $('#player1Wins').text(player1WinCount);

                } else {
                    $('h2').html('Player 2 wins!');
                    player2WinCount += 1;
                    $('#player2Wins').text(player2WinCount);
                }
            } // End check winner if statement scenarios

            if (plays === 9) {
                gameOver = true;
                $('h2').html('Stalemate!');
            } // End check stalemate

        } // End check winner function

        //MOUSEENTER EVENT HANDLER
        $(".square").on("mouseenter", function() {
            console.log('Player ' + player + ' turn');

            if ( $(this).hasClass('clicked') ) {
                return;
            //PLAYER 1 turn - Purple
            } else if (player === '1') {
                $(this).addClass('purple');

            //PLAYER 2 turn - Green
            } else if (player === '2') {
                $(this).addClass('green');
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
            plays += 1;
            $(this).addClass('clicked');

            //PLAYER 1 click - Purple
            if (player === '1') {
                $(this).addClass('purple').text('1');

            //PLAYER 2 click - Green
            } else if (player === '2') {
                $(this).addClass('green').text('2');
            }

            checkWinner();

            playerTurn();

            // Change player turn text
            $('#playerText').text(player + ' ');

            // Game over handler
            if (gameOver === true) {
                $('h2').append('<br><button>Play again?</button');

                // Replay button event handler
                $('h2').on('click', 'button', function(){
                    $(this).remove();
                    $('h2').html('Player 1 make your move!');
                    $('.square').removeClass('green').removeClass('purple').removeClass('clicked').text('');

                    gameOver = false;
                    plays = 0;
                    playerTurn();

                }); // end replay button click

            } // end game Over if statement

        }); // End click event handler

    } // end start game function


    startGame();
}); // end document.ready
