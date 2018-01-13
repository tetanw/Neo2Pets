import React, {Component} from "react";
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from "react-bootstrap";

class AddStoreModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
    }
  }

  render() {
    const {
      show = false,
      item,
      onAddStoreClose,
    } = this.props;

    if (item === null)
      return null;

    return (
      <Modal show={show} onHide={onAddStoreClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding {item.type.name} to your personal store.</Modal.Title>
        </Modal.Header>

        <Form onSubmit={this.onSubmit}>
          <Modal.Body>
            <FormGroup controlId="formHorizontalPasswordValidation">
              <Col componentClass={ControlLabel} sm={3}>
                Item Price
              </Col>

              <Col sm={5}>
                <FormControl
                  label='Set item price'
                  className="inputbox jumbotron-style"
                  type="number"
                  name="price"
                  value={this.state.price}
                  placeholder="100"
                  onKeyPress={this.onKeyPress}
                  onChange={(e) => this.setState({price: e.target.value})}
                  min={0}
                  required
                />
              </Col>
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit"> Add to store! </Button>
            <Button onClick={onAddStoreClose}> Close </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  onSubmit = () => {
    this.props.onAddStoreClick(this.state.price)
  }

  onKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/^([^0-9]*)$/.test(keyValue))
      event.preventDefault();
  }
}

export default AddStoreModal;
