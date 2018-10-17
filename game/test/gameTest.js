let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai")
chai.use(sinonChai)
let sinon = require("sinon")
let Game = require("../src/game");
let RoundResult = require("../src/roundResult");
let RoundHistory = require("../src/arrayRoundRepository");

describe('Playing a round', function () {

    let roundHistory;
    let game;
    let ui;

    beforeEach(() => {
        roundHistory = new RoundHistory();
        game = new Game(roundHistory);
        ui = {
            "playerOneWins": sinon.spy(),
            "playerTwoWins": sinon.spy(),
            "tryAgain": sinon.spy(),
            "bothPlayersTied": sinon.spy()
        }
    });

    describe('Rock vs scissors', function () {
        it("results in player 1 wins when player1 plays rock and player 2 plays scissors", () => {
            game.playRound("rock", "scissors", ui)
            expect(ui.playerOneWins).to.be.called
        });
        it("results in player 2 wins when player2 plays rock and player1 plays scissors", function () {
            game.playRound("scissors", "rock", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 2 wins when player2 plays Rock and player1 plays scissors", function () {
            game.playRound("scissors", "Rock", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 1 wins when player1 plays Rock and player2 plays scissors", function () {
            game.playRound("Rock", "scissors", ui);
            expect(ui.playerOneWins).to.be.called
        });
    });
    describe("Rock vs Paper", function() {
        it("results in player 2 wins when player2 plays paper and player 1 plays rock", function () {
            game.playRound("rock", "paper", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 1 wins when player1 plays paper and player 2 plays rock", function () {
            game.playRound("paper", "rock", ui);
            expect(ui.playerOneWins).to.be.called
        })
    })
    describe("Paper vs scissors", function () {
        it('results in player1 wins when player1 plays scissors and player2 plays paper', function () {
            game.playRound("scissors", "paper", ui);
            expect(ui.playerOneWins).to.be.called
        });
        it('results in player2 wins when player1 plays paper and player2 plays scissors', function () {
            game.playRound("paper", "scissors", ui);
            expect(ui.playerTwoWins).to.be.called
        });
    })

    describe("invalid input", function () {
        describe('passing invalid shapes', function () {
            it('Returns an error result when player1 provides invalid string', function () {
                game.playRound("spaceShip", "paper", ui);
                expect(ui.tryAgain).to.be.called;
            })
            it('Returns an error result when player2 provides invalid string', function () {
                game.playRound("paper", "spaceShip", ui);
                expect(ui.tryAgain).to.be.called;
            })
            it('should return an error when both players provide an invalid string', function () {
                game.playRound("cat", "mouse", ui)
                expect(ui.tryAgain).to.be.called
            });
        });
    });

    describe("a tie", function () {
        it("should result in a tie when both players playRound the same shape", function () {
            game.playRound("rock", "rock", ui)
            expect(ui.bothPlayersTied).to.be.called
        })
    })
});

describe("retrieving game round history", function () {

    let roundHistory;
    let game;
    let gameUi;
    let historyUi;

    beforeEach(() => {
        roundHistory = new RoundHistory();
        game = new Game(roundHistory);
        gameUi = {
            "playerOneWins": sinon.spy(),
            "playerTwoWins": sinon.spy(),
            "tryAgain": sinon.spy(),
            "bothPlayersTied": sinon.spy()
        };
        historyUi = {
            "onRetrievedRoundHistory": sinon.spy(),
            "onEmptyRoundHistory": sinon.spy()
        }
    });

    it("should display no history if no rounds have been played", function () {
        game.notifyRoundHistory(historyUi);
        expect(historyUi.onEmptyRoundHistory).to.be.called;
    });

    it("should display a result for one round played", function () {
        game.playRound("rock", "scissors", gameUi);
        game.notifyRoundHistory(historyUi);
        gameResult = new RoundResult("rock", "scissors", "playerOneWins");
        expect(historyUi.onRetrievedRoundHistory).to.be.calledOnceWith([gameResult]);
    });

    it("should display results for multiple rounds played", function () {
        game.playRound("rock", "scissors", gameUi);
        game.playRound("scissors", "rock", gameUi);
        game.notifyRoundHistory(historyUi);
        firstResult = new RoundResult("rock", "scissors", "playerOneWins");
        secondResult = new RoundResult("scissors", "rock", "playerTwoWins");
        expect(historyUi.onRetrievedRoundHistory).to.be.calledOnceWith([firstResult, secondResult]);
    });

    it("should not display a round history entry for one invalid input", function () {
        game.playRound("rock", "elephant", gameUi);
        game.notifyRoundHistory(historyUi);
        result = new RoundResult("rock", "elephant", "tryAgain");
        expect(historyUi.onRetrievedRoundHistory).to.be.calledWith([result]);
    });

});
