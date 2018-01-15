import React, {Component, Fragment} from "react";
import {Panel, Col, Row} from "react-bootstrap";
import Item from "../../../layout/Item";
import AddStoreModal from "./AddStoreModal";
import ItemModal from "./ItemModal";
import SearchBar from "../../../layout/SearchBar";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: "NONE",
      modalItem: null,
      items: [],
      request: null,
      loading: false,
      searchbarText: ""
    };
  }

  componentDidMount() {
    this.updateItems();
  }

  componentWillUnmount() {
    const {loading, request} = this.state;

    if (loading) {
      //request.abort();
      this.setState({
        loading: true,
        request: null
      });
    }
  }

  render() {
    const {loading, items, searchbarText} = this.state;

    if (loading && items.length === 0) {
      return (
        <Panel className="jumbotron-style">
          <Panel.Heading className="padding bgc">
            <Panel.Title className="titleinv">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body/>
        </Panel>
      );
    }

    return (
      <Fragment>
        <Panel className="jumbotron-style">
          <Panel.Heading>
            <Panel.Title className="titleinv">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <SearchBar
              value={this.state.searchbarText}
              onTextChange={this.onSearchBarTextChange}
            />
            <Row>
              {items.filter(item => item.type.name.toLowerCase().includes(searchbarText.toLowerCase())).map((item, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2}>
                  <Item onItemClick={this.onItemClick} name={item.type.name} itemIndex={index} imgPath={item.type.imgPath}/>
                </Col>
              ))}
            </Row>
          </Panel.Body>
        </Panel>
        <ItemModal
          show={this.state.currentModal === "ITEM"}
          item={this.state.modalItem}
          onClose={this.onItemClose}
          onUseClick={this.onUseClick}
          onAddStoreOpenClick={this.onAddStoreOpenClick}
          onDeleteClick={this.onDeleteClick}
        />
        <AddStoreModal
          show={this.state.currentModal === "ADD_STORE"}
          item={this.state.modalItem}
          onAddStoreClose={this.onAddStoreClose}
          onAddStoreClick={this.onAddStoreClick}
        />
      </Fragment>
    );
  }

  onSearchBarTextChange = event => {
    this.setState({
      searchbarText: event.target.value
    });
    event.preventDefault();
  };

  onItemClick = (itemIndex) => {
    let item = this.state.items[itemIndex];
    this.setState({
      currentModal: "ITEM",
      modalItem: item
    });
  };

  onItemClose = () => {
    this.setState({
      currentModal: "NONE",
      modalItem: null
    });
  };

  onUseClick = () => {
    fetch('/api/item/consume', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userToken: this.props.token,
        itemID: this.state.modalItem.id,
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === "SUCCESS") {
          this.updateItems();
          this.props.onPetChange();
        }
      });

    this.setState({
      currentModal: "NONE",
      modalItem: null
    });
  };

  onAddStoreOpenClick = () => {
    // a new modal for adding to store
    this.setState({
      currentModal: "ADD_STORE"
    });
  };

  onDeleteClick = () => {
    fetch('/api/item/delete', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userToken: this.props.token,
        itemID: this.state.modalItem.id,
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === "SUCCESS") {
          this.updateItems();
        }
      });

    this.setState({
      currentModal: "NONE",
      modalItem: null
    });
  };

  onAddStoreClose = () => {
    this.setState({
      currentModal: "ITEM"
    });
  };

  onAddStoreClick = (_price) => {
    fetch('/api/store/additemtostore', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userToken: this.props.token,
        itemID: this.state.modalItem.id,
        price: _price
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === "SUCCESS") {
          this.updateItems();
        }
      });

    this.setState({
      currentModal: "NONE",
      modalItem: null
    });
  };

  updateItems = () => {
    let request = new XMLHttpRequest();
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

export default Inventory;
