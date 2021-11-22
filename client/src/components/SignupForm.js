import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signUpMutation } from "../utils/queries";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { setStyle } from "../utils/validate";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [FaRegEnvelopeState, setFaRegEnvelopeState] =
    useState("text-gray-400 m-2");
  const [MdLockOutlineSate, setMdLockOutlineSate] =
    useState("text-gray-400 m-2");
  const [FaUserAltSate, setFaUserAltSate] = useState("text-gray-400 m-2");
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  //Mutation request to crteate a user
  const [createUser, { data }] = useMutation(signUpMutation);

  useEffect(() => {
    if (!data) {
      return;
    }
    Auth.login(data.signUp.token);
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name, value.length);
    if (name === "email") setStyle(name, value, setFaRegEnvelopeState);
    if (name === "username") setStyle(name, value, setFaUserAltSate);
    if (name === "password") setStyle(name, value, setMdLockOutlineSate);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser({ variables: { ...userFormData } });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <div className="bg-gray-100 w-100 p-2 flex items-center mb-3 ">
            <FaUserAlt className={FaUserAltSate} />
            <input
              type="test"
              name="username"
              placeholder="User Name"
              className="bg-gray-100 outline-none text-sm flex-1 "
              value={userFormData.username}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>

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
        <Form.Group>
          <Form.Label htmlFor="password2">Repeat Password</Form.Label>
          <div className="bg-gray-100 w-100 p-2 flex items-center ">
            <MdLockOutline className={MdLockOutlineSate} />
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