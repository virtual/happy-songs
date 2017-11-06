import React,{Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Link, withRouter
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

var Menu = observer (class extends Component{
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
 
    console.log(this.props.userStore.user);
    let personalization = '';
    if (this.props.userStore.user) {
      personalization = this.props.userStore.user.firstName + "'s ";
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand ><Link to="/">{personalization}Happy Songs</Link></NavbarBrand>
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
});


export default withRouter(inject("userStore")(Menu));