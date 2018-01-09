import React, {Component} from 'react';
import Page from './Page';
import CustomNavbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div className="main" name="">
        <CustomNavbar/>
        <Page/>
      </div>
    )
  }
}

export default App;
