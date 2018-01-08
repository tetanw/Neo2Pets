import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav class="navbar-fixed-top navibar">
      <div class="navibar">
        <div class="navbar-header">
            <a href="/"><img src="./assets/images/Logo.png" alt='logo' /></a>
        </div>
  
        <ul class="nav navbar-nav">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/games'>Games</Link></li>
          <li><Link to='/marketplace'>Marketplace</Link></li>
        </ul>
      </div>
    </nav>
    
  </header>
)

export default Header