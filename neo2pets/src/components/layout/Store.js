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
            <h3>Amount of Items</h3>
            <p>{this.props.amount}</p>
            <h3>Total value</h3>
            <p>{this.props.value}</p>
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