import React, { Component } from "react";
import ImagePicker from "react-image-picker";
import Neopet1 from "../../assets/images/neopets/Neopet1.png";
import Neopet2 from "../../assets/images/neopets/Neopet2.png";
import Neopet3 from "../../assets/images/neopets/Neopet3.png";
import Neopet4 from "../../assets/images/neopets/Neopet4.png";
import Neopet5 from "../../assets/images/neopets/Neopet5.png";
import Neopet6 from "../../assets/images/neopets/Neopet6.png";
import Neopet7 from "../../assets/images/neopets/Neopet7.png";
import Neopet8 from "../../assets/images/neopets/Neopet8.png";
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

class CreateAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedPetRace: ""
    };
  }

  onTextChange = event => {
    this.setState({ name: event.target.value });
  };

  onPetRaceClick = petRaceName => {
    console.log(`You selected the race with the name: ${petRaceName}`);
    this.setState({
      selectedPetRace: petRaceName
    });
  };

  onSubmit = () => {};

  render() {
    return (
      <div className="jumbotron jumbotron-style">
        <form onSubmit={this.handleSubmit}>
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
            <p>Choose your avatar and starting skill levels! choose wisely!</p>
            <Row>
              <RacePanel
                raceName={"SUPERPICKACHU"}
                image={Neopet1}
                onPetRaceClick={this.onPetRaceClick}
              />
              <RacePanel
                raceName={"SUPERPICKACHU2"}
                image={Neopet1}
                onPetRaceClick={this.onPetRaceClick}
              />
            </Row>
          </div>
          {this.state.selectedPetRace && (
            <p> You selected an {this.state.selectedPetRace} </p>
          )}
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
    );
  }
}

class RacePanel extends Component {
  render() {
    const { raceName, image, onPetRaceClick } = this.props;

    return (
      <Col xs={8} sm={6} md={3}>
        <div className="block" onClick={this.onPetRaceClick}>
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
