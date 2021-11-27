import React from "react";
import QuizSearchForm from "../components/Quiz/QuizSearchForm";
import { useQuery } from "@apollo/client";
import { getUserQuizzes } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(getUserQuizzes);
  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <QuizSearchForm quizData={data?.getUserQuizzes} />
        </div>
      )}
    </>
  );
};

export default Profile;
