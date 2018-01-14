import React, {Component, Fragment} from "react";
import {Redirect, Route, Switch} from "react-router";
import Page from "./UserSectionPage";
import Pet from "./layout/Pet";
import CustomNavbar from "./layout/Navbar";
import {Grid, Col, Row} from "react-bootstrap";
import CreateAvatar from "./pages/CreateAvatar";

class UserSection extends Component {
  constructor(props) {
    super(props);

    this.onPetChange = this.onPetChange.bind(this);
    this.updatePet = this.updatePet.bind(this);

    this.state = {
      loadingPet: false,
      loadedPet: false,
      loadingMoney: false,
    };
  }

  componentDidMount() {
    if (!this.state.loadingPet) {
      this.updatePet();
    }

    if (!this.state.loadingMoney) {
      this.updateMoney();
    }
  }

  render() {
    return (
      <div>
        <CustomNavbar/>
        <Switch>
          <Route
            path="/create-avatar"
            render={props =>
              this.state.loadedPet ?
                this.state.pet !== undefined ? (
                  <Redirect to="/inventory"/>
                ) : (
                  <CreateAvatar {...props} token={this.props.token} onPetChange={this.onPetChange}/>
                ) : null}
          />
          <Route
            path="/"
            render={() =>
              this.state.loadedPet ?
                this.state.pet === undefined ? (
                  <Redirect to="/create-avatar"/>
                ) : (
                  <div className="content">
                    <div className="sidebar">
                      <Pet token={this.props.token} pet={this.state.pet}/>
                    </div>
                    <div className="inline">
                      <Page token={this.props.token} onPetChange={this.onPetChange}/>
                    </div>
                  </div>
                ) : null
            }/>
        </Switch>

      </div>
    );
  }


  onPetChange = () => {
    this.updatePet();
  }

  onMoneyChange = () => {
    this.updateMoney();
  }

  updatePet = () => {
    this.setState({loadingPet: true});
    fetch("/api/pet/get?userToken=" + this.props.token, {
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
        this.setState({
          loadingPet: false,
          loadedPet: true,
        });
      });
  }

  updateMoney = () => {
    this.setState({loadingMoney: true});
    fetch("/api/money/get?userToken=" + this.props.token, {
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
            money: res.money,
            loadingMoney: false,
          });
        }
      });
  }

}

export default UserSection;
