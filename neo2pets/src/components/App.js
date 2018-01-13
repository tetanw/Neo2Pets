import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserSection from "./UserSection";

class App extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.checkAuth = this.checkAuth.bind(this);

    console.log("Initiating the application");
    this.state = {
      checking: false,
      checked: false
    };
  }

  componentDidMount() {
    if (!this.state.checking && !this.state.checked) {
      this.setState({ checking: true });
      this.checkAuth();
    }
  }

  async checkAuth() {
    let auth_key = this.state.auth_key;
    if (auth_key === undefined) {
      let authStorage = JSON.parse(localStorage.getItem("Neo2Pets_Auth"));
      if (authStorage !== undefined && authStorage !== null) {
        if (authStorage.auth_key !== undefined) {
          auth_key = authStorage.auth_key;
        }
      }
      if (auth_key !== undefined) {
        await fetch("/api/auth/validate?userToken=" + auth_key, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            console.log("Checking the authentication");
            if (res.status === "SUCCESS") {
              this.setState({
                auth_key: auth_key
              });
            }
          });
      }
    }

    this.setState({
      checking: false,
      checked: true
    });
    console.log("Finished checking the authentication.");
  }

  onLogin(auth_key, remember) {
    this.setState({
      auth_key: auth_key
    });

    if (remember) {
      if (localStorage) {
        localStorage.setItem(
          "Neo2Pets_Auth",
          JSON.stringify({
            auth_key: auth_key
          })
        );
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
        <Route
          path="/login"
          render={props => <Login onLogin={this.onLogin} {...props} />}
        />
        <Route
          path="/register"
          render={props => <Register onLogin={this.onLogin} {...props} />}
        />
        <Route
          path="/"
          render={() =>
            this.state.auth_key === undefined && this.state.checked ? (
              <Redirect to="/login" />
            ) : (
              <UserSection token={this.state.auth_key} />
            )
          }
        />
      </Switch>
    );
  }
}

export default App;
