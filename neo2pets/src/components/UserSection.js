import React, { Component } from "react";
import Page from "./UserSectionPage";
import Pet from "./layout/Pet";
import CustomNavbar from "./layout/Navbar";
import { Grid, Col, Row } from "react-bootstrap";

class UserSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: {
        race: {
          id: "5a54e0a85621d32a00afcca7",
          name: "SUPERPICKACHU"
        },
        owner: "5a54c6a9d406a8270823c851",
        nickName: "PikaPika"
      }
    };
  }

  render() {
    return (
<<<<<<< HEAD
      <div className="main">
        <CustomNavbar />
        <div id="sidebar-wrapper">
          <Pet token={this.props.token} pet={this.state.pet} />
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <Page token={this.props.token} />
          </div>
=======
      <div>
        <div>
        <CustomNavbar/>
        </div>
        <div>
        <div className = "sidebar">
          <Pet token={this.props.token} pet={this.state.pet}/>
        </div>
        <div className = "inline">
          <Page token={this.props.token}/>
        </div>
>>>>>>> b353e3c7d0198db4f3f4d75d80bd97fa4d161e11
        </div>
      </div>
    );
  }
}

export default UserSection;
