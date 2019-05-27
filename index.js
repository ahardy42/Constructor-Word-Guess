var inquirer = require("inquirer");
var axios = require("axios");
var Word = require("./word");

var url = "https://api.themoviedb.org/3/movie/popular?api_key=5e6f5259879b4cb3056ce178a213916e&language=en-US&page=1";

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
        await this.getList(); // this relies on a promise, so wait for it.
        this.currentWord();
        var word = new Word(this.currWord);
        word.makeWord();
        var title = this.currWord;
        var overview = this.currentOverview;
        var numGuesses = 12;
        var questions = function () {
            if (!isEnd && numGuesses > 0) {
                word.displayWord();
                console.log(`\nYou have ${numGuesses} remaining...`);
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Guess a Letter!?",
                        name: "guess"
                    }
                ]).then(function (answers) {
                    // check if guess is correct
                    var isCorrectGuess = word.guessCheck(answers.guess);
                    console.log(isCorrectGuess);
                    if (!isCorrectGuess) {numGuesses--}
                    // see if the word has been guessed
                    isEnd = word.areAllLettersGuessed();
                    questions();
                });
            } else if (numGuesses === 0) {
                word.displayWord();
                console.log(`\nThe Movie title is: ${title}, but you are out of guesses! so...\n\n\nYou Lose!`)
            }else {
                word.displayWord();
                console.log(`You won! Below you will find a plot summary of the movie ${title}`);
                console.log(`\nPlot Summary: ${overview}\n`);
                return;
            };
        }
        questions();
    }
};


var game = new Game();

game.playGame();
