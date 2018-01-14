import React from 'react'
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Gamechoice = () => (
  <div>
    <h1>Choose your game</h1>
    <nav>
        <ul>
        <li><h1><Link to='games/snake'>Snake</Link></h1></li>
        <li><h1><Link to='games/minesweeper'>Minesweeper</Link></h1></li>
        </ul>
    </nav>

  </div>
)

export default Gamechoice