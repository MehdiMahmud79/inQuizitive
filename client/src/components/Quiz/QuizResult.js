import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AddScoreToQuizMutation } from "../../utils/queries";
const QuizResult = ({
  correctAnswers,
  quizLength,
  Result,
  quiz_id,
  user_id,
  user_name,
}) => {
  let [addScore, { data, error }] = useMutation(AddScoreToQuizMutation);
  useEffect(async () => {
    if (!data) return;
    const mydata = await addScore({
      variables: { _id: quiz_id, score: Result },
    });
    console.log(mydata);
  }, [data]);
  return (
    <div className="container bg-purple-100 rounded-xl shadow-md p-3">
      <h1 className="text-center m-3  "> Quiz Result</h1>
      <h1 className="text-center m-3  "> {user_name}</h1>
      <hr />
      <h2 className=" p-1  ">
        <i className="fas fa-check-square text-green-500"></i>{" "}
        <span className="text-purple-900 ">{correctAnswers} </span>
        OUT OF <span className="text-purple-900 text-3xl">{quizLength} </span>
      </h2>
      <h2> your Score: {Result} </h2>
      <hr />
      <h1> Here a chart will be presented </h1>
    </div>
  );
};

export default QuizResult;
