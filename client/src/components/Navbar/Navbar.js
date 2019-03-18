import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import "./Navbar.css"

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  logout(){
    localStorage.setItem("email", "")
    localStorage.setItem("id", "")
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar id="navbar" expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/profile/" >{localStorage.getItem("email")?localStorage.getItem("email") : "Profile"}</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink onClick={()=>{this.logout()}}href="/">Logout</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Log info
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={()=>{localStorage.setItem("log", "bike")}} href="/log">
                    Bike
                  </DropdownItem>
                  <DropdownItem onClick={()=>{localStorage.setItem("log", "run")}} href="/log">
                    Run
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>{localStorage.setItem("log", "food")}} href="/log" >
                    Food
                  </DropdownItem>
                  <DropdownItem onClick={()=>{localStorage.setItem("log", "sleep")}} href="/log">
                    Sleep
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}