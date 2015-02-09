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

	gameOver: function() {
		alertify.alert("The Game is Over. \nClick New Game to Play again.");
	},//the game ends when all dice are locked OR...
						//the maxRollCount is exceeded
};







