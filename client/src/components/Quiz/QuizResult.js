import React from "react";
import { NavLink } from "react-router-dom";

import SummaryCard from "./SummaryCard";
import ScoreChart from "./ScoreChart";

const QuizResult = ({
  correctAnswers,
  quizLength,
  result,
  summary,
  quizScores,
  userName,
}) => {
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
        {summary.length > 0 ? (
          <>
            <h1 className="text-bold text-blue-600 text-xl border-x-2 border-solid border-b-2 w-100 text-center">
              Quiz summary
            </h1>
            <div className="grid grid-cols-3 divide-x divide-gray-500 p-2 shadow-lg">
              {summary.map((question, index) => {
                return <SummaryCard key={index} questionRes={question} />;
              })}
            </div>
          </>
        ) : (
          ""
        )}
        {/* adding barchart for the scores */}
        <ScoreChart
          quizScores={quizScores}
          userName={userName}
          result={result}
        />{" "}
      </div>
      <div className="bg-purple-400 text-white rounded-lg  p-3 my-auto mx-auto text-center">
        <NavLink
          className="bg-blue-700 hover:bg-blue-800 hover:text-green-200  rounded-lg   px-5 py-2"
          to={"/"}
        >
          <span className="font-bold ">
            {" "}
            <i className="fas fa-reply-all"></i> Try again
          </span>
        </NavLink>
      </div>
    </div>
  );
};
export default QuizResult;
