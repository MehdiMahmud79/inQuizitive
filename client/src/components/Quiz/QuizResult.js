import React from "react";
import SummaryCard from "./SummaryCard";
const QuizResult = ({ correctAnswers, quizLength, result, summary }) => {
  return (
    <div className="container bg-purple-100 rounded-xl shadow-md p-3">
      <h1 className="text-center m-3 text-3xl "> Quiz Result</h1>
      <hr />
      <h2 className=" p-1 text-3xl my-2 ">
        <i className="fas fa-check-square text-green-500 text-3xl"></i>{" "}
        <span className="text-purple-900 text-3xl">{correctAnswers} </span>
        OUT OF <span className="text-purple-900 text-3xl">{quizLength} </span>
      </h2>
      <h2 className="text-2xl text-blue-900 text-center font-bold my-2">
        {" "}
        <i className="fas fa-medal text-2xl text-green-600 text-center "></i>{" "}
        your Score: {result}{" "}
      </h2>
      <hr />

      <div className="flex flex-wrap justify-center bg-gray-100 m-3 p-3 rounded-xl shadow-md">
        <hr />
        <h1 className="text-bold text-blue-600 text-xl border-x-2 border-solid border-b-2 w-100 text-center">
          Quiz summary
        </h1>

        <div>
          {summary.map((question, index) => {
            return <SummaryCard key={index} questionRes={question} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
