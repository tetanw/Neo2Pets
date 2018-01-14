import React, {Component} from 'react';
import { Link } from "react-router-dom";

var BODY = 1, FOOD = 2;
var KEYS = {left: 37, up: 38, right: 39, down: 40};
var DIRS = {37: true, 38: true, 39: true, 40: true};

class Snake extends Component {
  render() {

    return (
      <div className="jumbotron jumbotron-style">
        <h2>Snake</h2>

        {/* <div class="snake-game">
        <h1 class="snake-score">Length: {this.state.snake.length}</h1>
        <div
          ref="board"
          class={'snake-board' + (this.state.gameOver ? ' game-over' : '')}
          tabIndex={0}
          onBlur={this._pause}
          onFocus={this._resume}
          onKeyDown={this._handleKey}
          style={{width: numCols * cellSize, height: numRows * cellSize}}>
          {cells}
        </div>
        <div class="snake-controls">
          {this.state.paused ? <button onClick={this._resume}>Resume</button> : null}
          {this.state.gameOver ? <button onClick={this._reset}>New Game</button> : null}
        </div>
       </div> */}
        
        <h3><Link to='/games'>Back to games</Link></h3> 
      </div>
    )
  }

}


export default Snake