import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerOpen: false
    }
    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  toggleHamburger() {
    this.setState({
      isHamburgerOpen: !this.state.isHamburgerOpen,
    });
  }

  render() {
    return <nav className='tabs'>
      <div className='hamburger-menu' onClick={this.toggleHamburger}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <ul className={this.state.isHamburgerOpen ? 'display_block' : 'display_none'}>
        <li className='tab'><NavLink to=''><i className="fas fa-home home"></i>Home</NavLink></li>
        <li className='tab'><NavLink to='/countrysearch'>Search for a country</NavLink></li>
        <li className='tab'><NavLink to='/visited'>Visited countries</NavLink></li>
        <li className='tab'><NavLink to='wishlist'>Wishlist</NavLink></li>
        <li className='tab'><NavLink to='quiz'>Quiz</NavLink></li>
      </ul>
    </nav>
  }
}

export default Nav;
