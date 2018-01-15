import React, { Component } from "react";
import { Panel, Col, Button } from "react-bootstrap";
import icon from "../../assets/images/neopets/Neopet1.png";

class Store extends Component {
  render() {
    return (
      <a onClick={this.onMarketClick}>
        <Panel className= "bgc">
          <Panel.Body>
          <div style={{ textAlign: "center" }}>
            <h4>Items for sale:{this.props.nrItems}</h4>
            <h4>Total value:{this.props.totalValue}</h4>
            </div>
          </Panel.Body>
          <Panel.Footer className="bgc">
            <div style={{ textAlign: "center" }}>
              <b>{this.props.ownerName}'s Store</b>
            </div>
          </Panel.Footer>
        </Panel>
      </a>
    );
  }

  onMarketClick = () => {
    const { onStoreClick, storeIndex } = this.props;

    onStoreClick(storeIndex);
  };
}

export default Store;