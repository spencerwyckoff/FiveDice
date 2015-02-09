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