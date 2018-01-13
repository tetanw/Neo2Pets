import React, { Component } from "react";
import {
  Button,
  Grid,
  Row,
  Col,
  Thumbnail,
  ProgressBar
} from "react-bootstrap";

class Pet extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-style">
        {this.props.pet !== undefined ? (
          <div>
            <h3>{this.props.pet.nickName}</h3>
            <h3>{this.props.pet.race.name}</h3>
            <h3>{this.props.pet.name}</h3>
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
