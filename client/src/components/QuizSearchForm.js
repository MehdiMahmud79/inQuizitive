import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import AddedQuiz from "./AddedQuiz";

import { addQuizMutation } from "../utils/queries";

import {
  categoryOptions,
  difficultyOptions,
  typeOptions,
} from "../utils/valuesForQuizForm";
import { searchQuiz } from "../utils/trivaApi";

const amountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function QuizSearchForm(props) {
  const [showAlert, setShowAlert] = useState(false);

  const [userFormData, setUserFormData] = useState({
    amount: amountOptions[0],
    category: categoryOptions[0].value,
    type: typeOptions[0].value,
    difficulty: difficultyOptions[0].value,
  });

  const [addQuiz, { data: quizData, error }] = useMutation(addQuizMutation);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    event.preventDefault();
    event.stopPropagation();

    try {
      const { results } = await searchQuiz(userFormData);

      const quizId = await addQuiz([]);
      results.map(async (currentQuestion) => {
        console.log("CATEGORY ", currentQuestion);
      });

      console.log("quiz: ", quizId);

      return <AddedQuiz quizId={quizData} />;
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your quiz search!
        </Alert>
        <h1 className="text-green-800 m-3 text-center">Choose your Quiz</h1>
        <div className="container w-25">
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
              value={userFormData.category.label}
              name="category"
              onChange={handleInputChange}
            >
              {categoryOptions.map(({ value, label }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-left m-2" htmlFor="category">
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

          <label className="block text-left m-2" htmlFor="category">
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
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
            className="border-2 w-100  rounded-full  border-green-500 px-12 py-2 inline-block mt-2 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

// const query={
//   amount:5,
//   category:18,
//   difficulty:"easy",
//   type:"multiple"

//   }

export default QuizSearchForm;
