class Game {

    constructor() {
        this.gameshapes = ["rock", "paper", "scissors"];
    }

    play(player1, player2, ui) {
        if (this.isInvalidShape(player2) || this.isInvalidShape(player1)) {
            ui.tryAgain();
            return;
        }

        if(player1 === player2) {
            ui.bothPlayersTied()
        } else if (this.playerTwoWins(player1.toLowerCase(), player2.toLowerCase())) {
            ui.playerTwoWins()
        } else {
            ui.playerOneWins()
        }
    }

    playerTwoWins(player1, player2) {
        return player1 === "scissors" && player2 === "rock" ||
            player1 === "rock" && player2 === "paper" ||
            player1 === "paper" && player2 === "scissors";
    }

    isInvalidShape(shape) {
        return !this.gameshapes.includes(shape.toLowerCase());
    }

}

module.exports = Game;
