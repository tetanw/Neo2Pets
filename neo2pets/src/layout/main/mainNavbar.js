import React, { Component, Fragment } from 'react';
import { Button, NavbarToggle, Navbar, Grid, NavItem, Nav } from 'react-bootstrap';

export class MainLayoutNavbar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Neo^2 Pets</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1}>
            Logout
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}