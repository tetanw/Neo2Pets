import React, { Component, Fragment } from "react";
import { FormGroup, InputGroup, FormControl, Button } from "react-bootstrap";

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

export default SearchBar;
