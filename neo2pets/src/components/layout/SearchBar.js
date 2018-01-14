import React, {Component, Fragment} from "react";
import {FormGroup, InputGroup, FormControl, Button} from "react-bootstrap";

class SearchBar extends Component {
  render() {
    const {onTextChange, value} = this.props;

    return (
      <Fragment>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                Search
              </InputGroup.Addon>
              <FormControl value={value} onChange={onTextChange} type="text"/>
            </InputGroup>
          </FormGroup>
        </form>
      </Fragment>
    );
  }
}

export default SearchBar;
