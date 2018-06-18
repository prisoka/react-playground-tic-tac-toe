import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Component: square. Renders a single <button>
class Square extends React.Component {
  render() {
    const { value } = this.props

    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {value}
      </button>
    );
  }
}

// Component: board. Renders 9 squares
class Board extends React.Component {
  /*
  Add a constructor to the Board and set its initial state to contain an
  array with 9 nulls, corresponding to the 9 squares.
  */
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  /*Add handleClick to the Board class.*/
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  
  /*
  a. Modify renderSquare method to pass a value prop to Square.
  b. Pass down a function from Board to Square that gets called when the
  square is clicked
  c. We split the returned element into multiple lines for readability, and
  added parentheses around it so that JavaScript doesn’t insert a semicolon
  after return and break our code.
  */
  renderSquare(i) {
    return (
      <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Component: game. Renders a board with some placeholders
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
