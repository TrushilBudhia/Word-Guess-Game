// VARIABLES
var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerCount = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");

var chosenWord = "";
var numberWordFields = 0;
var numberWins = 0;
var numberLosses = 0;
var winValue = false;
var counter;
var timeValue = 30;

var words = ["javascript", "append", "intervals", "propogation", "storage", "element", "attributes"];
var lettersInChosenWord = [];
var blanksLetters = [];

// FUNCTIONS

function init() {
    getWins();
    getLosses();
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        time--;
        timerCount.textContent = time;
        if(time >= 0) {
            if(winValue && time > 0) {
                clearInterval(counter);
                winGame();
            }
        }
        if(time === 0) {
            clearInterval(counter);
            loseGame();
        }
    }
}

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numberWordFields = lettersInChosenWord.length;
    blanksLetters = [];
    for(var i = 0; i < numberWordFields; i++) {
        blanksLetters.push("_");
    }
    wordBlank.textContent = blanksLetters.join(" ");
}

function winGame() {
    wordBlank.textContent = "You Won!!!";
    numberWins++;
    startButton.disabled = false;
    setWins()
}

function loseGame() {
    wordBlank.textContent = "You Lose!!!";
    numberLosses++
    startButton.disabled = false;
    setLosses()
}

function setWins() {
    win.textContent = numberWins;
    localStorage.setItem("numberWins", numberWins);
}

function setLosses() {
    lose.textContent = numberLosses;
    localStorage.setItem("numberLosses", numberLosses);
}

function getWins() {
    var storedWins = localStorage.getItem("numberWins");
    if (storedWins !== null) {
        numberWins = storedWins;
    } else {
        numberWins = 0;
    }
    win.textContent = numberWins;
}

function getLosses() {
    var storedLosses = localStorage.getItem("numberLosses");
    if (storedLosses !== null) {
        numberLosses = storedLosses;
    } else {
        numberLosses = 0;
    }
    lose.textContent = numberLosses;
}

function checkWin() {
    if(chosenWord === blanksLetters.join("")) {
        winValue = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false;
    for(var i = 0; i < numberWordFields; i++) {
        if(chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    if(letterInWord) {
        for(var j = 0; j < numberWordFields; j++) {
            if(chosenWord[j] === letter) {
                blanksLetters[j] = letter;
            }
        }
    wordBlank.textContent = blanksLetters.join(" ");
    }
}

function resetGame() {
    numberWins = 0;
    numberLosses = 0;
    setWins();
    setLosses();
}

// EVENTS

startButton.addEventListener('click', function() {
    winValue = false;
    timeValue = 30;
    startButton.disabled = 'true'; 
    //startButton.style.background = '#A8A8A8';

    renderBlanks();
    startTimer(timeValue);
});

document.addEventListener("keydown", function(event) {
    if (timeValue === 0) {
        return;
    }
    var keyValue = event.key.toLowerCase();
    var letters = "abcdefghijklmnopqrstuvwxyz".split("");
    if(letters.includes(keyValue)) {
        var letterPress = event.key;
        checkLetters(letterPress);
        checkWin();
    }
});

resetButton.addEventListener('click', resetGame);

init();