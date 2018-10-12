let React = require("react");

class WebUi extends React.Component {
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

module.exports = WebUi;