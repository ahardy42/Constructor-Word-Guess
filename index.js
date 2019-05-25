var inquirer = require("inquirer");
var axios = require("axios");
var Word = require("./word");

var url = "https://api.themoviedb.org/3/movie/popular?api_key=5e6f5259879b4cb3056ce178a213916e&language=en-US&page=1";

var Game = function() {
    // get the word list
    this.wordList = [];
    this.currWord = "";
    this.currentOverview = "";
    this.guessNum = 12;
    this.getList = async function() {
        response = await axios.get(url);
        if (response.error) {
            console.log(response.error);
        }
        else {
            var results = response.data.results;
            var array = [];
            results.forEach(function(result){
                var obj = {};
                obj.title = result.title;
                obj. overview = result.overview;
                array.push(obj);
            });
            this.wordList = array;
        }
    };
    this.currentWord = function() {
        var index = Math.floor(Math.random() * this.wordList.length);
        this.currWord = this.wordList[index].title;
        this.currentOverview = this.wordList[index].overview;
        console.log(this.currWord);
    };
    this.playGame = async function() {
        var isEnd = false;
        await this.getList();
        await this.currentWord();
        var word = new Word(this.currWord);
        word.makeWord();
        var questions = function() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Guess a Letter!?",
                    name: "guess"
                }
            ]).then(function(answers) {
                if (!isEnd) {
                    // check if guess is correct
                    word.guessCheck(answers.guess);
                    // see if the word has been guessed
                    isEnd = word.areAllLettersGuessed();
                    questions();
                } else {
                    console.log("you won!");
                    return;
                }
            });
        };
        questions(); 
    }
};


var game = new Game();

game.playGame();
