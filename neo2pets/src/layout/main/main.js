import React, { Component, Fragment } from 'react';
import { Button, NavbarToggle, Navbar, Grid } from 'react-bootstrap';
import { MainLayoutNavbar } from './mainNavbar';

export class MainLayout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <MainLayoutNavbar />

        {/* TODO: Find out how css-modules works to remove the style tag from MainLayout */}
        <Grid style={{marginTop: '50px'}}>
          {children}
        </Grid>
      </Fragment>
    );
  }
}
