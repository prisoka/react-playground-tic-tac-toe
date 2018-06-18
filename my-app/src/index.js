import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Component: square. Renders a single <button>
// class Square extends React.Component {
//   render() {
//     const { value } = this.props
//
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {value}
//       </button>
//     );
//   }
// }

/*
React supports a simpler syntax called functional components for component
types like Square that only consist of a render method. Rather than define a
class extending React.Component, simply write a function that takes props and
returns what should be rendered. Replace the whole Square class with this:
*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Component: board. Renders 9 squares
class Board extends React.Component {
  /*
  Add a constructor to the Board and set its initial state to contain an
  array with 9 nulls, corresponding to the 9 squares.
  */
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     /*
  //     Let’s default the first move to be by ‘X’: modify our starting state in
  //     the Board constructor:
  //     */
  //     xIsNext: true,
  //   };
  // }

  /* Storing a History:
  Change Board so that it takes squares via props and has its own onClick prop
  specified by Game, like the transformation we made for Square earlier.
  Here is a list of steps you need to do:
  1. Delete the constructor in Board.
  2. Replace this.state.squares[i] with this.props.squares[i] in Board’s
  renderSquare.
  3. Replace this.handleClick(i) with this.props.onClick(i) in Board’s
  renderSquare. */

  handleClick(i) {
    /* Add handleClick to the Board class. We call .slice() to copy the squares
    array instead of mutating the existing array: "immutability".*/
    // const squares = this.state.squares.slice();

    /* Storing a History: Next, we need to move the handleClick method
    implementation from Board to Game. You can cut it from the Board class, and
    paste it into the Game class.*/
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    /* You can now change handleClick in Board to return early and ignore the
    click if someone has already won the game or if a square is already filled:
    */
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    /* Each time we move we shall toggle xIsNext by flipping the boolean value
    and saving the state. Now update Board’s handleClick function to flip the
    value of xIsNext:*/
    // squares[i] = 'X';
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      /* Storing a History: We also need to change it a little, since Game
      state is structured differently. Game’s handleClick can push a new entry
      onto the stack by concatenating the new history entry to make a new
      history array.*/
      // squares: squares,
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
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
          // value={this.state.squares[i]}
          // onClick={() => this.handleClick(i)}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    /* Now X and O take turns. Next, change the “status” text in Board’s render
    so that it also displays who is next:*/
    // const status = 'Next player: X';
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    /* Declaring a winner: replace the status declaration in Board’s render: */
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    /* Storing a History:
    Since Game is now rendering the status, we can delete
    <div className="status">{status}</div> and the code calculating the status
    from the Board’s render function: */
    return (
      <div>
        {/* <div className="status">{status}</div> */}
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

  /* Storing a History: set up the initial state for Game by adding a
  constructor: */
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  /* Storing a History:
  Game’s render should look at the most recent history entry and can take over
  calculating the game status:*/
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
         <div>{status}</div>
         <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

/* Declaring a winner: add this helper function to the end of the file: */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
