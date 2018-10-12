let chai = require("chai");
let expect = chai.expect;
let sinonChai = require("sinon-chai");
let React = require("react");
let dom = require("react-dom");
chai.use(sinonChai);

class ReactWrapper extends React.Component {
    render() {
        return <div>player one wins</div>
    }
}

describe('A player wins a game', function () {
    it('should shows player 1 wins when player 1 wins', function () {
        var div = document.createElement('div');
        document.body.appendChild(div);
        dom.render(<ReactWrapper />, div);
        expect(div.innerText).to.contain("player one wins");
    });
});
