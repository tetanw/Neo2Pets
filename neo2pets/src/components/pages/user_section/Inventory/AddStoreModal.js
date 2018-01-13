import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class AddStoreModal extends Component {
  render() {
    const { onAddStoreClose, show } = this.props;

    return (
      <Modal show={show} onHide={onAddStoreClose}>
        <Modal.Header closeButton>
          I just want to say "Add to store"!
        </Modal.Header>

        <Modal.Body>Add to store!</Modal.Body>

        <Modal.Footer>
          <Button> Add to store! </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddStoreModal;
