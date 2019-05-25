var inquirer = require("inquirer");
// var Movies = require("./movie");
var Word = require("./word");

// var movies = new Movies();
var word = new Word();

var Game = function() {
    this.words = ["fart", "piss", "wingnut", "dingus", "umbrella", "antidisestablishmentarianism"];
    this.currentWord = function() {
        var index = Math.floor(Math.random() * this.words.length);
        return this.words[index];
    };
};


var game = new Game();