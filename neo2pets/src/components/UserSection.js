import React, {Component} from "react";
import Page from "./UserSectionPage";
import Pet from "./layout/Pet";
import CustomNavbar from "./layout/Navbar";
import {Grid, Col, Row} from "react-bootstrap";

class UserSection extends Component {
  constructor(props) {
    super(props);

    this.onPetChange = this.onPetChange.bind(this);
    this.updatePet = this.updatePet.bind(this);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.state.loading) {
      this.setState({loading: true});
      this.updatePet();
    }
  }

  onPetChange() {
    this.updatePet();
  }

  updatePet() {
    fetch("/api/pet/get?userToken=" + this.props.token + "&petID=5a54e282fc430e1e6c1b3f84", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        if (res.status === "SUCCESS") {
          this.setState({
            pet: res.pet,
          });
        }
      });


  }

  render() {
    return (
      <div>
        <div>
          <CustomNavbar/>
        </div>
        <div>
          <div className="sidebar">
            <Pet token={this.props.token} pet={this.state.pet}/>
          </div>
          <div className="inline">
            <Page token={this.props.token} onPetChange={this.onPetChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSection;
