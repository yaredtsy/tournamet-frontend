import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "store/user/slice";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import EditUsernameModal from "./edit-username.components";

function NavBar() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(userAction.logoutStart(""));
  };
  return (
    <Navbar className="navbar-dark bg-primary mr-auto ml-auto shadow-sm">
      <Container>
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <NavbarBrand
              className=""
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Kukulu
            </NavbarBrand>
          </div>
          <div className="mr-0">
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle
                tag="a"
                className="nav-link white text-white select-cusror"
                caret
              >
                profile
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalShow(true);
                  }}
                >
                  Edit profile
                </DropdownItem>
                <DropdownItem tag="button" onClick={logoutHandler}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Container>
      <EditUsernameModal
        onClosed={() => {
          setModalShow(false);
        }}
        show={modalShow}
      />
    </Navbar>
  );
}

export default NavBar;
