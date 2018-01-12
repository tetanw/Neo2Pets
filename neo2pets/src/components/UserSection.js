import React, {Component} from 'react';
import Page from './UserSectionPage';
import Pet from './layout/Pet';
import CustomNavbar from "./layout/Navbar";


class UserSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        race: {
          id: "5a54e0a85621d32a00afcca7",
          "name": "SUPERPICKACHU"
        },
        owner: "5a54c6a9d406a8270823c851",
        nickName: "PikaPika"
      }
    }
  }

  render() {
    return (
      <div className="main">
        <CustomNavbar/>
        <Pet token={this.props.token} pet={this.state.pet}/>
        <Page token={this.props.token}/>

      </div>
    )
  }
}

export default UserSection;
