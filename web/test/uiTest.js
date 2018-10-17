let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai");
let React = require("react");
let dom = require("react-dom");
chai.use(sinonChai);
let WebUi = require("../src/WebUi");

describe('A game is played', function() {
    var div;
    beforeEach(() => {
        div = document.createElement('div');
        document.body.appendChild(div);
    });
    afterEach(() => {
        div.remove();
    });
    describe('A player wins a game', function () {
        it('should shows player 1 wins when player 1 wins', function () {
            var game = {
                playRound: function (player1, player2, ui) {
                    ui.playerOneWins();
                }
            };
            dom.render(<WebUi game={game}/>, div);
            expect(div.innerText).to.contain("player one wins");
        });
        it('should show player 2 wins when player 2 wins', function () {
            let game = {
                playRound: function (player1, player2, ui) {
                    ui.playerTwoWins();
                }
            };
            dom.render(<WebUi game={game} />, div);
            expect(div.innerText).to.contain("player two wins");
        })
    });
    it('should show there was a tie', function () {
        let game = {
            playRound: function (player1, player2, ui) {
                ui.bothPlayersTied();
            }
        };
        dom.render(<WebUi game={game} />, div);
        expect(div.innerText).to.contain("there was a tie");
    })
    it('should indicate there was invalid input', function () {
        let game = {
            playRound: function (player1, player2, ui) {
                ui.tryAgain()
            }
        };
        dom.render(<WebUi game={game} />, div);
        expect(div.innerText).to.contain("invalid input, please try again");
    })
});

