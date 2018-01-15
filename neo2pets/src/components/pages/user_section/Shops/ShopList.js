import React, {Fragment, Component} from "react";
import {
  Panel,
  Col,
  Row
} from "react-bootstrap";
import Store from "../../../layout/Store";
import SearchBar from "../../../layout/SearchBar";

class ShopList extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        stores: [],
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
      const {loading, stores, searchbarText} = this.state;
      if (loading && stores.length !== 0) {
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
            <Panel.Heading>
              <Panel.Title className="titleinv">Marketplace</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <SearchBar
                value={this.state.searchbarText}
                onTextChange={this.onSearchBarTextChange}
              />
              <Row>
              {stores.filter(store =>
                store.ownerName.toLowerCase().includes(searchbarText.toLowerCase()) &&
                store.nrItems >= 0
              ).map((store, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={4}>
                  <Store onStoreClick={this.onStoreClick}
                         ownerName={store.ownerName}
                         storeIndex={index}
                         nrItems={store.nrItems}
                         totalValue={store.totalValue}
                         ownStore={store.ownStore}
                  />
                </Col>
              ))}
              </Row>
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
  
    onStoreClick = (storeIndex) => {
      this.props.history.push("/marketplace/" + this.state.stores[storeIndex].id)
    };
  
    updateMarketplace = () => {
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
              stores: response.stores,
              loading: false,
              request: null
            });
          }
          console.log(response);
        }
      };
      request.open(
        "GET",
        `api/store/listStores?userToken=${this.props.token}`,
        true
      );
      request.send();
    }
  
  }

export default ShopList