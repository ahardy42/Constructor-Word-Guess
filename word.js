var Letter = require("./letter");

var Word = function(word) {
    this.word = word;
    this.wordArray = [];
	this.makeWord = function() {
		for (i = 0; i < this.word.length; i++) {
            var letter = new Letter(word[i]); 
            letter = letter.displayLetter();
            wordArray.push(letter);
        }
		var wordString = wordArray.join("");
		console.log(`\n${wordString}\n`);
    };
    this.guessCheck = function(guess) {
        var isCorrect = false;
        wordArray.forEach(function(lett) {
            lett.guessCheck(guess);
            lett.displayLetter();
            if (lett.isGuessed) { isCorrect = true};
        });
        return isCorrect;
    };
    this.areAllLettersGuessed = function() {
        var pinochioNose = 0; // increase by 1 each time a letter .isGuessed = false;
        wordArray.forEach(function(lett) {
            if (!isGuessed) {pinochioNose++}
        });
        if (pinochioNose > 0) {
            return false
        } else {
            return true
        }
    };
};

module.exports = Word;