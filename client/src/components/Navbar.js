import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";
import logo from "../images/logo200.png";
import "./style.css";

function refreshPage() {
  window.location.replace("/");
}
const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-gradient-to-r from-purple-100 to-purple-900"
      >
        <Container
          fluid
          className="bg-gradient-to-r from-purple-100 to-purple-900"
        >
          <Navbar.Brand>
            {" "}
            <img src={logo} className="w-24" alt="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <div className="flex">
                <NavLink
                  className="m-2 px-2 cursor-pointer text-xl  bg-yellow-500 py-1  rounded-lg text-green-100 no-underline hover:bg-yellow-400 hover:text-green-900"
                  to="/"
                  onClick={refreshPage}
                >
                  <i className="fas fa-home text-blue-900"></i> Home
                </NavLink>
                {Auth.loggedIn() ? (
                  <>
                    <NavLink
                      to="/profile"
                      className="my-2 px-2 cursor-pointer text-xl  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-400 hover:text-green-900"
                    >
                      <i className="far fa-address-card text-blue-900"></i>{" "}
                      Profile
                    </NavLink>
                    <div className="mx-2">
                      <button
                        className="my-2 px-2 cursor-pointer text-xl  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-400 hover:text-green-900"
                        onClick={Auth.logout}
                      >
                        <i className="fas fa-sign-out-alt text-blue-800"></i>{" "}
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="my-2 px-2 cursor-pointer text-xl  bg-green-600 py-1  rounded-lg text-gray-700 no-underline hover:bg-green-400 hover:text-green-900"
                    onClick={() => setShowModal(true)}
                  >
                    Login/Sign Up
                  </button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}

      <Modal
        id="modal"
        size="md"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <img src={logo} href="/" className="w-25 my-2 mx-auto" alt="logo" />

        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link className="btn" eventKey="login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="btn" eventKey="signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-gray-100 p-4 m-2 shadow-md rounded-xl">
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <SignUpForm
                  signUpForm={false}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm
                  signUpForm={true}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {Auth.loggedIn() ? (
        <h1 className="  px-3 text-3xl shadow-md bg-gradient-to-r from-purple-900 to-purple-100 text-center p-2 ">
          <FontAwesomeIcon icon={faUser} className="text-green-200 ml-4   " />{" "}
          <span className="text-white p-2">
            {Auth.getProfile().data.username.toUpperCase()}
          </span>{" "}
        </h1>
      ) : (
        ""
      )}
    </>
  );
};

export default AppNavbar;
