import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PageContainer from './PageContainer';
import Home from './Home';
import Marketplace from './Shop';
import Games from './Games';
import CreateAvatar from './CreateAvatar';
import Inventory from './Inventory';
import Avatar from './Avatar';

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
          <Route exact path='/' component={Home}/>
          <Route path='/shop' component={Marketplace}/>
          <Route path='/games' component={Games}/>
          <Route path='/create' component={CreateAvatar}/>
          <Route path='/avatar' component={Avatar}/>
          <Route path='/inventory' component={Inventory}/>
        </Switch>
      </PageContainer>
    )
  }
}

export default Page;
