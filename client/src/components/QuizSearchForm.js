import React, { useState, useEffect } from "react";
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

function QuizSearchForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userFormData, setUserFormData] = useState({
    title: "",
    amount: amountOptions[0],
    category: categoryOptions[0].value,
    type: typeOptions[0].value,
    difficulty: difficultyOptions[0].value,
  });

  const [addQuiz, { data: quizData, error }] = useMutation(addQuizMutation);
  useEffect(() => {
    if (!quizData) return;
    // do st
  }, [quizData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    event.stopPropagation();
    console.log("search for the quiz");

    try {
      const { results: questions } = await searchQuiz(userFormData);
      console.log(questions);
      const title = userFormData.title;
      const { data } = await addQuiz({ variables: { title, questions } });
      const quiz_id = data.addQuiz._id;
      // questions.map(async (currentQuestion) => {
      console.log("quizDATA_id ", quiz_id);
      // });
      // return <AddedQuiz quizId={quizData} />;
    } catch (err) {
      setErrorMessage(err.message);
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
          {errorMessage}
        </Alert>
        <h1 className="text-green-800 m-3 text-center">Choose your Quiz</h1>
        <div className="container w-25">
          <label className="block text-left m-2" htmlFor="amount">
            <span className="text-gray-700">Quiz Title: </span>
            <input
              type="text"
              name="title"
              placeholder="Place the Quiz title here"
              className="bg-gray-100 my-2 text-red-600 font-bold shadow-md rounded  py-2 px-2  flex-1 "
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
            disabled={!userFormData.title}
            type="submit"
            variant="success"
            className="border-2 w-100 shadow-md rounded-full  border-green-500 px-12 py-2 inline-block mt-2 font-semibold text hover:bg-green-500 hover:text-white text-decoration-none"
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
