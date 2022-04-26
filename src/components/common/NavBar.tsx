import React from "react";
import { useDispatch } from "react-redux";
import {userAction} from 'store/user/slice'

import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


function NavBar() {
const dispatch = useDispatch();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    dispatch(userAction.logoutStart(""))
  }
  return (
    <Navbar className="navbar-dark bg-primary mr-auto ml-auto">
      <Container>
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <NavbarBrand className="" href="#home">
              Kukulu
            </NavbarBrand>
          </div>
          <div className="mr-0">
              
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle tag="a" className="nav-link white text-white select-cusror" caret >
                profile
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="a">Edit profile</DropdownItem>
                <DropdownItem tag="button" onClick={logoutHandler}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
