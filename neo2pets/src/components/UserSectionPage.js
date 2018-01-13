import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PageContainer from "./layout/PageContainer";
import ShopList from "./pages/user_section/ShopList";
import Games from "./pages/user_section/Games";
import CreateAvatar from "./pages/CreateAvatar";
import Inventory from "./pages/user_section/Inventory/Inventory";
import "../index.css";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

class Page extends Component {
  render() {
    return (
      <PageContainer>
        <Switch>
          <Route
            path="/inventory"
            component={withLoginToken(Inventory, this.props.token)}
          />

          <Route
            path="/marketplace"
            component={withLoginToken(ShopList, this.props.token)}
          />

          <Route
            path="/games"
            component={withLoginToken(Games, this.props.token)}
          />

          <Route
            path="/create-avatar"
            component={withLoginToken(CreateAvatar, this.props.token)}
          />

        </Switch>
      </PageContainer>
    );
  }
}

function withLoginToken(Component, token) {
  return props => {
    return <Component {...props} token={token} />;
  };
}

export default Page;
