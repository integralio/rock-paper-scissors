let RoundResult = require("./roundResult");

class Game {

    constructor() {
        this.roundResults = [];
        this.gameshapes = ["rock", "paper", "scissors"];
    }

    playRound(player1, player2, ui) {
        if (this.isInvalidShape(player2) || this.isInvalidShape(player1)) {
            ui.tryAgain();
            return;
        }

        let result;
        if(player1 === player2) {
            ui.bothPlayersTied()
            result = "bothPlayersTied"
        } else if (this.playerTwoWins(player1.toLowerCase(), player2.toLowerCase())) {
            ui.playerTwoWins()
            result = "playerTwoWins"
        } else {
            ui.playerOneWins()
            result = "playerOneWins"
        }

        this.roundResults.push(new RoundResult(player1, player2, result));
    }

    playerTwoWins(player1, player2) {
        return player1 === "scissors" && player2 === "rock" ||
            player1 === "rock" && player2 === "paper" ||
            player1 === "paper" && player2 === "scissors";
    }

    isInvalidShape(shape) {
        return !this.gameshapes.includes(shape.toLowerCase());
    }

    displayRoundHistory(ui) {
        ui.displayRoundHistory(this.roundResults);
    }

}

module.exports = Game;
