import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/images/Logo.png'

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar-fixed-top">
          <div className="navbar">
            <div className="navbar-header">
              <a href="/"><img src={Logo} alt='logo' className="img-responsive"/></a>
            </div>

            <ul className="nav navbar-nav">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/games'>Games</Link></li>
              <li><Link to='/marketplace'>Marketplace</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;