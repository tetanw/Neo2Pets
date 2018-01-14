import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Games extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
        <h1>Games</h1>

        <h2>Choose games</h2>

        <h2><Link to='/games/snake'>Snake</Link></h2>      

      </div>
    )
  }
}


export default Games