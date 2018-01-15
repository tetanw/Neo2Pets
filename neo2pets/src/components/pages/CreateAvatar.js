import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import {
  Grid,
  Row,
  Col,
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

  onSubmit = e => {
    if (!(!this.state.name || !this.state.selectedPetRace)) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            const response = JSON.parse(request.response);

            if (response.status === "SUCCESS") {
              this.props.onPetChange();
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
    }
    e.preventDefault();
  };

  render() {
    return (
      <PageContainer>
        {this.state.isSubmitted && <Redirect to="/" />}
        <div className="jumbotron jumbotron-style">
          <form onSubmit={this.onSubmit} style={{ textAlign: "center" }}>
            <label>
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
              <p>Choose your avatar, choose wisely!</p>
              <Row>
                <RacePanel
                  raceName={"Tentaeot"}
                  image={"/images/neopets/Neopet1.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Tentaeot"}
                />
                <RacePanel
                  raceName={"Vaportwo"}
                  image={"/images/neopets/Neopet2.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Vaportwo"}
                />
                <RacePanel
                  raceName={"Pidvee"}
                  image={"/images/neopets/Neopet3.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Pidvee"}
                />
                <RacePanel
                  raceName={"Drowchu"}
                  image={"/images/neopets/Neopet4.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Drowchu"}
                />
                <RacePanel
                  raceName={"Parabat"}
                  image={"/images/neopets/Neopet5.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Parabat"}
                />
                <RacePanel
                  raceName={"Scybasaur"}
                  image={"/images/neopets/Neopet6.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Scybasaur"}
                />
                <RacePanel
                  raceName={"Goldzee"}
                  image={"/images/neopets/Neopet7.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Goldzee"}
                />
                <RacePanel
                  raceName={"Charsian"}
                  image={"/images/neopets/Neopet8.png"}
                  onPetRaceClick={this.onPetRaceClick}
                  selected={this.state.selectedPetRace === "Charsian"}
                />
              </Row>
            </div>
            <Grid />
            <Button
              disabled={!this.state.name || !this.state.selectedPetRace}
              className="inputbox jumbotron-style"
              type="submit"
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
    const { raceName, image, selected } = this.props;

    return (
      <Col xs={6} sm={4} md={3}>
        <div
          className="block"
          onClick={this.onPetRaceClick}
          style={selected ? { border: "5px solid white" } : {}}
        >
          <img className="avatarimage" src={image} />
          <div className="avatartext" style={{ textAlign: "center" }}>
            {raceName}
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
