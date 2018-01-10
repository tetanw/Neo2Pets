import React, {Component} from 'react';
import Page from './UserSectionPage';
import CustomNavbar from "./layout/Navbar";


class UserSection extends Component {
  render() {
    return (
      <div className="main" name="">
        <CustomNavbar/>
        <Page/>
      </div>
    )
  }
}

export default UserSection;
