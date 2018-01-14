import React, { Component, Fragment } from "react";
import ImagePicker from "react-image-picker";
import Neopet1 from "../../assets/images/neopets/Neopet1.png";
import Neopet2 from "../../assets/images/neopets/Neopet2.png";
import Neopet3 from "../../assets/images/neopets/Neopet3.png";
import Neopet4 from "../../assets/images/neopets/Neopet4.png";
import Neopet5 from "../../assets/images/neopets/Neopet5.png";
import Neopet6 from "../../assets/images/neopets/Neopet6.png";
import Neopet7 from "../../assets/images/neopets/Neopet7.png";
import Neopet8 from "../../assets/images/neopets/Neopet8.png";
import { Redirect } from "react-router";
import {
  Grid,
  Row,
  Col,
  Thumbnail,
  FormGroup,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";
import PageContainer from "../layout/PageContainer";

class CreateAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedPetRace: "",
      loading: false,
      request: null,
      isSubmitted: false
    };
  }

  onTextChange = event => {
    this.setState({ name: event.target.value });
  };

  onPetRaceClick = petRaceName => {
    this.setState({
      selectedPetRace: petRaceName
    });
  };

  onSubmit = () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          const response = JSON.parse(request.response);

          if (response.status === "SUCCESS") {
            return this.setState({
              isSubmitted: true
            });
            return;
          }
        }

        this.setState({
          request: null,
          loading: false
        });
      }
    };
    this.setState({
      request,
      loading: true
    });
    request.open("POST", `/api/pet/create`, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(
      JSON.stringify({
        raceName: this.state.selectedPetRace,
        nickName: this.state.name,
        userToken: this.props.token
      })
    );
  };

  render() {
    return (
      <PageContainer>
        {this.state.isSubmitted && <Redirect to="/" />}
        <div className="jumbotron jumbotron-style">
          <form onSubmit={this.handleSubmit} style={{textAlign: "center"}}>
            <label >
              <h1>Name your avatar:</h1>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    className="inputbox jumbotron-style"
                    value={this.state.name}
                    onChange={this.onTextChange}
                    type="text"
                  />
                </InputGroup>
              </FormGroup>
            </label>
            <div>
              <p>
                Choose your avatar, choose wisely!
              </p>
              <Row>
                <RacePanel
                  raceName={"1"}
                  image={Neopet1}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "1"}
                />
                <RacePanel
                  raceName={"2"}
                  image={Neopet2}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "2"}
                />
                <RacePanel
                  raceName={"3"}
                  image={Neopet3}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "3"}
                />
                <RacePanel
                  raceName={"4"}
                  image={Neopet4}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "4"}
                />
                <RacePanel
                  raceName={"5"}
                  image={Neopet5}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "5"}
                />
                <RacePanel
                  raceName={"6"}
                  image={Neopet6}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "6"}
                />
                <RacePanel
                  raceName={"7"}
                  image={Neopet7}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "7"}
                />
                <RacePanel
                  raceName={"8"}
                  image={Neopet8}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "8"}
                />
              </Row>
            </div>
            <Grid />
            <Button
              disabled={!this.state.name || !this.state.selectedPetRace}
              onClick={this.onSubmit}
              className="inputbox jumbotron-style"
            >
              Submit
            </Button>
          </form>
        </div>
      </PageContainer>
    );
  }
}

class RacePanel extends Component {
  render() {
    const { raceName, image, selected} = this.props;

    return (
      <Col xs={6} sm={4} md={3}>
        <div className="block" onClick={this.onPetRaceClick} style={selected ? {border: "5px solid white"} : {}}>
          <img className="avatarimage" src={image} />
          <div className="avatartext" style={{ textAlign: "center" }}>
            {raceName + selected}
          </div>
        </div>
      </Col>
    );
  }

  onPetRaceClick = () => {
    this.props.onPetRaceClick(this.props.raceName);
  };
}

export default CreateAvatar;
