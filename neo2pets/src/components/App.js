import React, {Component} from 'react';
import Page from './Page';
import CustomNavbar from "./Navbar";
import Header from "./_Header_unused";

class App extends Component {
  render() {
    return (
      <div className="main" name="">
        {/* <Header/> */}
        <CustomNavbar/>
        <Page/>
      </div>
    )
  }
}

export default App;
