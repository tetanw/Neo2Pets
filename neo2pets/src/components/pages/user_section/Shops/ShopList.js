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
      this.updateMarketplace();
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
              {marketplace.markets.filter(market => market.type.name.toLowerCase().includes(searchbarText.toLowerCase())).map((buyable, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2}>
                  <Market onMarketClick={this.onMarketClick} name={store.ownerName + "'s Store"} MarketIndex={index}/>
                </Col>
              ))}
            </Panel.Body>
          </Panel>
        </Fragment>
      );
    }
  
    onSearchBarTextChange = event => {
      this.setState({
        searchbarText: event.target.value
      });
      event.preventDefault();
    };
  
    onMarketClick = (MarketIndex) => {
    
    };
  
    updateMarketplace = () => {

    }
  
  }

export default ShopList