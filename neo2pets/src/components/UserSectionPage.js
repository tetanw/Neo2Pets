import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PageContainer from "./layout/PageContainer";
import ShopList from "./pages/user_section/Shops/ShopList";
import Shop from "./pages/user_section/Shops/Shop";
import Games from "./pages/user_section/Games";
import Snake from "./pages/user_section/GamesFolder/Snake/Snake"
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
    const {token, onPetChange, onMoneyChange} = this.props;

    return (
      <PageContainer>
        <Switch>
          <Route
            exact path="/"
            render={withProps(Inventory, token, onPetChange, onMoneyChange)}
          />

          <Route
            path="/inventory"
            render={withProps(Inventory, token, onPetChange, onMoneyChange)}
          />

          <Route
            exact path="/marketplace"
            render={withProps(ShopList, token, onPetChange, onMoneyChange)}
          />

          <Route
            path="/marketplace/:shopID"
            render={withProps(Shop, token, onPetChange, onMoneyChange)}
          />

          <Route
            exact path="/games"
            render={withProps(Games, token, onPetChange, onMoneyChange)}
          />

          <Route
            path="/games/snake"
            render={withProps(Snake, token, onPetChange, onMoneyChange)}
          />

          <Route
            path="/create-avatar"
            render={withProps(CreateAvatar, token, onPetChange, onMoneyChange)}
          />

        </Switch>
      </PageContainer>
    );
  }
}

function withProps(Component, token, onPetChange, onMoneyChange) {
  return props => {
    return <Component {...props} token={token} onPetChange={onPetChange} onMoneyChange={onMoneyChange} />;
  };
}

export default Page;
