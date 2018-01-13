import React, { Component } from "react";
import { Panel, Col, Image, Button } from "react-bootstrap";
import icon from "../../assets/images/neopets/Neopet1.png";

class Item extends Component {
  render() {
    return (
      <a onClick={this.onItemClick}>
        <Panel>
          <Panel.Body>
            <Image className=" img-responsive center-block" src={icon} />
          </Panel.Body>
          <Panel.Footer>
            <div style={{ textAlign: "center" }}>
              <b> {this.props.type.name} </b>
            </div>
          </Panel.Footer>
        </Panel>
      </a>
    );
  }

  onItemClick = () => {
    const { onItemClick } = this.props;

    onItemClick();
  };
}

export default Item;
