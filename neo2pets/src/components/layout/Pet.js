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
            <h4>the {pet.race.name}</h4>
            <Image src={"/images/" + pet.race.imgPath}/>
            <h4 style={{textAlign:"center"}}>Hunger:</h4>
            <ProgressBar
              style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}
              bsStyle={pet.hunger > 66 ? "success" : pet.hunger > 33 ? "warning" : "danger"}
              className="progressbar"
              active
              now={100 - pet.hunger}
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
