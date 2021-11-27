import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getSingleQuiz } from "../../utils/queries";
import QuizLogic from "./QuizLogic";

const Quiz = () => {
  const { quizId } = useParams();
  // console.log(quizId);
  const { loading, data: Data } = useQuery(getSingleQuiz, {
    variables: { _id: quizId },
  });

  return (
    <div>{loading ? "loading" : <QuizLogic data={Data} quizId={quizId} />}</div>
  );
};

export default Quiz;
