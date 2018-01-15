import React, {Component, Fragment} from "react";
import {FormGroup, InputGroup, FormControl, Button} from "react-bootstrap";

class SearchBar extends Component {
  render() {
    const {onTextChange, value} = this.props;

    return (
      <Fragment>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormGroup >
            <InputGroup>
              <InputGroup.Addon className="jumbotron-style" style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                Search
              </InputGroup.Addon>
              <FormControl className="jumbotron-style" value={value} onChange={onTextChange} type="text"/>
            </InputGroup>
          </FormGroup>
        </form>
      </Fragment>
    );
  }
}

export default SearchBar;
