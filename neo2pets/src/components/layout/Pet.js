import React, { Component } from "react";
import {
  Button,
  Grid,
  Row,
  Col,
  Image,
  Thumbnail,
  ProgressBar
} from "react-bootstrap";
import Neopet2 from "../../assets/images/neopets/Neopet2.png";

class Pet extends Component {
  render() {
    return (
      <div className="block jumbotron jumbotron-style">
        {this.props.pet !== undefined ? (
          <div>
            <h3 style={{ marginLeft: "20px" }}>{this.props.pet.nickName}</h3>
            <Image src={Neopet2} />
            <h3 style={{ marginLeft: "20px" }}>{this.props.pet.race.name}</h3>
            <h3 style={{ marginLeft: "20px" }}>{this.props.pet.name}</h3>
            <ProgressBar
              style={{ marginLeft: "auto", marginRight: "auto" }}
              bsStyle="success"
              className="progressbar"
              active
              now={50}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Pet;
