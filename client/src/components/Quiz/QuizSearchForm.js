import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";

import ProfileCards from "../ProfileCards";
import { addQuizMutation, getUserQuizzes } from "../../utils/queries";

import {
  categoryOptions,
  difficultyOptions,
  typeOptions,
} from "../../utils/valuesForQuizForm";
import { searchQuiz } from "../../utils/trivaApi";
import Auth from "../../utils/auth";

const amountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function QuizSearchForm({ quizData }) {
  const userName = Auth.getProfile().data.username;

  const [showAlert, setShowAlert] = useState({ Fail: false, Success: false });
  const [alertMessage, setAlertMessage] = useState("");

  const [addQuiz] = useMutation(addQuizMutation);

  const [userQuizes, setUserQuizes] = useState([...quizData]);

  const [userFormData, setUserFormData] = useState({
    title: "",
    amount: amountOptions[0],
    category: {
      label: categoryOptions[0].label,
      value: categoryOptions[0].value,
    },
    type: typeOptions[0].value,
    difficulty: difficultyOptions[0].value,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setUserFormData({
        ...userFormData,
        [name]: {
          value: event.target.value.split(",")[0],
          label: event.target.value.split(",")[1],
        },
      });
    } else if (name === "type") {
      let newValue;
      if (value === "boolean") newValue = "True/False type";
      if (value === "multiple") newValue = "Mutiple choice type";
      setUserFormData({
        ...userFormData,
        [name]: newValue,
      });
    } else {
      setUserFormData({ ...userFormData, [name]: value });
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    event.stopPropagation();
    try {
      const { results } = await searchQuiz(userFormData);

      let Quiz = {};
      Quiz.title = userFormData.title;
      Quiz.amount = userFormData.amount.toString();
      Quiz.category = userFormData.category.label;
      Quiz.type = userFormData.type;
      Quiz.difficulty = userFormData.difficulty;

      Quiz.questions = [];
      Quiz.questions = results.map(
        ({ question, correct_answer, incorrect_answers }) => {
          return { question, correct_answer, incorrect_answers };
        }
      );

      const { data } = await addQuiz({ variables: Quiz });

      const quiz_id = data.addQuiz._id;
      setUserQuizes([...data?.addQuiz]);
      setShowAlert({ Fail: false, Success: true });
      setAlertMessage("Your Quizz added successfully.");
      setUserFormData({
        title: "",
        amount: amountOptions[0],
        category: {
          label: categoryOptions[0].label,
          value: categoryOptions[0].value,
        },
        type: typeOptions[0].value,
        difficulty: difficultyOptions[0].value,
      });
    } catch (err) {
      setAlertMessage(err.message);
      setShowAlert({ Fail: true, Success: false });
    }
  };
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div className="w-100 bg-purple-100 rounded-xl ">
        <form onSubmit={handleFormSubmit}>
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

          <h1 className="text-green-800 m-5 text-center">Add a New Quiz</h1>
          <div className="container w-full">
            <label className="block text-left m-2" htmlFor="amount">
              <span className="text-gray-700">Quiz Title: </span>
              <input
                type="text"
                name="title"
                placeholder="Place the Quiz title here"
                className="bg-gray-100 my-2 text-green-600 font-bold shadow-md rounded  py-2 px-2  flex-1 "
                value={userFormData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="block text-left m-2" htmlFor="amount">
              <span className="text-gray-700">Amount of questions: </span>

              <select
                className="form-select block w-full mt-1"
                value={userFormData.amount}
                name="amount"
                onChange={handleInputChange}
              >
                {amountOptions.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-left m-2" htmlFor="category">
              <span className="text-gray-700">Select category:</span>

              <select
                className="form-select block w-full mt-1"
                value={
                  userFormData.category.value +
                  "," +
                  userFormData.category.label
                }
                name="category"
                onChange={handleInputChange}
              >
                {categoryOptions.map(({ value, label }) => (
                  <option key={label} value={value + "," + label}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-left m-2" htmlFor="difficulty">
              <span className="text-gray-700">Difficulty:</span>

              <select
                className="form-select block w-full mt-1"
                value={userFormData.difficulty.label}
                name="difficulty"
                onChange={handleInputChange}
              >
                {difficultyOptions.map(({ value, label }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-left m-2" htmlFor="type">
              <span className="text-gray-700">Type of question:</span>

              <select
                className="form-select block w-full mt-1"
                value={userFormData.type.label}
                name="type"
                onChange={handleInputChange}
              >
                {typeOptions.map(({ value, label }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <button
              disabled={!userFormData.title}
              type="submit"
              variant="success"
              className="border-2 w-100 shadow-md rounded-full  border-green-500 px-12 py-2 inline-block mt-2 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-2  shadow-md bg-gray-600 rounded-xl">
        {!userQuizes ? (
          <div
            key="loading"
            className="spinner-border text-success"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <ProfileCards
            setUserQuizes={setUserQuizes}
            userQuizes={userQuizes}
            userName={userName}
          />
        )}
      </div>
    </div>
  );
}


export default QuizSearchForm;
