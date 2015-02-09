$('.dice').addClass('round0');
//interacts with the FiveDice Object only
createNewGame = function() {
	newGame();
	$('.dice').removeClass('locked claimed');
	$('.dice span').text(0);
	$('#totalScore').text('Total Score: ' + 0);
	$('#rollDice').text('Roll Dice');
	$('.dice').addClass('round0');
};

newGame = function() {
	console.log("Starting a New Game.");
	alert("Begin by Rolling the Dice.");
	FiveDice.setCurrentRollCount(0);
	FiveDice.setTotalScore(0);
	FiveDice.resetDice();
};
//START A NEW GAME BUTTON//
$('#newGame').on('click', createNewGame);
//*BUG*needs to clear the DOM
//*BUG*current roll count reset not working

//ROLL THE DICE BUTTON//
$('#rollDice').on('click', function() {
	$('.dice').removeClass('round0');
	//lock the previously claimed dice
	$('.claimed').addClass('locked');
	var newCount = FiveDice.currentRollCount += 1;
	//grab unlocked dice from DOM and roll a #
	if (newCount === 6) {
		FiveDice.gameOver(); 
	} else if (newCount === 5) {
		$('#rollDice').text('Total Your Score');
		$('.dice:not(.locked) span').text(rolledDiceNumber);
	} else {
		$('.dice:not(.locked) span').text(rolledDiceNumber);
	}
	
});

//Generate Random Dice #1-6
var rolledDiceNumber = function() {
	var math = Math.floor(Math.random()*6)+1;
	return math;
};


//CLAIMING DICE//
var grabValue;
//interacts with the DOM only
$('.dice').on('click', function() {
	
	$(this).toggleClass('claimed');

	if ($(this).hasClass('claimed')) {
		grabValue = Number($(this).text());
		switch(grabValue) {
			case 1:
				FiveDice.totalScore += 1;
				break;
			case 2:
				FiveDice.totalScore += 2;
				break;
			case 3:
				FiveDice.totalScore += 0;
				break;
			case 4:
				FiveDice.totalScore += 4;
				break;
			case 5:
				FiveDice.totalScore += 5;
				break;
			case 6:
				FiveDice.totalScore += 6;
				break;
			default:
				FiveDice.totalScore += 0;
		}
		$('#totalScore').text("Total Score: " + FiveDice.totalScore);
	} else {
		switch(grabValue) {
			case 1:
				FiveDice.totalScore -= 1;
				break;
			case 2:
				FiveDice.totalScore -= 2;
				break;
			case 3:
				FiveDice.totalScore -= 0;
				break;
			case 4:
				FiveDice.totalScore -= 4;
				break;
			case 5:
				FiveDice.totalScore -= 5;
				break;
			case 6:
				FiveDice.totalScore -= 6;
				break;
			default:
				FiveDice.totalScore -= 0;
		}
		$('#totalScore').text("Total Score: " + FiveDice.totalScore);
	}
});

//TOTAL SCORE TO DOM//





//GAME IS OVER//
