import React, { Fragment, PureComponent } from "react";
import {
  Panel,
  Col,
} from "react-bootstrap";
import ShopItemModal from "./ShopItemModal";
import Item from "../../../layout/Item";
import SearchBar from "../../../layout/SearchBar";

class Shop extends PureComponent {
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
    const { loading, request } = this.state;

    if (loading) {
      //request.abort();
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
            <Panel.Title componentClass="h3">Someone's Store</Panel.Title>
          </Panel.Heading>
          <Panel.Body />
        </Panel>
      );
    }

    return (
      <Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Someone's Store</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <SearchBar
              value={this.state.searchbarText}
              onTextChange={this.onSearchBarTextChange}
            />
            {items.map((item, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Item onItemClick={this.onItemClick} item={item}/>
              </Col>
            ))}
          </Panel.Body>
        </Panel>
        <ShopItemModal
          show={this.state.currentModal === "ITEM"}
          item={this.state.modalItem}
          onClose={this.onItemClose}
          onBuyClick={this.onBuyClick}
        />
      </Fragment>
    );
  }

  onSearchBarTextChange = event => {
    this.setState({
      searchbarText: event.target.value
    });
  };

  onItemClick = (item) => {
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

  onBuyClick = () => {
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

  onDeleteClick = () => {
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

export default Shop;
