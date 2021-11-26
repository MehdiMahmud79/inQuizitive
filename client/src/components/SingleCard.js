import React from "react";
import logo from "../images/logo.png";
var date=new Date();
var author=""
const SingleCard = ({ quizData, noOfQuestions,userName }) => {
 author=userName
  if(quizData.created_at){
     date=quizData.created_at
  }
  if(quizData.username){
    author=quizData.username
 }

  return (
    <>
      <div className="max-w-sm rounded-xl  overflow-hidden bg-gray-800 text-red-200 opacity-90 m-3 shadow-md ">
        <div className="flex justify-between ">
          <img
            className="w-25 bg-red-200 rounded-xl m-2"
            src={logo}
            alt="inquizer logo"
          />
          <div className="p-2 m-2">
            <i className="fas fa-user-edit "> </i>{" "}
            <span className="text-blue-400">
            {author}
            </span>
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
          <button className="btn btn-secondary w-100">Try the Quiz</button>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
