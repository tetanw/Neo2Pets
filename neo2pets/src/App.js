import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './scenes/home/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/' component={() => (<Redirect to='/home' />)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
