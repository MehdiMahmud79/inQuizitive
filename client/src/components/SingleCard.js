import React from "react";
import logo from "../images/logo.png";

const SingleCard = ({ quizData }) => {
  return (
    <>
      <div className="max-w-sm rounded-xl  overflow-hidden bg-red-800 text-red-200 shadow-lg m-3 ">
        <div className="flex justify-between">
          <img
            className="w-25 bg-red-200 rounded-xl m-2"
            src={logo}
            alt="inquizer logo"
          />
          <div className="p-2 m-2">
            <i className="fas fa-user-edit "> </i>{" "}
            <span className="text-blue-400">
              {quizData.author.toUpperCase()}
            </span>
            <div className="mt-2">
              <i className="far fa-calendar-check "> </i>{" "}
              <span className="text-green-400">{quizData.created_at}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="font-bold text-yellow-200 text-xl mb-2">
            <i className="fas fa-angle-double-right text-green-500"> </i>{" "}
            {quizData.title}
          </div>
          <div className=" text-yellow-200 text-xl mb-2">
            <i className="fas fa-angle-double-up text-green-500"> </i>{" "}
            {quizData.difficulty}
          </div>
          <div className=" text-yellow-200 text-xl mb-2">
            <i className="fas fa-layer-group text-green-500"> </i>{" "}
            {quizData.category}
          </div>
          <div className="text-yellow-200 text-xl mb-2">
            <i className="fas fa-check text-green-500"> </i> {quizData.type}
          </div>
          <button className="btn btn-secondary w-100">Try the Quiz</button>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
