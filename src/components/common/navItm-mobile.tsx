import { useLocation, useNavigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";
import { userAction } from "store/user/slice";
import { auth } from "utils/firebase";

interface MobileNavModalProps {
  show: boolean;
  onClosed: () => void;
  editProfile: () => void;
  logout: any;
}

const MobileNavModal: React.FC<MobileNavModalProps> = ({
  show,
  onClosed,
  editProfile,
  logout,
}) => {
  const [user, loading, error] = useAuthState(auth);
  const [toggle, setToggle] = useState(false);

  //   const navigate = useNavigate();
  //   const location = useLocation();

  const dispatch = useDispatch();

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered={false}
      isOpen={show}
      toggle={onClosed}
      onClosed={onClosed}
    >
      <ModalBody className=" mobile-navbar ">
        <Nav
          className="w-100 d-flex justify-content-center align-items-center"
          navbar
        >
          <NavItem className="nav-collapse mb-3 ">
            <NavLink to="/">kukulu</NavLink>
          </NavItem>

          <NavItem className="nav-collapse mb-3">
            <NavLink to="/tras">tras</NavLink>
          </NavItem>

          <NavItem className="nav-collapse mb-3">
            <NavLink to="/feta">feta</NavLink>
          </NavItem>

          <div className="animation start-home"></div>
          {user && (
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle
                tag="a"
                className="nav-link white text-white select-cusror"
                caret
              >
                ({user.phoneNumber})
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    editProfile();
                    onClosed();
                  }}
                  className="text-dark"
                >
                  Edit profile
                </DropdownItem>
                <DropdownItem
                  tag="button"
                  onClick={(e) => {
                    logout(e);
                    onClosed();
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </ModalBody>
    </Modal>
  );
};

export default MobileNavModal;
