import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
// react icons
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { useMutation } from "@apollo/client";

import { signUpMutation } from "../utils/queries";
import { loginUserMutation } from "../utils/queries";
import Avatars from "../utils/avatars";

import Auth from "../utils/auth";

import { setStyle } from "../utils/validate";

const SignupForm = ({ signUpForm }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    avatar: Avatars.avatarData[0].image,
    username: "",
    email: "",
    password: "",
    password2: "",
  });

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
  const [showAlert, setShowAlert] = useState({ Error: false, Success: false });
  const [alertMessage, setAlertMessage] = useState("");

  //Mutation request to crteate a user
  let [createUser, { data: signUpData, error: signUpError }] =
    useMutation(signUpMutation);
  let [loginUser, { data: loginData, error: loginError }] =
    useMutation(loginUserMutation);

  useEffect(() => {
    if (signUpForm) {
      if (!signUpData) return;
      Auth.login(signUpData.signUp.token);
    } else {
      if (!loginData) return;
      Auth.login(loginData.login.token);
    }
  }, [loginData, signUpData]);

  const handleInputChange = (event) => {
    setAlertMessage("");
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
      if (signUpForm) {
        if (userFormData.password != userFormData.password2) {
          setShowAlert(true);
          setAlertMessage("passwords should match!");
        }
        await createUser({ variables: { ...userFormData } });

        setAlertMessage("You Signed up successfully.");
      } else {
        await loginUser({
          variables: {
            email: userFormData.email,
            password: userFormData.password,
          },
        });

        setAlertMessage("You Loggedin successfully.");
      }
      setShowAlert({ Error: false, Success: true });

      setUserFormData({
        avatar: Avatars.avatarData[0].image,
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    } catch (err) {
      setShowAlert({ Error: true, Success: false });

      setAlertMessage(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}

        {showAlert.Error ? (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            {alertMessage}
          </Alert>
        ) : (
          ""
        )}
        {showAlert.Success ? (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="success"
          >
            {alertMessage}
          </Alert>
        ) : (
          ""
        )}

        {signUpForm ? (
          <Form.Group>
            <label className="block text-left m-2" htmlFor="avatar">
              <span className="text-gray-700">Select an Avatar: </span>

              <select
                className="form-select block w-full mt-1"
                value={Avatars.avatarData[0].image}
                name="avatar"
                onChange={handleInputChange}
              >
                <option>{Avatars.avatarData[0].image}</option>
                <option>{Avatars.avatarData[1].image}</option>
                <option>{Avatars.avatarData[2].image}</option>
                {/* {Avatars.map((image) => {
                  <option key={image} value={image}>
                    {image}
                  </option>;
                })} */}
              </select>
            </label>

            <Form.Label htmlFor="username">Username</Form.Label>
            <div className="bg-gray-200 rounded-xl  w-100 p-2 flex items-center mb-3 ">
              <FaUserAlt className={FaUserAltSate} />
              <input
                type="text"
                name="username"
                placeholder="User Name"
                className="bg-gray-200 rounded-xl outline-none text-sm flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
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
          <div className="bg-gray-200 rounded-xl w-100 p-2 flex items-center mb-3 ">
            <FaRegEnvelope className={FaRegEnvelopeState} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-200 rounded-xl outline-none text-sm flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
              value={userFormData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="bg-gray-200  rounded-xl w-100 p-2 flex items-center ">
            <MdLockOutline className={MdLockOutlineSate} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
              className="bg-gray-200 rounded-xl outline-none text-sm flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>
        </Form.Group>
        {signUpForm ? (
          <Form.Group>
            <Form.Label htmlFor="password2">Repeat Password</Form.Label>
            <div className="bg-gray-200 rounded-xl  w-100 p-2 flex items-center ">
              <MdLockOutline className={MdLockOutlineSate2} />
              <input
                type="password"
                name="password2"
                placeholder="Repeat Password"
                onChange={handleInputChange}
                value={userFormData.password2}
                required
                className="bg-gray-200 rounded-xl outline-none text-sm flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
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
          className="border-2 w-100  rounded-full text-center border-green-500 px-12 py-2 inline-block mt-4 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
        >
          Submit
        </button>
      </Form>
    </>
  );
};

export default SignupForm;