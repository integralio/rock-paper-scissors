class Game {

    constructor(roundHistory) {
        this.roundHistory = roundHistory;
        this.gameshapes = ["rock", "paper", "scissors"];
    }

    playRound(player1, player2, gameDelegate) {
        let result;

        if (this.isInvalidShape(player2) || this.isInvalidShape(player1)) {
            result = "tryAgain";
        } else if(player1 === player2) {
            result = "bothPlayersTied";
        } else if (this.playerTwoWins(player1.toLowerCase(), player2.toLowerCase())) {
            result = "playerTwoWins"
        } else {
            result = "playerOneWins"
        }

        this.makeResult(player1, player2, gameDelegate, result);
    }

    makeResult(player1, player2, ui, result) {
        ui[result]();
        this.roundHistory.addResult(player1, player2, result);
    }

    playerTwoWins(player1, player2) {
        return player1 === "scissors" && player2 === "rock" ||
            player1 === "rock" && player2 === "paper" ||
            player1 === "paper" && player2 === "scissors";
    }

    isInvalidShape(shape) {
        return !this.gameshapes.includes(shape.toLowerCase());
    }

    notifyRoundHistory(historyDelegate) {
        if (this.roundHistory.count() === 0) {
            historyDelegate.onEmptyRoundHistory();
        } else {
            historyDelegate.onRetrievedRoundHistory(this.roundHistory.getRoundResults());
        }
    }

}

module.exports = Game;
