import React, {Component, Fragment} from "react";
import {Panel, Col} from "react-bootstrap";
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
        loading: false,
        request: null
      });
    }
  }

  render() {
    const {loading, items} = this.state;

    if (loading) {
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Inventory</Panel.Title>
          </Panel.Heading>
          <Panel.Body/>
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
            {items.map((item, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Item onItemClick={this.onItemClick} name={item.type.name} itemIndex={index}/>
              </Col>
            ))}
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
        } else {
          console.log(res);
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
        } else {
          console.log(res);
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
        } else {
          console.log(res);
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
