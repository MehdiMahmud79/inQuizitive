import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

import { removeQuizMutation } from "../utils/queries";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

var date = new Date();
var author = "";
const SingleCard = ({ quizData, noOfQuestions, userName, toDelet }) => {
  const [delQuiz, { data: userData, error: reqError }] =
    useMutation(removeQuizMutation);
  author = userName;

  if (quizData.created_at) {
    date = quizData.created_at;
  }
  if (quizData.username) {
    author = quizData.username;
  }

  return (
    <>
      <div className="max-w-sm rounded-xl  overflow-hidden bg-gray-800 text-red-200 opacity-90 m-3 shadow-md ">
        <div className="flex justify-between ">
          <img
            className="w-25 bg-yellow-100 rounded-xl m-2"
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
          <div className="font-bold text-yellow-200 text-xl mb-2">
            <i className="fas fa-angle-double-right text-green-500"> </i> Title:{" "}
            {quizData.title}
          </div>
          <div className=" text-yellow-200 text-xl mb-2">
            <i className="fas fa-chart-pie text-green-500"> </i> Difficulty:{" "}
            {quizData.difficulty}
          </div>
          <div className=" text-yellow-200 text-xl mb-2">
            <i className="fas fa-list-ul text-green-500"> </i> No. of Questions:{" "}
            {noOfQuestions}
          </div>
          <div className=" text-yellow-200 text-xl mb-2">
            <i className="fas fa-layer-group text-green-500"> </i> Category:{" "}
            {quizData.category}
          </div>
          <div className="text-yellow-200 text-xl mb-2">
            <i className="fas fa-check text-green-500"> </i> Quiz Type:{" "}
            {quizData.type}
          </div>
          <div className="flex flex-1 bg-gray-700 rounded-xl  mt-5">
            {Auth.loggedIn() ? (
              <Link
                to={`quiz/${quizData._id}`}
                className="cursor-pointer no-underline text-center hover:bg-green-900 hover:text-green-100 focus:outline-none focus:ring-2  rounded-xl bg-green-500 w-100 text-gray-800 m-3 p-2"
              >
                <i className="fas fa-play-circle "></i> Start the Quiz
              </Link>
            ) : (
              <button
                className=" disabled:opacity-50  rounded-xl bg-red-500 w-100 text-red-100 m-3 p-2 cursor-help"
                disabled
              >
                <i className="fas fa-play-circle "></i> Login Start the Quiz
              </button>
            )}
            {toDelet == "true" ? (
              <button
                onClick={() => {
                  delQuiz(quizData._id);
                }}
                className=" focus:outline-none hover:bg-red-600 rounded-r-xl bg-green-100 text-gray-800 "
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
