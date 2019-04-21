/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


// Challenge

Player rolls two sixes in a row, loses entire score (note - set up a variable for this - oldDice, compare to dice value), then its the next player's turn

Player has oppty to input initial winning score (currently set to 100); add an input field to the html - jonas says to use .value to get the input, set to global score

add another dice to the game. if either one of them is an 1, player loses its current score

*/

var scores, roundScore, activePlayer, dice, gamePlaying;
init();
//setter - sets a value
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = "<em>" + dice + "</em>";

//getter - gets a value
//var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll ').addEventListener('click', function() {
    
    if (gamePlaying) {
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

        if (scores[activePlayer] >=20) {
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