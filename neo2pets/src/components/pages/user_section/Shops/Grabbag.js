import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {Panel, Col, Image, Button} from "react-bootstrap";
import thumbnail from "../../../../assets/images/questionmark.png";
import GrabbagModal from "./GrabbagModal";

class Grabbag extends Component {
  constructor(props) {
    super(props);


    this.state = {
      showModal: false,
      item: null,
      request: null,
      loading: true,
    };
  }

  render() {
    return (
      <Fragment>
        <Panel className="jumbotron-style">
          <Panel.Heading>
            <Panel.Title className="titleinv">Grab Bag</Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            <Col>
              <Panel className="bgc">
                <Panel.Body>
                  <Image onClick={this.onItemClick} className="img-responsive center-block" src={thumbnail}/>
                </Panel.Body>
                <Panel.Footer className="bgc">
                  <div style={{textAlign: "center"}}>
                    <h1>Click to buy a random item for 100$!</h1>
                  </div>
                </Panel.Footer>
              </Panel>
            </Col>
          </Panel.Body>
        </Panel>
        <GrabbagModal
          show={this.state.showModal}
          item={this.state.item}
          onClose={this.onModalClose}
        />
      </Fragment>
    );
  }

  onItemClick = () => {
    console.log("open");
    fetch('/api/item/createrandom', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userToken: this.props.token
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === "SUCCESS") {
          this.setState({
            showModal: true,
            item: res.item,
          });
        }
        console.log(res);
      });
  };

  onModalClose = () => {
    console.log("close")
    this.setState({
      showModal: false,
    });
  };
}

export default Grabbag;