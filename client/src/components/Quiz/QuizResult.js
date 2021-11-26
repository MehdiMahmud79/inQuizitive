import React from "react";

const QuizResult = ({ correctAnswers, quizLength, Result }) => {
  return (
    <div className="container bg-purple-100 rounded-xl shadow-md p-3">
      <h1 className="text-center m-3  "> Quiz Result</h1>
      <hr />
      <h2 className=" p-1  ">
        <i className="fas fa-check-square text-green-500"></i>{" "}
        <span className="text-purple-900 ">{correctAnswers} </span>
        OUT OF <span className="text-purple-900 text-3xl">{quizLength} </span>
      </h2>
      <h2> your Score: {Result} </h2>
    </div>
  );
};

export default QuizResult;
