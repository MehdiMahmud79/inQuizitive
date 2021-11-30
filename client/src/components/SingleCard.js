import React from "react";
import { Link } from "react-router-dom";

import { removeQuizMutation } from "../utils/queries";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import logo from "../images/logo.png";

let date = new Date();
let author = "";
const SingleCard = ({
  quizData,
  noOfQuestions,
  userName,
  toDelet,
  setUserQuizes,
}) => {
  author = userName;

  const [delQuiz] = useMutation(removeQuizMutation);
  const handleClick = async (_id) => {
    const data = await delQuiz({ variables: { id: _id } });

    const quizList = data.data.removeQuiz;
    return setUserQuizes([...quizList]);
  };
  if (quizData.created_at) {
    date = quizData.created_at;
  }
  if (quizData.username) {
    author = quizData.username;
  }

  return (
    <>
      <div className="flex-auto rounded-xl flex-wrap overflow-hidden bg-gray-900 text-red-100 opacity-90 m-3 shadow-md ">
        <div className="flex-auto justify-between ">
          <img
            id="cardLogo"
            className="bg-gray-900  rounded-xl m-2 p-2"
            src={logo}
            alt="inquizer logo"
          />
          <div className="p-2 m-2">
            <i className="fas fa-user-edit "> </i>{" "}
            <span className="text-blue-400">{author}</span>
            <div className="mt-2">
              <i className="far fa-calendar-check "> </i>{" "}
              <span className="text-green-400">{date}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <h1 className="font-bold text-yellow-200  my-2">
            <i className="fas fa-angle-double-right text-green-500"> </i> Title:{" "}
            {quizData.title}
          </h1>
          <h2 className=" text-yellow-200  my-2">
            <i className="fas fa-chart-pie text-green-500"> </i> Difficulty:{" "}
            {quizData.difficulty}
          </h2>
          <h2 className=" text-yellow-200  mb-2">
            <i className="fas fa-list-ul text-green-500"> </i> No. of Questions:{" "}
            {noOfQuestions}
          </h2>
          <h2 className=" text-yellow-200  my-2">
            <i className="fas fa-layer-group text-green-500"> </i> Category:{" "}
            {quizData.category}
          </h2>
          <h2 className="text-yellow-200  my-2">
            <i className="fas fa-check text-green-500"> </i> Quiz Type:{" "}
            {quizData.type}
          </h2>
          <div className="flex flex-1  rounded-xl  mt-3">
            {Auth.loggedIn() ? (
              <Link
                to={`quiz/${quizData._id}`}
                className="cursor-pointer no-underline text-center hover:bg-green-900 hover:text-green-100 focus:outline-none focus:ring-2  rounded-xl bg-green-500 w-100 text-gray-900 font-bold m-1 p-2"
              >
                <i className="fas fa-play-circle "></i> Start the Quiz
              </Link>
            ) : (
              <button
                className=" disabled:opacity-50  rounded-xl bg-red-500 w-100 text-red-100 m-1 p-2 cursor-help"
                disabled
              >
                <i className="fas fa-play-circle "></i> Login and Start the Quiz
              </button>
            )}
            {toDelet ? (
              <button
                onClick={() => {
                  handleClick(quizData._id);
                }}
                className=" focus:outline-none hover:bg-red-600 rounded-xl bg-green-100 text-gray-800 "
              >
                <i className="fas fa-trash-alt text-red-500 p-3  hover:text-green-100"></i>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
