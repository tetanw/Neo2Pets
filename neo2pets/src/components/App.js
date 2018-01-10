import React, {Component} from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserSection from './UserSection';

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);

    let authStorage = localStorage.getItem("Neo2Pets_Auth");
    if (authStorage !== undefined && authStorage !== null) {
      if (authStorage.auth_key !== undefined) {
        this.state = {
          auth_key: authStorage.auth_key
        }
      }
    } else {
      this.state  = {};
    }
  }

  onLogin(auth_key, remember) {
    this.setState({
      auth_key: auth_key
    });

    if (remember) {
      if (localStorage) {
        localStorage.setItem("Neo2Pets_Auth", JSON.stringify({
          auth_key: auth_key
        }));
      }
    } else {
      if (localStorage) {
        localStorage.removeItem("Neo2Pets_Auth");
      }
    }
  }

  render() {
    return (
      <Switch>
        <Route path='/login' render={(props) => <Login onLogin={this.onLogin} {...props}/>}/>
        <Route path='/register' component={Register}/>
        <Route path="/" render={() => (
          this.state.auth_key === undefined ? (
            <Redirect to="/login"/>
          ) : (
            <UserSection/>
          )
        )}/>
      </Switch>
    )
  }
}

export default App;
