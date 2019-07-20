$(document).ready(function () {

var questions = [
    "What's my favorite thing to do in basketball?",
    "What's my favorite boba restaurant?",
    "When I use to live in Michigan, the only thing I did as a kid was...",
    "What is my favorite show?",
    "Who is my favorite NBA player?",
    "What's my favorite drink?"
];
var answers = [
    "Breaking people's ankles",
    "Kung Fu Tea",
    "Throwing snowballs at a moving car",
    "Supernatural",
    "Kyrie Irving",
    "Cappuccino"
];
var choices = [
    [
        "Breaking people's ankles", 
        "Making layups", 
        "Shooting from the 3 pointer shot", 
        "Showing off my streetball moves" 
    ],
    [
        "Tea House", 
        "I Luv Boba", 
        "Fusion", 
        "Kung Fu Tea" 
    ],
    [
        "Building a snowman", 
        "Throwing snowballs at a moving car", 
        "Playing video games",
        "Sleep all day"
    ],
    [
        "The Office", 
        "Supernatural", 
        "Impractical Jokers", 
        "The Walking Dead"
    ],
    [
        "Kyrie Irving", 
        "LeBron James", 
        "Chris Paul", 
        "Steph Curry"
    ],
    [
        "Caramel Frappuccino", 
        "Boba Teas", 
        "Cappuccino", 
        "Mountain Dew"
    ]    
];
var images = [
    '<img src="assets/images/HugeBruisedHorseshoecrab-size_restricted.gif">',
    '<img src="assets/images/KFT1-1.jpg">',
    '<img src="assets/images/tenor.gif">',
    '<img src="assets/images/tumblr_muu1n84wcR1qafea7o2_r1_250.gif">',
    '<img src="assets/images/tumblr_mxnlo74BjE1slm59yo1_250.gif">',
    '<img src="assets/images/tumblr_og6uiks7Gk1vg2m2oo3_400.gif">'
];


var startGame;
var loadGame;
var answersDisplay;
var imagesDisplay;
var timerRunning;
var timer = 30;
var answersClicked;
var answerCounter = 0;
var correctCounter = 0;
var wrongCounter = 0;
var runOutCounter = 0;


function displayGame() {
    startGame = $("#startButton").text("Start Game")
    $("#gameContent").append(startGame);
};
displayGame();

$("#startButton").on("click", function() {
    $("#startButton").hide();
    $("#title").hide();
    $("#intro").hide();
    createGame();
    createTimer();
});


function createGame() {
    loadGame = "<h2 class='questionsDiplay'>" + questions[answerCounter] + "</h2>";
    answersDisplay =
    "<h3 class='answerButton'>" + choices[answerCounter][0] +
    "</h3><h3 class='answerButton'>" + choices[answerCounter][1] +
    "</h3><h3 class='answerButton'>" + choices[answerCounter][2] +
    "</h3><h3 class='answerButton'>" + choices[answerCounter][3] +
    "</h3>";

    $("#displayQuestions").html(loadGame);
    $("#displayAnswers").html(answersDisplay);
    $("#displayImages").html(" ");
    $("#timerClock").show();
    selectAnswers();
};


function selectAnswers() {
    $(".answerButton").on("click", function() {
        answersClicked = $(this).text();
        if (answersClicked === answers[answerCounter]) {
            clearInterval(timerRunning);
            correct();
        } 
        else {
            clearInterval();
            wrong();
        }
    });
};


function createTimer() {
    timerRunning = setInterval(decrement, 1000);
    function decrement() {
        if (timer > 0) {
            timer--;
        }
        if (timer === 0) {
            clearInterval(timerRunning);
            ranOutOfTime();
        }
        $("#timerClock").html("Time Remaining: " + timer);
    }
};


function ranOutOfTime() {
    runOutCounter++;
    $("#timerClock").html(" ")
    loadGame = "<p class='alert'>Times Up!!!  The correct answer was: " + answers[answerCounter] + "</p>";
    $("#alert").html(loadGame);
    setTimeout(waitTimer, 5000);
};


function waitTimer() {
    if (answerCounter < 6) {
        answerCounter++;
        $("#alert").html(" ");
        $("#displayQuestions").html(" ");
        $("#displayAnswers").html(" ");
        createGame();
        timer = 30;
        createTimer();
    } 
    else if (answerCounter === 6) {
        gameOver();
    }
};


function correct() {
    correctCounter++;
    clearInterval(timerRunning);
    loadGame = "<p class='alert'>Correct!</p>";
    $("#alert").html(loadGame);
    imagesDisplay = images[answerCounter];
    $("#displayImages").html(imagesDisplay);
    $("#displayQuestions").html(" ");
    $("#displayAnswers").html(" ");
    $("#timerClock").hide();
    setTimeout(waitTimer, 5000);
};


function wrong() {
    wrongCounter++;
    clearInterval(timerRunning);
    loadGame ="<p class='alert'>Wrong bro!!!  The correct answer was: " + answers[answerCounter] + "</p>";
    $("#alert").html(loadGame);
    $("#displayQuestions").html(" ");
    $("#displayAnswers").html(" ");
    $("#timerClock").html(" ");
    setTimeout(waitTimer, 5000);
};


function gameOver() {
    if (correctCounter === 6) {
        loadGame = 
            "<p>Damn... I'm surprised that you got all of them correct!</p>" + 
            "<p class = 'correct' >Correct: " + correctCounter + "</p>" + 
            "<p class = 'wrong' >Wrong: " + wrongCounter + "</p>" +
            "<p class='timeout' >Unanswered: " + runOutCounter + "</p>"
        ;  
        $(".gameContent").html(loadGame);
    } 
    else if (correctCounter >= 3) {
        loadGame = 
            "<p>Ok ok... I see you bro.</p>" + 
            "<p class = 'correct' >Correct: " + correctCounter + "</p>" + 
            "<p class = 'wrong' >Wrong: " + wrongCounter + "</p>" +
            "<p class='timeout' >Unanswered: " + runOutCounter + "</p>"
        ;   
        $(".gameContent").html(loadGame);
    }
    else {
        loadGame = 
            "<p>Lmao it's all good. I'm not expecting you to know me very well.</p>" + 
            "<p class = 'correct' >Correct: " + correctCounter + "</p>" + 
            "<p class = 'wrong' >Wrong: " + wrongCounter + "</p>" +
            "<p class='timeout' >Unanswered: " + runOutCounter + "</p>"
        ;
        $(".gameContent").html(loadGame);
    }
}

});



