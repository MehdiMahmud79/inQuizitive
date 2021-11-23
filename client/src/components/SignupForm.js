import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { signUpMutation } from "../utils/queries";
import { loginUserMutation } from "../utils/queries";

import Auth from "../utils/auth";
import { setStyle } from "../utils/validate";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const SignupForm = ({ signUp }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorMessage, setError] = useState("");

  const [FaRegEnvelopeState, setFaRegEnvelopeState] =
    useState("text-gray-400 m-2");
  const [MdLockOutlineSate, setMdLockOutlineSate] =
    useState("text-gray-400 m-2");
  const [MdLockOutlineSate2, setMdLockOutlineSate2] =
    useState("text-gray-400 m-2");

  const [FaUserAltSate, setFaUserAltSate] = useState("text-gray-400 m-2");

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  //Mutation request to crteate a user
  let [createUser, { data: signUpData, error: signUpError }] =
    useMutation(signUpMutation);
  let [loginUser, { data: loginData, error: loginError }] =
    useMutation(loginUserMutation);

  useEffect(() => {
    if (signUp) {
      if (!signUpData) return;
      Auth.login(signUpData.signUp.token);
    } else {
      if (!loginData) return;
      Auth.login(loginData.login.token);
    }
  }, [loginData, signUpData]);

  const handleInputChange = (event) => {
    setError("");
    setShowAlert(false);
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    if (name === "email") setStyle(name, value, setFaRegEnvelopeState);
    if (name === "username") setStyle(name, value, setFaUserAltSate);
    if (name === "password") setStyle(name, value, setMdLockOutlineSate);
    if (name === "password2") setStyle(name, value, setMdLockOutlineSate2);
  };

  const handleFormSubmit = async (event) => {
    setShowAlert(false);

    event.preventDefault();
    try {
      if (signUp) {
        if (userFormData.password != userFormData.password2) {
          setShowAlert(true);
          setError("passwords should match!");
          return;
        }
        await createUser({ variables: { ...userFormData } });
        Error = signUpError.message;
      } else {
        await loginUser({
          variables: {
            email: userFormData.email,
            password: userFormData.password,
          },
        });
        Error = loginError.message;
      }

      setUserFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    } catch (err) {
      setShowAlert(true);

      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}

        <Alert
          variant="danger"
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
        >
          {errorMessage}
        </Alert>

        {signUp ? (
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <div className="bg-gray-100 w-100 p-2 flex items-center mb-3 ">
              <FaUserAlt className={FaUserAltSate} />
              <input
                type="text"
                name="username"
                placeholder="User Name"
                className="bg-gray-100 outline-none text-sm flex-1 "
                value={userFormData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </Form.Group>
        ) : (
          ""
        )}
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <div className="bg-gray-100 w-100 p-2 flex items-center mb-3 ">
            <FaRegEnvelope className={FaRegEnvelopeState} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-sm flex-1 "
              value={userFormData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="bg-gray-100 w-100 p-2 flex items-center ">
            <MdLockOutline className={MdLockOutlineSate} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
        </Form.Group>
        {signUp ? (
          <Form.Group>
            <Form.Label htmlFor="password2">Repeat Password</Form.Label>
            <div className="bg-gray-100 w-100 p-2 flex items-center ">
              <MdLockOutline className={MdLockOutlineSate2} />
              <input
                type="password"
                name="password2"
                placeholder="Repeat Password"
                onChange={handleInputChange}
                value={userFormData.password2}
                required
                className="bg-gray-100 outline-none text-sm flex-1"
              />
            </div>
          </Form.Group>
        ) : (
          ""
        )}
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
          className="border-2 w-100  rounded-full  border-green-500 px-12 py-2 inline-block mt-12 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
        >
          Submit
        </button>
      </Form>
    </>
  );
};

export default SignupForm;