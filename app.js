$( document ).ready(function() {
    var player = 1;

    //HOVER EVENT HANDLER
    $(".square").on("mouseenter", function(){

        //PLAYER 2 turn - Green
        if (player %2 === 0) {
            $(this).addClass("green").children().attr("src", "o.svg");
            $(this).on("mouseleave", function(){
                $(this).removeClass("green").children().attr("src", "");
            });
        
        //PLAYER 1 turn - Purple
        } else {
            $(this).addClass("purple").children().attr("src", "x.svg");
            $(this).on("mouseleave", function(){
                $(this).removeClass("purple").children().attr("src", "");
            });
        }
    });

    //CLICK EVENT HANDLER
    $(".square").one("click", function(){
        $(this).css("cursor", "auto");
        player++;

        //PLAYER 1 click - Purple
        if (player %2 === 0) {
            $(this).addClass("player-1").children().attr("src", "x.svg");
            $(".player-status").text("Player 2 it's your turn!");
            $(this).off("mouseenter mouseleave");
        
        //PLAYER 2 click - Green
        } else {
            $(this).addClass("player-2").children().attr("src", "o.svg");
            $(".player-status").text("Player 1 it's your turn!");
            $(this).off("mouseenter mouseleave");
        }
    });

    //CHECK WINNER CLICK EVENT HANDLER
    $(".square").on("click", function() {
        
        //PLAYER 1 win scenarios
        if ( $("#square-1").hasClass("player-1") && $("#square-2").hasClass("player-1") && $("#square-3").hasClass("player-1") 
        || $("#square-1").hasClass("player-1") && $("#square-5").hasClass("player-1") && $("#square-9").hasClass("player-1")
        || $("#square-1").hasClass("player-1") && $("#square-4").hasClass("player-1") && $("#square-7").hasClass("player-1")
        || $("#square-2").hasClass("player-1") && $("#square-5").hasClass("player-1") && $("#square-8").hasClass("player-1")
        || $("#square-3").hasClass("player-1") && $("#square-6").hasClass("player-1") && $("#square-9").hasClass("player-1")
        || $("#square-3").hasClass("player-1") && $("#square-5").hasClass("player-1") && $("#square-7").hasClass("player-1")
        || $("#square-4").hasClass("player-1") && $("#square-5").hasClass("player-1") && $("#square-6").hasClass("player-1")
        || $("#square-7").hasClass("player-1") && $("#square-8").hasClass("player-1") && $("#square-9").hasClass("player-1")) {
                $("#header").append("<h2>PLAYER ONE WINS!</h2>").append("<button class='hvr-grow'>Play again?</button>");
                $(".player-status").text("")
                $(".square").off("click mouseenter mouseleave");
        
        //PLAYER 2 win scenarios
        } else if ( $("#square-1").hasClass("player-2") && $("#square-2").hasClass("player-2") && $("#square-3").hasClass("player-2") 
        || $("#square-1").hasClass("player-2") && $("#square-5").hasClass("player-2") && $("#square-9").hasClass("player-2")
        || $("#square-1").hasClass("player-2") && $("#square-4").hasClass("player-2") && $("#square-7").hasClass("player-2")
        || $("#square-2").hasClass("player-2") && $("#square-5").hasClass("player-2") && $("#square-8").hasClass("player-2")
        || $("#square-3").hasClass("player-2") && $("#square-6").hasClass("player-2") && $("#square-9").hasClass("player-2")
        || $("#square-3").hasClass("player-2") && $("#square-5").hasClass("player-2") && $("#square-7").hasClass("player-2")
        || $("#square-4").hasClass("player-2") && $("#square-5").hasClass("player-2") && $("#square-6").hasClass("player-2")
        || $("#square-7").hasClass("player-2") && $("#square-8").hasClass("player-2") && $("#square-9").hasClass("player-2")) {
                $("#header").append("<h2>PLAYER TWO WINS!</h2>").append("<button class='hvr-grow'>Play again?</button>");
                $("p").text("");
                $(".square").off("click mouseenter mouseleave");
        
        //Stalemate
        } else if (player === 10) {
                $("#header").append("<h2>STALEMATE!</h2>").append("<button class='hvr-grow'>Play again?</button>");
                $("p").text("");
                $(".square").off("click mouseenter mouseleave");
        } //end Player check scenarios
        
        //Play again button
        $("button").on("click", function(){
            location.reload();
        });
   
   }); //end check winner click event handler


}); //end document.ready


