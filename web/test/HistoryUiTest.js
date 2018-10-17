let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai");
let React = require("react");
let dom = require("react-dom");
chai.use(sinonChai);
let HisteryUi = require("../src/HistoryUI");
let RoundResult = require("../../game/src/roundResult");

describe('The game round history is requested', function () {

    var div;
    beforeEach(() => {
        div = document.createElement('div');
        document.body.appendChild(div);
    });
    afterEach(() => {
        div.remove();
    });
    it(" has no history", function () {
        var game = {
            notifyRoundHistory: function (historyObserver) {
                 historyObserver.onEmptyRoundHistory();
            }
        };
        dom.render(<HisteryUi game={game}/>, div);
        expect(div.innerText).to.contain("No History Yet");
    });

    it("has some history", function () {
        let result1 = new RoundResult("rock", "scissors", "playerOneWins");
        let result2 = new RoundResult("rock", "paper", "playerTwoWins");
        let results = [
            result1,
            result2,
        ];
        let testResults = function (result, position) {
            element = document.getElementById(`history-${position}`);
            expect(element.innerText).to.contain(result.player1);
            expect(element.innerText).to.contain(result.player2);
            expect(element.innerText).to.contain(result.result);
        };

        var game = {
            notifyRoundHistory: function(historyObserver) {
                historyObserver.onRetrievedRoundHistory(results);
            }
        };
        dom.render(<HisteryUi game={game}/>, div);
        testResults(result1, 0);
        testResults(result2, 1);
    });
});
