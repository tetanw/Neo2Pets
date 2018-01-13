import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import icon from "../../../../assets/images/neopets/Neopet1.png";

class ItemModal extends Component {
  render() {
    const {
      show = false,
      item,
      onClose,
      onUseClick,
      onAddStoreOpenClick,
      onDeleteClick
    } = this.props;

    if (item === null)
      return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.type.name}</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <Image className=" img-responsive center-block" src={icon} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => onUseClick(item)}> Give to pet </Button>
          <Button onClick={onAddStoreOpenClick}> Add to store </Button>
          <Button onClick={() => onDeleteClick(item)}> Throw away </Button>
          <Button onClick={onClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ItemModal;
