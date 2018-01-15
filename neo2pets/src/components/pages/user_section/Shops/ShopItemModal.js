import React, { Component } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import icon from "../../../../assets/images/neopets/Neopet1.png";

class ShopItemModal extends Component {
  render() {
    const {
      show = false,
      buyable,
      onClose,
      onBuyClick,
      ownStore
    } = this.props;

    if (buyable === null)
      return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{buyable.item.type.name}</Modal.Title>
          </Modal.Header>

        <Modal.Body>
          <Image className=" img-responsive center-block" src={icon} />
          {buyable.price}$
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onBuyClick}> {ownStore ? "Remove from your store" : "Buy item"} </Button>
          <Button onClick={onClose}> Close </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShopItemModal;
