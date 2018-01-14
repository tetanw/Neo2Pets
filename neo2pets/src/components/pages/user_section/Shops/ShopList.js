import React, {Fragment, Component} from "react";
import {
  Panel,
  Col,
} from "react-bootstrap";
import ShopItemModal from "./ShopItemModal";
import Market from "../../../layout/Market";
import SearchBar from "../../../layout/SearchBar";

class ShopList extends Component {
  constructor(props) {

      super(props);
  
  
      this.state = {
        currentModal: "NONE",
        modalItem: null,
        request: null,
        loading: true,
        searchbarText: ""
      };
    }
  
    componentDidMount() {
      this.updateStore();
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
      const {loading, store, searchbarText} = this.state;
      if (loading && store === undefined) {
        return (
          <Panel className ="jumbotron-style">
            <Panel.Heading>
              <Panel.Title className = "titleinv">Marketplace</Panel.Title>
            </Panel.Heading>
            <Panel.Body/>
          </Panel>
        );
      }
  
      return (
        <Fragment>
          <Panel className ="jumbotron-style">
            <Panel.Heading className = "padding bgc">
              <Panel.Title className = "titleinv">Marketplace</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <SearchBar
                value={this.state.searchbarText}
                onTextChange={this.onSearchBarTextChange}
              />
              {store.buyables.filter(buyable => buyable.item.type.name.toLowerCase().includes(searchbarText.toLowerCase())).map((buyable, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2}>
                  <Market onMarketClick={this.onItemClick} name={store.ownerName + "'s Store"} MarketIndex={index}/>
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
      event.preventDefault();
    };
  
    onMarketClick = (itemIndex) => {
      let item = this.state.buyables[itemIndex]
      this.setState({
        currentModal: "ITEM",
        modalItem: item
      });
    };
  
    onMarketClose = () => {
      this.setState({
        currentModal: "NONE",
        modalItem: null
      });
    };
  
    onBuyClick = () => {
      let storeID = this.props.match.params.shopID;
      fetch('/api/store/buyitem', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToken: this.props.token,
          storeID: storeID,
          buyableID: this.state.modalBuyable._id
        })
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.status === "SUCCESS") {
            this.updateStore();
            this.props.onMoneyChange();
          }
          console.log(res);
        });
  
      this.setState({
        currentModal: "NONE",
        modalItem: null
      });
    };
  
    updateStore = () => {
      let storeID = this.props.match.params.shopID;
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
              store: response.store,
              loading: false,
              request: null
            });
          }
          console.log(response);
        }
      };
      request.open(
        "GET",
        `/api/store/listbuyables?userToken=${this.props.token}&storeID=${storeID}`,
        true
      );
      request.send();
    }
  
  }

export default ShopList