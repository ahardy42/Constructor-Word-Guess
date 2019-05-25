// constructor for the letter

var Letter = function(letter) {
	this.letter = letter;
	this.hidden = "_";
	this.isGuessed = false;
	this.isNonLetter = false;
	this.checkGuess = function(guess) {
		if (guess = this.letter) {
			this.isGuessed = true;
			// maybe also return true;
		}
	}
	this.displayLetter = function() {
		if (this.isGuessed || this.letter === " " || this.letter === ":") {
			return this.letter; 
		} else {
			return this.hidden;
		}
	}
};

module.exports = Letter;
