import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let favoritesRoute = '';
    if (this.props.email !== '')  {
      favoritesRoute =  <NavItem><Link className='nav-link' to='/favorites'>Favorites</Link></NavItem>;
    }else{
      // favoritesRoute =  <NavItem><Link className='nav-link' to='/'>Favorites</Link></NavItem>;
    }
 
    console.log(this.props.getUser());
    let personalization = '';
    if (this.props.getUser().email !== '') {
      personalization = this.props.getUser().firstName + "'s ";
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">{personalization}Happy Songs</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className='nav-link' to='/login'>Login</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/signup'>Sign Up</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/about'>About</Link>
              </NavItem>
              {favoritesRoute}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}