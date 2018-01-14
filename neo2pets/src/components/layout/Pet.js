import React, {Component} from "react";
import {
  Panel,
  Image,
  ProgressBar
} from "react-bootstrap";
import Neopet2 from "../../assets/images/neopets/Neopet2.png";

class Pet extends Component {
  render() {
    const {pet, money} = this.props;

    return (
      <Panel className="jumbotron-style">
        <Panel.Heading>
          <Panel.Title className="titleinv">
            {pet !== undefined ? pet.nickName : ""}
          </Panel.Title>
        </Panel.Heading>
        {this.props.pet !== undefined ? (
          <Panel.Body>
            <h3>the {pet.race.name}</h3>
            <Image src={Neopet2}/>
            <h3>{pet.name}</h3>
            <ProgressBar
              style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}
              bsStyle="success"
              className="progressbar"
              active
              now={50}
            />
          </Panel.Body>
        ) : (
          ""
        )}
        <Panel.Footer>
            {money !== undefined ? money + "$" : "0$"}
        </Panel.Footer>
      </Panel>
    );
  }
}

export default Pet;
