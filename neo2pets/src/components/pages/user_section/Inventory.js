import React, { Component, Fragment, PureComponent } from "react";
import {
  Panel,
  Grid,
  Col,
  Modal,
  Button,
  Glyphicon,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import Item from "../../layout/Item";

class Inventory extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: "NONE",
      items: [],
      request: null,
      loading: false,
      searchbarText: ""
    };
  }

  componentDidMount() {
    if (!this.state.loading) {
      var request = new XMLHttpRequest();
      this.setState({
        request,
        loading: true
      });
      const userToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxMjMiLCJpZCI6IjVhNTRjNmE5ZDQwNmE4MjcwODIzYzg1MSIsImlhdCI6MTUxNTUwNTY1Mn0.qZDMcnoM7vPm9vFUQzsMjUONu1_M1TiWi9oofOYDrvc";
      request.onreadystatechange = () => {
        if (
          request.readyState === XMLHttpRequest.DONE &&
          request.status !== 0
        ) {
          const response = JSON.parse(request.response);

          if (response.status === "SUCCESS") {
            this.setState({
              items: response.items,
              loading: false,
              request: null
            });
          }
        }
      };
      request.open(
        "GET",
        `api/item/getowneditems?userToken=${userToken}`,
        true
      );
      request.send();
    }
  }

  componentWillUnmount() {
    const { loading, request } = this.state;

    if (loading) {
      request.abort();
      this.setState({
        loading: false,
        request: null
      });
    }
  }

  render() {
    const { loading, items } = this.state;

    if (loading) {
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body />
        </Panel>
      );
    }

    return (
      <Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <SearchBar
              value={this.state.searchbarText}
              onTextChange={this.onSearchBarTextChange}
            />
            {items.map(({ type, id }, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Item onItemClick={this.onItemClick} id={id} type={type} />
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

  onSearchBarTextChange = event => {
    this.setState({
      searchbarText: event.target.value
    });
  };

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

class SearchBar extends Component {
  render() {
    const { onTextChange, value } = this.props;

    return (
      <Fragment>
        <h3> Search </h3>
        <form>
          <FormGroup>
            <InputGroup>
              <FormControl value={value} onChange={onTextChange} type="text" />
              <InputGroup.Button>
                <Button>Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </Fragment>
    );
  }
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
