import React from "react";
import { useQuery } from "@apollo/client";

import QuizSearchForm from "../components/Quiz/QuizSearchForm";
import { getUserQuizzes } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(getUserQuizzes);
  return (
    <>
      {loading ? (
        <div
          key="loading"
          className="spinner-border text-success"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <QuizSearchForm quizData={data.getUserQuizzes} />
        </div>
      )}
    </>
  );
};

export default Profile;
