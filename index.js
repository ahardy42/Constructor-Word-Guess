var Game = require("./game");
var inquirer = require("inquirer");

var game = new Game();

var startGame = async function() {
    var answer = await inquirer.prompt([{
        type: "confirm",
        message: "Would you like to play a word guess game, based on popular movie titles?",
        default: true,
        name: "play"
    }]);
    if (answer.play) {
        game.playGame();
        console.log("farts");
    } else {
        console.log("\nBye Bye then!\n");
    }
}

startGame();