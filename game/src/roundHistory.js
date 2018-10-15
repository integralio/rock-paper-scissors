let RoundResult = require('./roundResult');

class RoundHistory {

    constructor() {
        this.roundResults = [];
    }


    addResult(player1, player2, result) {
        this.roundResults.push(new RoundResult(player1, player2, result));
    }

    getRoundResults() {
        return this.roundResults;
    }

    count() {
        return this.roundResults.length;
    }

}

module.exports = RoundHistory
