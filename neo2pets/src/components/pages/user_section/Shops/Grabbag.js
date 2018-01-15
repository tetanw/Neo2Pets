import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import { Panel, Col, Image, Button } from "react-bootstrap";
import thumbnail from "../../../../assets/images/questionmark.png";
import GrabbagModal from "./GrabbagModal";

class Grabbag extends Component {
    constructor(props) {
        super(props);
    
    
        this.state = {
          currentModal: "NONE",
          modalBuyable: null,
          request: null,
          loading: true,
        };
    }
    
  render() {
    return (
    <Fragment>
      <Panel className="jumbotron-style">
         <Panel.Heading>
            <Panel.Title className = "titleinv">Grab Bag</Panel.Title>
          </Panel.Heading>

           <Panel.Body >
            <Col>
            <Panel className= "bgc" >
            <Panel.Body>
            <Image onItemClick={this.onItemClick} className="img-responsive center-block" src={thumbnail} />
            </Panel.Body>
            <Panel.Footer className="bgc">
            <div style={{ textAlign: "center" }}>
            <h1>Click to buy a random item for 20$!</h1>
            </div>
             </Panel.Footer>
            </Panel>
            </Col>
          </Panel.Body>
      </Panel>
      <GrabbagModal
      show={this.state.currentModal === "ITEM"}
      />
    </Fragment>
    );
  }

  onItemClick = (itemIndex) => {
    this.setState({
      currentModal: "ITEM"
    });
  };
}

export default Grabbag;