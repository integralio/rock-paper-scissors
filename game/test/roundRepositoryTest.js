let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai")
chai.use(sinonChai)
let sinon = require("sinon")
let Game = require("../src/game");
let RoundResult = require("../src/roundResult");
let RoundHistory = require("../src/roundHistory");

let contract = function(namedRepo) {
    let repository;

    describe("A roundRepository", function () {
        beforeEach(function () {
            repository = new namedRepo();
        });

        describe('the count of the repository', function () {
            it("should return a count of 0 when no rounds have been played", function() {
                expect(repository.count()).to.be.equal(0);
            });

            it("should return a positive count when rounds have been played", function () {
                repository.addResult("rock", "scissors", "playerOneWins");
                expect(repository.count()).to.be.equal(1);

                repository.addResult("rock", "paper", "playerTwoWins");
                expect(repository.count()).to.be.equal(2);
            });
        });

        describe("getting the round results", function () {
            it("should return an empty array of results when no rounds have been played", function () {
                expect(repository.getRoundResults()).to.be.empty;
            });

            it("should return an array of results when rounds have been played", function () {
                let testResults = function(player1, player2, outcome, position) {
                    repository.addResult(player1, player2, outcome);
                    let result = repository.getRoundResults()[position];
                    expect(result).to.have.property("player1", player1);
                    expect(result).to.have.property("player2", player2);
                    expect(result).to.have.property("result", outcome);
                };
                testResults("scissors", "paper", "playerOneWins", 0);
                testResults("rock", "paper", "playerTwoWins", 1);
            });
        });
    });
};

describe("Array Repository", function() {
    contract(RoundHistory);
});
