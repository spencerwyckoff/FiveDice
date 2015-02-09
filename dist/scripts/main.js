var theDice;
var newGame;
var rollTheDice;
var claimToggle;
var lockDice;
var startRollCount;
var maxRollCount;
var currentRollCount;
var gameOver;
var setCurrentRollCount;
var checkedClaimedDice;
var diceScore;
var createNewGame;
var claimedCount;
var playerName;
var scoresDatabase = [];

//The Dice Object Constructor
function DiceObj (name) {
	this.name = name;
	this.value1 = 1;
	this.value2 = 2;
	this.value3 = 0;
	this.value4 = 4;
	this.value5 = 5;
	this.value6 = 6;
	this.claimed = false;
	this.locked = false;		
}
//Create Dice Objects
var d1 = new DiceObj ('d1'); {}
var d2 = new DiceObj ('d2'); {}
var d3 = new DiceObj ('d3'); {}
var d4 = new DiceObj ('d4'); {}
var d5 = new DiceObj ('d5'); {}
//Add Dice Objects to an Array
var allDice = [];
allDice.push(d1);
allDice.push(d2);
allDice.push(d3);
allDice.push(d4);
allDice.push(d5);



// 		if (math === 1) {
// 			$("this").text(1);
// 			diceScore = 1;
// 		} else if (math === 2) {
// 			$("this").text(2);
// 			diceScore = 2;
// 		} else if (math === 3) {
// 			$("this").text(3);
// 			diceScore = 0;
// 		} else if (math === 4) {
// 			$("this").text(4);
// 			diceScore = 4;
// 		} else if (math === 5) {
// 			$("this").text(5);
// 			diceScore = 5; 
// 		} else {
// 			$("this").text(6);
// 			diceScore = 6;
// 		}
// 	console.log("The roll was " + math);
// 	console.log("The value is " + diceScore);
// 	return math;
// };




var lockClaimedDice = function() {
	allDice.forEach(function(die) {
	  if (die.claimed === true) {
	    die.locked = true;
	  }
	});
};

var rollTheDice = function() {
	allDice.forEach(function (dice, i) {
		if (dice.locked === false) {
			rolledDiceNumber();
		}
	});
};

var rollDiceButton = function () {
	lockClaimedDice();
	rollTheDice();
};


//FOR TESTING
var testScenario = function() {
  FiveDice.claimToggle(d1);
  FiveDice.claimToggle(d2);
  lockClaimedDice();
  console.log(allDice);
};
//FiveDice GAME OBJECT
var FiveDice = {
	startRollCount: 0,
	currentRollCount: 0,
	maxRollCount: 5,
	totalScore: 0,	
	theDice: allDice,
	claimedCount: 0,
	
//new game methods
	setCurrentRollCount: function(rollCount) {
		this.currentRollCount = rollCount;
	},		

	setTotalScore: function(score) {
		this.totalScore = score;
	},

	resetDice: function() {
		this.theDice.forEach( function(dice) {
			dice.claimed = false;
			dice.locked = false;
		});
	},

//claiming and locking dice methods	
	claimToggle: function(die) {
		if (die.claimed === true) {
			die.claimed = false;
		} else {
			die.claimed = true;
		}
	}, 

	lockDice: function(die) {
		die.locked = true;
	},

//game over method
	gameOver: function() {
		if (this.totalScore === 0) {
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>Congratulations! That is the best possible score!<br/><br/> Want to play again?");
		} else if (this.totalScore >=1 && this.totalScore < 5) {
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>That is a solid score, nice job.<br/><br/>Want to play again?");
		} else if (this.totalScore >=5 && this.totalScore < 10) {
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>That's an ok score, but you can do better.<br/><br/>Want to play again?");
		} else if (this.totalScore >=10 && this.totalScore < 15) {
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>Rough luck this time.<br/><br/>Want to play again?");
		} else {
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>Are you even trying?<br/> Get your head in the game.<br/><br/>Want to play again?");
		}
		scoresDatabase.push(this.totalScore);
	},//the game ends when all dice are locked OR...
						//the maxRollCount is exceeded
};








$('.dice').addClass('round0');
alertify.prompt("<strong>Welcome to Five Die!</strong> <br/> <font size='4px'>The simple, yet surprisingly addictive, dice game.</font><br/><br/><strong>What's your name?</strong>", function(e, str) {
	if (e) {
		playerName = str;
		alertify.alert("Thanks, " + str + ".</br></br><strong>The Five Die Rules:</strong></br><font size='4px'>1) The goal is to get the lowest possible score.<br/>2) You must select at least 1 die per roll.<br/>(yes, you can select multiple dice per roll)<br/>3) 3's = 0pts, everything else is worth its value.</font><br/><br/><strong>Let's Begin - Roll the Dice!</strong>");
	}
});

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