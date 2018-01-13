import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import icon from "../../../../assets/images/neopets/Neopet1.png";

class ShopItemModal extends Component {
  render() {
    const {
      show = false,
      item,
      onClose,
      onBuyClick,
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
          1000$
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => onBuyClick(item)}> Buy item </Button>
          <Button onClick={onClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShopItemModal;
