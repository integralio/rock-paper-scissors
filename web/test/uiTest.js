let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai");
let React = require("react");
let dom = require("react-dom");
chai.use(sinonChai);

class ReactWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {result: ''};
    }

    componentDidMount() {
        this.props.game.play(null, null, this);
    }

    render() {
        return <div>{this.state.result}</div>
    }

    playerOneWins() {
        this.setState({result: 'player one wins'})
    }

    playerTwoWins() {
        this.setState({result: 'player two wins'})
    }

    bothPlayersTied() {
        this.setState({result: 'there was a tie'})
    }

    tryAgain() {
        this.setState({result: 'invalid input, please try again'});
    }
}

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
                play: function (player1, player2, ui) {
                    ui.playerOneWins();
                }
            };
            dom.render(<ReactWrapper game={game}/>, div);
            expect(div.innerText).to.contain("player one wins");
        });
        it('should show player 2 wins when player 2 wins', function () {
            let game = {
                play: function (player1, player2, ui) {
                    ui.playerTwoWins();
                }
            };
            dom.render(<ReactWrapper game={game} />, div);
            expect(div.innerText).to.contain("player two wins");
        })
    });
    it('should show there was a tie', function () {
        let game = {
            play: function (player1, player2, ui) {
                ui.bothPlayersTied();
            }
        };
        dom.render(<ReactWrapper game={game} />, div);
        expect(div.innerText).to.contain("there was a tie");
    })
    it('should indicate there was invalid input', function () {
        let game = {
            play: function (player1, player2, ui) {
                ui.tryAgain()
            }
        };
        dom.render(<ReactWrapper game={game} />, div);
        expect(div.innerText).to.contain("invalid input, please try again");
    })
});

