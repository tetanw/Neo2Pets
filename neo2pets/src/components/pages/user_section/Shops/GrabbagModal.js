import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import icon from "../../../../assets/images/neopets/Neopet1.png";

class GrabbagModal extends Component {
  render() {
    const {
      show = false,
      item,
      onClose
    } = this.props;

    if (item === null)
      return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>You got a</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <Image className=" img-responsive center-block" src={icon} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GrabbagModal;
