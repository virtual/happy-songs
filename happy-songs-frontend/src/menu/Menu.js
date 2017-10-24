import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Link
} from 'react-router-dom';
var axios = require('axios');

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  getUserTemplate(){
    if (this.props.user){
      return "Logged in as: " + this.props.user.email;
    } else {
      return "Not Logged In"
    }
  }

  logout(){
    this.props.logout();
  }
  
  getNavItems(){
    if(this.props.user){
      return ( 
        <Nav className="ml-auto" navbar>
          <NavItem>
            <div className='nav-link' onClick={this.logout}>Logout</div>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/favorites'>Favorites</Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/findSongs'>Find Songs</Link>
          </NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link className='nav-link' to='/login'>Login</Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/signup'>Sign Up</Link>
          </NavItem>
        </Nav>
      )
    }
  }
  
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          {this.getUserTemplate()}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.getNavItems()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}