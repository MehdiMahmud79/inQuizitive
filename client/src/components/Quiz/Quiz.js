import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getSingleQuiz } from "../../utils/queries";
import QuizLogic from "./QuizLogic";

const Quiz = () => {
  const { quizId } = useParams();
  // console.log(quizId);
  const { loading, data } = useQuery(getSingleQuiz, {
    variables: { _id: quizId },
  });

  return (
    <div>
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <QuizLogic quizData={data.getQuiz} quizId={quizId} />
      )}
    </div>
  );
};

export default Quiz;
