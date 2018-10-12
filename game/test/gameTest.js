let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai")
chai.use(sinonChai)
let sinon = require("sinon")
let Game = require("../src/game");

describe('Playing a round', function () {

    let game;
    let ui;

    beforeEach(() => {
        game = new Game()
        ui = {
            "playerOneWins": sinon.spy(),
            "playerTwoWins": sinon.spy(),
            "tryAgain": sinon.spy(),
            "bothPlayersTied": sinon.spy()
        }
    });

    describe('Rock vs scissors', function () {
        it("results in player 1 wins when player1 plays rock and player 2 plays scissors", () => {
            game.play("rock", "scissors", ui)
            expect(ui.playerOneWins).to.be.called
        });
        it("results in player 2 wins when player2 plays rock and player1 plays scissors", function () {
            game.play("scissors", "rock", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 2 wins when player2 plays Rock and player1 plays scissors", function () {
            game.play("scissors", "Rock", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 1 wins when player1 plays Rock and player2 plays scissors", function () {
            game.play("Rock", "scissors", ui);
            expect(ui.playerOneWins).to.be.called
        });
    });
    describe("Rock vs Paper", function() {
        it("results in player 2 wins when player2 plays paper and player 1 plays rock", function () {
            game.play("rock", "paper", ui);
            expect(ui.playerTwoWins).to.be.called
        });
        it("results in player 1 wins when player1 plays paper and player 2 plays rock", function () {
            game.play("paper", "rock", ui);
            expect(ui.playerOneWins).to.be.called
        })
    })
    describe("Paper vs scissors", function () {
        it('results in player1 wins when player1 plays scissors and player2 plays paper', function () {
            game.play("scissors", "paper", ui);
            expect(ui.playerOneWins).to.be.called
        });
        it('results in player2 wins when player1 plays paper and player2 plays scissors', function () {
            game.play("paper", "scissors", ui);
            expect(ui.playerTwoWins).to.be.called
        });
    })

    describe("invalid input", function () {
        describe('passing invalid shapes', function () {
            it('Returns an error result when player1 provides invalid string', function () {
                game.play("spaceShip", "paper", ui);
                expect(ui.tryAgain).to.be.called;
            })
            it('Returns an error result when player2 provides invalid string', function () {
                game.play("paper", "spaceShip", ui);
                expect(ui.tryAgain).to.be.called;
            })
            it('should return an error when both players provide an invalid string', function () {
                game.play("cat", "mouse", ui)
                expect(ui.tryAgain).to.be.called
            });
        });
    });

    describe("a tie", function () {
        it("should result in a tie when both players play the same shape", function () {
            game.play("rock", "rock", ui)
            expect(ui.bothPlayersTied).to.be.called
        })
    })
});