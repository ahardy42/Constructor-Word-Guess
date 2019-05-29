// this allows the program to use the .env file to get key for tmdb
require("dotenv").config();
// importing the dependant modules
var inquirer = require("inquirer");
var axios = require("axios");
var Word = require("./word");
var key = require("./key");

var tmdbKey = key.tmdbKey.key;

var url = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=1`;

var Game = function () {
    // get the word list
    this.wordList = [];
    this.currWord = "";
    this.currentOverview = "";
    this.getList = async function () {
        response = await axios.get(url);
        if (response.error) {
            console.log(response.error);
        }
        else {
            var results = response.data.results;
            var array = [];
            results.forEach(function (result) {
                var obj = {};
                obj.title = result.title;
                obj.overview = result.overview;
                array.push(obj);
            });
            this.wordList = array;
        }
    };
    this.currentWord = function () {
        var index = Math.floor(Math.random() * this.wordList.length);
        if (this.wordList[index].title.length < 20) {
            this.currWord = this.wordList[index].title;
            this.currentOverview = this.wordList[index].overview;
            
        } else {
            this.currentWord();
        }
    };
    this.playGame = async function () {
        var isEnd = false;
        if (this.wordList.length === 0) {
            console.log("\n... Grabbing Popular Movies For The Week from www.themoviedb.org/  ...\n\n\n");
            await this.getList();
        } 
        this.currentWord();
        var word = new Word(this.currWord);
        word.makeWord();
        var title = this.currWord;
        var overview = this.currentOverview;
        var numGuesses = 12;
        var questions = async function () { // async recursion 
            if (!isEnd && numGuesses > 0) { // this is end check for recursion
                word.displayWord();
                if (numGuesses > 1) {
                    console.log(`\nYou have ${numGuesses} guesses remaining...`);
                } else {
                    console.log(`\nYou have ${numGuesses} guess remaining...`);
                }
                var answers = await inquirer.prompt([
                    {
                        type: "input",
                        message: "Guess a Letter!",
                        name: "guess"
                    }
                ]);
                var isCorrectGuess = await word.guessCheck(answers.guess);
                if (!isCorrectGuess) { numGuesses-- }
                // see if the word has been guessed
                isEnd = await word.areAllLettersGuessed();
                await questions();
            } else if (numGuesses === 0) {
                word.wordArray.forEach(function(lett) {
                    lett.isGuessed = true;
                });
                word.displayWord();
                console.log("\nYou are out of guesses... You Lose!\n");
            } else {
                word.displayWord();
                console.log(`You won! Below you will find a plot summary of the movie ${title}`);
                console.log(`\nPlot Summary: ${overview}\n`);
            };
        }
        questions();
    }
};

module.exports = Game;