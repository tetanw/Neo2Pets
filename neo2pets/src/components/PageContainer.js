import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

class PageContainer extends Component {
  render() {
    return (
      <Grid className="maincontent">
        {this.props.children}
      </Grid>
    )
  }
}

export default PageContainer;