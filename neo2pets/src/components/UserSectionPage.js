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
  render() {
    return (
      <PageContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Marketplace} />
          <Route path="/games" component={Games} />
          <Route path="/create-avatar" component={CreateAvatar} />
          <Route path="/avatar" component={Avatar} />
          <Route path="/inventory" component={Inventory} />
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
