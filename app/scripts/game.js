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
			alertify.confirm("The game is complete, " + playerName + ". <br/><br/><strong>You scored " + this.totalScore + " points.</strong><br/><br/>Congratulations! That is the best possible score!<br/><br/>You have earned the title: BadAss<br/><br/> Want to play again?");
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







