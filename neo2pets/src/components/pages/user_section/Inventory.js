import React, { Component, Fragment } from "react";
import { Panel, Grid, Col, Modal, Button } from "react-bootstrap";
import Item from "../../layout/Item";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: "NONE",
      items: [
        {
          _id: "5a54ca186a2bf405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad3258235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca3521e9a40914ce4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca186a2b405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad358235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "554ca3521e9a40914ce4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54c186a2bf405681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54caad3258235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca3521e9a40914ce4bd",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca186a2bf05681677b2",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad325235a0f39cd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca3521e9a40914ce4b4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca186a2bf4056816772",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca2ad3258235a0f39c4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        },
        {
          _id: "5a54ca3521e9a40914e4bd4",
          type: {
            _id: "5a54b7bd68b68035003ac46f",
            name: "BLOCK6",
            propertyData: {
              TOY: {
                funValue: 3
              }
            },
            properties: ["TOY"]
          },
          owner: "5a54c6a9d406a8270823c851"
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {this.state.items.map((item, index) => (
              <Col key={index} sm={2}>
                <Item onItemClick={this.onItemClick} type={{ name: "Kaka" }} />
              </Col>
            ))}
          </Panel.Body>
        </Panel>
        <ItemModal
          show={this.state.currentModal === "ITEM"}
          onClose={this.onItemClose}
          onUseClick={this.onUseClick}
          onAddStoreClick={this.onAddStoreClick}
          onDeleteClick={this.onDeleteClick}
          onFavouriteClick={this.onFavouriteClick}
        />
        <AddStoreModal
          show={this.state.currentModal === "ADD_STORE"}
          onAddStoreClose={this.onAddStoreClose}
        />
      </Fragment>
    );
  }

  onItemClick = () => {
    this.setState({
      currentModal: "ITEM"
    });
  };

  onItemClose = () => {
    this.setState({
      currentModal: "NONE"
    });
  };

  onUseClick = () => {
    this.setState({
      currentModal: "NONE"
    });
  };

  onAddStoreClick = () => {
    // a new modal for adding to store
    this.setState({
      currentModal: "ADD_STORE"
    });
  };

  onDeleteClick = () => {
    this.setState({
      currentModal: "NONE"
    });
  };

  onFavouriteClick = () => {
    this.setState({
      currentModal: "NONE"
    });
  };

  onAddStoreClose = () => {
    this.setState({
      currentModal: "ITEM"
    });
  };
}

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

export default Inventory;
