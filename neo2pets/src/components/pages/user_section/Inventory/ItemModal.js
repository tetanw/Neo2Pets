import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ItemModal extends Component {
  render() {
    const {
      show = false,
      onClose,
      onUseClick,
      onAddStoreClick,
      onDeleteClick,
      onFavouriteClick
    } = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>I just want to say Trello!</Modal.Header>

        <Modal.Body>Trello!</Modal.Body>

        <Modal.Footer>
          <Button onClick={onUseClick}> Use </Button>
          <Button onClick={onAddStoreClick}> Add to store </Button>
          <Button onClick={onDeleteClick}> Delete </Button>
          <Button onClick={onFavouriteClick}> Make favourite </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ItemModal;
