import React, {Component} from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import Gamechoice from './GamesFolder/Gamechoice';
import Snake from './GamesFolder/Snake';
import Minesweeper from './GamesFolder/Minesweeper';

class Games extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
        <h1>Games</h1>

        <Switch>
           <Route
            exact path="/games/" component={Gamechoice}
          />

          <Route
            path="/games/snake" component={Snake}
          />
          <Route
            path="/games/minesweeper" component={Minesweeper}
          />
        </Switch>

      </div>
    )
  }
}


export default Games