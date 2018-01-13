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
import Item from "../../../layout/Item";
import AddStoreModal from "./AddStoreModal";
import ItemModal from "./ItemModal";
import SearchBar from "./SearchBar";

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
        `api/item/getowneditems?userToken=${this.props.token}`,
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

export default Inventory;
