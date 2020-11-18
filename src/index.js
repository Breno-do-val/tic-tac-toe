import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={`square ${props.class}`} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            class: '',
            gameOver: false
        };
    }

    handleClick(i) {

        const squares = this.state.squares.slice();
        if(calculateWinner(squares)) {
            return;
        }
        else if(squares[i] && !calculateWinner(squares)) {
            this.setState({
                gameOver: true,
                class: 'game-over'
            })
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            gameOver: this.state.gameOver
        });
    }

    renderSquare(i) {
        return (
            <Square
            class={this.state.class} 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = `Winner: ${winner}`
        } else if (this.state.gameOver) {
            status = 'Game Over!';
        }
        else {
            status = `Next player: ${(this.state.xIsNext ? 'X': 'O')}`;
        }

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

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header__title">TIC-TAC-TOE GAME</div>
            </div>
        )
    }
}

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

const App = () => {
    return (
        <div>
            <Header />
            <Game />
        </div>
    )
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

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
