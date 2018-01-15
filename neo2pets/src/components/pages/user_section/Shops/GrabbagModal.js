import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";

class GrabbagModal extends Component {
  render() {
    const {
      show,
      item,
      onClose
    } = this.props;

    if (item === null)
      return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>You got a {item.type.name}</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <Image className=" img-responsive center-block" src={"/images/" + item.type.imgPath} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GrabbagModal;
