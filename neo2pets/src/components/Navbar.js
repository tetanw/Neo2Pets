import React, {Component} from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/images/logo.png'

class CustomNavbar extends Component {
  render() {
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
            <Link to='/'><img src={logo} className="img-responsive"/></Link>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
            <LinkContainer to="/shop"><NavItem>Shop</NavItem></LinkContainer>
            <LinkContainer to="/games"><NavItem>Games</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavbar;
