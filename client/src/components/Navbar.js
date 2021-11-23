import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoPersonSharp } from "react-icons/io5";

import logo from "../images/logo200.png";
import Auth from "../utils/auth";
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
          <Navbar.Brand as={Link} to="/">
            {" "}
            <img src={logo} className="w-75" alt="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <a
                className="ml-2  px-2 cursor-pointer  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-100 hover:text-green-600"
                as={Link}
                to="/"
              >
                Profile
              </a>
              <a
                className="ml-2 px-2 cursor-pointer  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-100 hover:text-green-600"
                as={Link}
                to="/"
              >
                Progress
              </a>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Link
                    to="/addQuiz"
                    className="ml-2 px-2 cursor-pointer  bg-red-600 py-1  rounded-lg text-red-100 no-underline hover:bg-red-100 hover:text-red-600"
                  >
                    add Quiz
                  </Link>
                  <a
                    className="ml-2 px-2 cursor-pointer  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-100 hover:text-green-600"
                    as={Link}
                    to="/quizes"
                  >
                    See Your quizzes
                  </a>
                  <a
                    as={Link}
                    className="ml-2 px-2 cursor-pointer  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-100 hover:text-green-600"
                    onClick={Auth.logout}
                  >
                    Logout
                  </a>
                </>
              ) : (
                <a
                  as={Link}
                  className="ml-2 px-2 cursor-pointer  bg-green-600 py-1  rounded-lg text-green-100 no-underline hover:bg-green-100 hover:text-green-600"
                  onClick={() => setShowModal(true)}
                >
                  Login/Sign Up
                </a>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <img src={logo} href="/" className="w-20 mx-auto w-25" alt="logo" />
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link className="btn " eventKey="login">
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

          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <SignUpForm
                  signUp={false}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm
                  signUp={true}
                  handleModalClose={() => setShowModal(false)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {Auth.loggedIn() ? (
        <h4 className="px-3 bg-dark text-center">
          <FontAwesomeIcon icon={faUser} className="text-danger ml-4" />{" "}
          <span className="text-white ">{Auth.getProfile().data.username}</span>{" "}
        </h4>
      ) : (
        ""
      )}
    </>
  );
};

export default AppNavbar;
