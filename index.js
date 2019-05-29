var Game = require("./game");
var inquirer = require("inquirer");

var game = new Game();

var play = function(answer) {
    if (answer.play) {
        game.playGame();
    } else {
        console.log("\nBye Bye then!\n");
    }
}

var startGame = async function() {
    var answer = await inquirer.prompt([{
        type: "confirm",
        message: "Would you like to play a word guess game, based on popular movie titles?",
        default: true,
        name: "play"
    }]);
    return answer;
}

startGame().then(function(answer) {
    play(answer);
});