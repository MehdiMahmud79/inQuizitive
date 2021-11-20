import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

import Auth from "../utils/auth";

import { loginUserMutation } from "../utils/queries";
import { setStyle } from "../utils/validate";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [FaRegEnvelopeState, setFaRegEnvelopeState] =
    useState("text-gray-400 m-2");
  const [MdLockOutlineSate, setMdLockOutlineSate] =
    useState("text-gray-400 m-2");

  const [showAlert, setShowAlert] = useState(false);

  // make a gql query to the server
  const [loginUser, { data }] = useMutation(loginUserMutation);

  useEffect(() => {
    if (!data) {
      return;
    }
    Auth.login(data.login.token);
  }, [data]);
  // change the inputs while you  are typing

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name, value.length);
    if (name === "email") setStyle(name, value, setFaRegEnvelopeState);
    if (name === "password") setStyle(name, value, setMdLockOutlineSate);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var errors = [];
    if (userFormData.email === "") {
      errors.push("email");
    }

    try {
      await loginUser({ variables: { ...userFormData } });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <div className="bg-gray-100 w-100 p-2 flex items-center mb-3 ">
            <FaRegEnvelope className={FaRegEnvelopeState} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-lg flex-1 "
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
              className="bg-gray-100 outline-none text-base flex-1"
            />
          </div>
        </Form.Group>

        <button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
          className="border-2 rounded-full w-100  border-green-500 px-12 py-2 inline-block mt-12 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
        >
          Login
        </button>
      </Form>
    </>
  );
};

export default LoginForm;
