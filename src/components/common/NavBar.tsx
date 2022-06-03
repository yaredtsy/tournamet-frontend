import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "store/user/slice";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  Nav,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import EditUsernameModal from "./edit-username.components";
import gamezone from "assets/img/gamezone.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "utils/firebase";
import MobileNavModal from "./navItm-mobile";

function NavBar() {
  const [width, setWindowWidth] = useState(0);

  const [user, loading, error] = useAuthState(auth);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [modalShow, setModalShow] = useState(false);

  const [modalNavShow, setModalNavShow] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(userAction.logoutStart(""));
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    showTopNavMenu: width > 1023,
  };

  return (
    <>
      <MobileNavModal
        onClosed={() => {
          setModalNavShow(false);
        }}
        show={modalNavShow}
        editProfile={() => {
          setModalShow(true);
        }}
        logout={logoutHandler}
      />
      <Navbar
        fixed="top"
        className="navbar-dark  mr-auto ml-auto shadow-sm nav-bar vw-100"
        expand="md"
      >
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
                <img
                  src={gamezone}
                  alt="gamezone"
                  className="img-fluid img-thumbnail navbrand-img"
                />
              </NavbarBrand>
            </div>
            <NavbarToggler
              onClick={() => {
                if (width > 800) setToggle(!toggle);
                else setModalNavShow(!modalNavShow);
              }}
            />
            <Collapse isOpen={toggle} navbar>
              <Nav className="ml-auto ms-5 nav-parent" navbar>
                <NavItem className="nav-collapse border-right">
                  <NavLink
                    to="/"
                    className={
                      location.pathname == "/"
                        ? "navbar_item selected"
                        : "navbar_item border-right"
                    }
                  >
                    kukulu
                  </NavLink>
                </NavItem>

                <NavItem className="nav-collapse ">
                  <NavLink
                    to="/tras"
                    className={
                      location.pathname == "/tras"
                        ? "navbar_item selected"
                        : "navbar_item"
                    }
                  >
                    tras
                  </NavLink>
                </NavItem>

                <NavItem className="nav-collapse ">
                  <NavLink
                    to="/feta"
                    className={
                      location.pathname == "/feta"
                        ? "navbar_item selected"
                        : "navbar_item"
                    }
                  >
                    feta
                  </NavLink>
                </NavItem>

                <div className="animation start-home"></div>
              </Nav>
              {user && (
                <div className="ms-auto">
                  <UncontrolledDropdown setActiveFromChild>
                    <DropdownToggle
                      tag="a"
                      className="nav-link white text-white select-cusror"
                      caret
                    >
                      {user.displayName}({user.phoneNumber})
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
              )}
            </Collapse>
          </div>
        </Container>
        <EditUsernameModal
          onClosed={() => {
            setModalShow(false);
          }}
          show={modalShow}
        />
      </Navbar>
    </>
  );
}

export default NavBar;
