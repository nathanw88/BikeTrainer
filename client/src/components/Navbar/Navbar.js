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
    //binding this on toggle instead of on calling it
    this.toggle = this.toggle.bind(this);
    //setting initial state of navbar dropdown to false
    this.state = {
      isOpen: false
    };
  }
  // log out function which clears the local storage of user info
  logout(){
    sessionStorage.setItem("email", "")
    sessionStorage.setItem("id", "")
  }
  // toggle function opens dropdown for selecting what you want to log
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar id="navbar" expand="md">
          <NavbarBrand href="/">Community_Fit</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/user_profile/">{sessionStorage.getItem("email")}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile/" disabled ={!sessionStorage.getItem("email")}>Data</NavLink>
              </NavItem>
              
              <UncontrolledDropdown  nav inNavbar>
                <DropdownToggle disabled ={!sessionStorage.getItem("email")}  nav caret>
                  Log info
                </DropdownToggle>
                <DropdownMenu disabled ={!sessionStorage.getItem("email")} right>
                  {/* <DropdownItem onClick={()=>{sessionStorage.setItem("log", "bike")}} href="/log">
                    Bike
                  </DropdownItem>
                  <DropdownItem onClick={()=>{sessionStorage.setItem("log", "run")}} href="/log">
                    Run
                  </DropdownItem>
                  <DropdownItem divider /> */}
                  <DropdownItem onClick={()=>{sessionStorage.setItem("log", "food")}} href="/log" >
                    Food
                  </DropdownItem>
                  {/* <DropdownItem onClick={()=>{sessionStorage.setItem("log", "sleep")}} href="/log">
                    Sleep
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink disabled ={!sessionStorage.getItem("email")} onClick={()=>{this.logout()}}href="/">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}