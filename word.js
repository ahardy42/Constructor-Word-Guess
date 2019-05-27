var Letter = require("./letter");

var Word = function(word) {
    this.word = word;
    this.wordArray = [];
	this.makeWord = function() {
        // create an array of letter objects
        this.wordArray.length = 0;
		for (i = 0; i < this.word.length; i++) {
            var letter = new Letter(word[i]); 
            this.wordArray.push(letter);
        }
    };
    this.displayWord = function() {
        var lettStringArray = [];
        this.wordArray.forEach(function(lett) {
            var lettString = lett.displayLetter();
            lettStringArray.push(lettString);
        });
        var wordString = lettStringArray.join(" ");
        console.log(`\nThe "Popular" Movie Title to guess is: ${wordString}\n`);
    }
    this.guessCheck = function(guess) {
        var isCorrect = false;
        this.wordArray.forEach(function(lett) {
            lett.checkGuess(guess);
            lett.displayLetter();
            if (lett.letter.toLowerCase() === guess && lett.isGuessed) { isCorrect = true};
        });
        return isCorrect;
    };
    this.areAllLettersGuessed = function() {
        var pinochioNose = 0; // increase by 1 each time a letter .isGuessed = false;
        this.wordArray.forEach(function(lett) {
            if (!lett.isGuessed) {pinochioNose++}
        });
        if (pinochioNose > 0) {
            return false
        } else {
            return true
        }
    };
};

module.exports = Word;