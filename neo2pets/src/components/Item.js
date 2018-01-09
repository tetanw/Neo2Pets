import React, {Component} from 'react';
import {
  Panel,
  Col
} from 'react-bootstrap';
import icon from '../assets/images/neopets/Neopet1.png'

class Item extends Component {
  render() {
    return (
      <Panel style={{maxWidth: "100px"}}>
        <Panel.Body>
          <img src={icon} style={{width: "100%"}}/>
        </Panel.Body>
        <Panel.Footer>
          {this.props.type.name}
        </Panel.Footer>
      </Panel>
    );
  }
}

export default Item;