let React = require("react");
let dom = require("react-dom");

class HistoryUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {history: ''}
    }

    componentDidMount() {
        this.props.game.notifyRoundHistory(this);
    }

    render() {
        return <div>{this.state.history}</div>
    }

    onEmptyRoundHistory() {
        this.setState({history: "No History Yet"});
    }

    onRetrievedRoundHistory(history) {
        const listItems = history.map((result, index) => {
            let entry = `history-${index.toString()}`;
            return <tr key={entry.toString()} id={entry.toString()}>
                <td>${result.player1}</td>
                <td>${result.player2}</td>
                <td>${result.result}</td>
            </tr>
        });
        this.setState({history: <table><tbody>{listItems}</tbody></table>});
    }

}

module.exports = HistoryUi;
