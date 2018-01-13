import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PageContainer from "./layout/PageContainer";
import Home from "./pages/user_section/Home";
import Marketplace from "./pages/user_section/Shop";
import Games from "./pages/user_section/Games";
import CreateAvatar from "./pages/CreateAvatar";
import Inventory from "./pages/user_section/Inventory";
import Avatar from "./pages/user_section/Avatar";
import "../index.css";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

class Page extends Component {
  withToken(Component, token) {
    return props => <Component {...props} token={token} />;
  }

  render() {
    return (
      <PageContainer>
        <Switch>
          <Route
            exact
            path="/"
            component={this.withToken(Home, this.props.token)}
          />

          <Route
            path="/shop"
            component={this.withToken(Marketplace, this.props.token)}
          />

          <Route
            path="/games"
            component={this.withToken(Games, this.props.token)}
          />

          <Route
            path="/create-avatar"
            component={this.withToken(CreateAvatar, this.props.token)}
          />

          <Route
            path="/avatar"
            component={this.withToken(Avatar, this.props.token)}
          />

          <Route
            path="/inventory"
            component={this.withToken(Inventory, this.props.token)}
          />
        </Switch>
      </PageContainer>
    );
  }
}

function withLoginToken(Component, userToken) {
  return props => {
    return <Component {...props} userToken={userToken} />;
  };
}

export default Page;
