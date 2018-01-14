import React, {Component} from 'react';
import {Link} from "react-router-dom";


var BODY = 1, FOOD = 2;
var KEYS = {left: 37, up: 38, right: 39, down: 40};
var DIRS = {37: true, 38: true, 39: true, 40: true};

class Snake extends Component {
  constructor(props) {
    super(props);
    this._reset = this._reset.bind(this);
    this._pause = this._pause.bind(this);
    this._resume = this._resume.bind(this);
    this._tick = this._tick.bind(this);
    this._handleKey = this._handleKey.bind(this);

    this.state = this.getInitState();

  }

  getInitState() {
    let start = this.props.startIndex || 21;
    let snake = [start], board = [];
    board[start] = BODY;
    return {
      snake: snake,
      board: board,
      growth: 0,
      paused: true,
      gameOver: false,
      direction: KEYS.right
    };
  }

  componentDidMount() {
    this._resume();
  };

  _reset() {
    this.setState(this.getInitState());
    this._resume();
  };

  _pause() {
    if (this.state.gameOver || this.state.paused) {
      return;
    }
    console.log("pause");
    this.setState({paused: true});
  };

  _resume() {
    if (this.state.gameOver || !this.state.paused) {
      return;
    }
    console.log("resume");
    this.setState({paused: false}, this._tick);
    this.refs.board.focus();
    //this._tick();
  };

  _tick() {
    console.log(this.state);
    if (this.state.paused) {
      return;
    }
    console.log("tick");
    var snake = this.state.snake;
    var board = this.state.board;
    var growth = this.state.growth;
    var direction = this.state.direction;

    var numRows = this.props.numRows || 20;
    var numCols = this.props.numCols || 20;
    var head = this.getNextIndex(snake[0], direction, numRows, numCols);

    if (snake.indexOf(head) != -1) {
      this.setState({gameOver: true});
      return;
    }

    var needsFood = board[head] == FOOD || snake.length == 1;
    if (needsFood) {
      var ii, numCells = numRows * numCols;
      do {
        ii = Math.floor(Math.random() * numCells);
      } while (board[ii]);
      board[ii] = FOOD;
      growth += 2;
    } else if (growth) {
      growth -= 1;
    } else {
      board[snake.pop()] = null;
    }

    snake.unshift(head);
    board[head] = BODY;

    if (this._nextDirection) {
      direction = this._nextDirection;
      this._nextDirection = null;
    }

    this.setState({
      snake: snake,
      board: board,
      growth: growth,
      direction: direction
    });

    setTimeout(this._tick, 100);
  };

  _handleKey(event) {
    var direction = event.nativeEvent.keyCode;
    // var direction = event.nativeEvent.keyCode;
    var difference = Math.abs(this.state.direction - direction);
    // if key is invalid, or the same, or in the opposite direction, ignore it
    if (DIRS[direction] && difference !== 0 && difference !== 2) {
      this._nextDirection = direction;
    }
  };


  render() {
    var cells = [];
    var numRows = this.props.numRows || 20;
    var numCols = this.props.numCols || 20;
    var cellSize = this.props.cellSize || 30;

    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var code = this.state.board[numCols * row + col];
        var type = code == BODY ? 'body' : code == FOOD ? 'food' : 'null';
        cells.push(<div key={row + "," + col} className={type + '-cell'}/>);
      }
    }

    return (
      <div className="jumbotron jumbotron-style">
        <div className="snake-game">
          <h1 className="snake-score">Length: {this.state.snake.length}</h1>
          <div
            ref="board"
            className={'snake-board' + (this.state.gameOver ? ' game-over' : '')}
            tabIndex={0}
            onBlur={this._pause}
            //onFocus={this._resume}
            onKeyDown={this._handleKey}
            style={{width: numCols * cellSize, height: numRows * cellSize}}>
            {cells}
          </div>
          <div className="snake-controls">
            {this.state.paused ? <button onClick={this._resume}>Resume</button> : null}
            {this.state.gameOver ? <button onClick={this._reset}>New Game</button> : null}
          </div>
        </div>

        <h3><Link to='/games'>Back to games</Link></h3>
      </div>
    )


  };

  getNextIndex(head, direction, numRows, numCols) {
    // translate index into x/y coords to make math easier
    var x = head % numCols;
    var y = Math.floor(head / numCols);

    // move forward one step in the correct direction, wrapping if needed
    switch (direction) {
      case KEYS.up:
        y = y <= 0 ? numRows - 1 : y - 1;
        break;
      case KEYS.down:
        y = y >= numRows - 1 ? 0 : y + 1;
        break;
      case KEYS.left:
        x = x <= 0 ? numCols - 1 : x - 1;
        break;
      case KEYS.right:
        x = x >= numCols - 1 ? 0 : x + 1;
        break;
      default:
        return;
    }

    // translate new x/y coords back into array index
    return (numCols * y) + x;
  };


}

export default Snake