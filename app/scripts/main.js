$('.dice').addClass('round0');
// alertify.prompt("<strong>Welcome to Five Die!</strong> <br/> <font size='4px'>The simple, yet surprisingly addictive, dice game.</font><br/><br/><strong>What's your name?</strong>", function(e, str) {
// 	if (e) {
// 		playerName = str;
// 		alertify.alert("Thanks, " + str + ".</br></br><strong>The Five Die Rules:</strong></br><font size='4px'>1) The goal is to get the lowest possible score.<br/>2) You must select at least 1 die per roll.<br/>(yes, you can select multiple dice per roll)<br/>3) 3's = 0pts, everything else is worth its value.</font><br/><br/><strong>Let's Begin - Roll the Dice!</strong>");
// 	}
// });

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
	alertify.alert("Begin by Rolling the Dice.");
	FiveDice.setCurrentRollCount(0);
	FiveDice.setTotalScore(0);
	FiveDice.resetDice();
	FiveDice.claimedCount = 0;
};
//START A NEW GAME BUTTON//
$('#newGame').on('click', createNewGame);
//*BUG*needs to clear the DOM
//*BUG*current roll count reset not working

//ROLL THE DICE BUTTON//
$('#rollDice').on('click', function() {
	$('.dice').removeClass('round0');
	$('.diceContainer').addClass('animated tada');
	setTimeout( function() {
		$('.diceContainer').removeClass('animated tada');	
	}, 1000);


	if (FiveDice.claimedCount < FiveDice.currentRollCount) {
		alertify.alert("Please select at least one die per roll.");
	} else {
	//lock the previously claimed dice
		$('.claimed').addClass('locked');
		var newCount = FiveDice.currentRollCount += 1;
		//grab unlocked dice from DOM and roll a #
		if (newCount === 6) {
			FiveDice.gameOver(); 
		} else if (newCount === 5) {
			$('#rollDice').text('Total Your Score');
			$('.dice:not(.locked) span').text(rolledDiceNumber);
			$('.dice').removeClass('animated tada');
		} else {
			$('.dice:not(.locked) span').addClass('animated tada').text(rolledDiceNumber);
			$('.dice').removeClass('animated tada');

		}
	}
	
});

//Generate Random Dice #1-6
var rolledDiceNumber = function() {
	var math = Math.floor(Math.random()*6)+1;
	return math;
};


//CLAIMING DICE//
var grabValue;

$('.dice').on('click', function() {
	//interacting with the DOM 
	$(this).toggleClass('claimed');
	//changing roll # to match roll value
	if ($(this).hasClass('claimed')) {
	//adding to the claimed count
		FiveDice.claimedCount += 1;
		FiveDice.currentRollCount = FiveDice.claimedCount;
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
		//subtracting from the claimed count
		FiveDice.claimedCount -= 1;
		FiveDice.currentRollCount = FiveDice.claimedCount;
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