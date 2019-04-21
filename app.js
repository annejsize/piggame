/*
// Challenge
Player rolls two sixes in a row, loses entire score (note - set up a variable for this - oldDice, compare to dice value), then its the next player's turn

Player has oppty to input initial winning score (currently set to 100); add an input field to the html - jonas says to use .value to get the input, set to global score

add another dice to the game. if either one of them is an 1, player loses its current score
*/

var scores, roundScore, activePlayer, dice, prevDiceRoll, gamePlaying, winningScore;
init();


document.getElementById("inputScore").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        winningScore = document.getElementById("inputScore").value;
        console.log(winningScore);
    }
});

//setter - sets a value
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = "<em>" + dice + "</em>";

//getter - gets a value
//var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll ').addEventListener('click', function() {
    
    if (gamePlaying) {
        prevDiceRoll = dice;
        var dice = Math.floor(Math.random() * 6) + 1;
    
    //Display results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice + '.png';

    // update the round score if the roll isnt' one
    if (dice !== 1 ) {
        roundScore += dice;
        //get
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    if (dice === 6 && prevDiceRoll === 6) {
        console.log("We got here");
        scores[activePlayer] = 0;
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    }
    } else {
        nextPlayer();
    }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        //add current socre to global score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        if (!winningScore) winningScore = 20;

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".player-" + activePlayer + '-panel').classList.add('winner');
            document.querySelector(".player-" + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {   
        nextPlayer();
        }
    }
    
});

//does not recieve paraments and doesn't return a result
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevDiceRoll = 0;
    dice = 0;


    document.querySelector(".dice").style.display = 'none';
    
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
};