import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Panel, Col, Image, Button } from "react-bootstrap";
import icon from "../../../assets/images/Snakethumbnail.png"

class Games extends Component {
  render() {
    return (
      <Panel className="jumbotron-style">
         <Panel.Heading>
            <Panel.Title className = "titleinv">Games</Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            <Col xs={6} sm={4} md={3} lg={3}>
            <Link to='/games/snake'>
            <Panel className= "bgc">
            <Panel.Body>
            <Image className="img-responsive center-block" src={icon} />
            </Panel.Body>
            <Panel.Footer className="bgc">
            <div style={{ textAlign: "center" }}>
              <b> Snake </b>
            </div>
             </Panel.Footer>
            </Panel>
            </Link>
            </Col>
          
          </Panel.Body>
      </Panel>
    )
  }
}


export default Games