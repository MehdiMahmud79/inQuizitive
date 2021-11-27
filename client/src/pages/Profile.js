import React, { useState, useEffect } from "react";
import QuizSearchForm from "../components/Quiz/QuizSearchForm";
import { useQuery } from "@apollo/client";
import { getUserQuizzes } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(getUserQuizzes);
  const [test, addTest] = useState(false);
  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <QuizSearchForm
            test={test}
            addTest={addTest}
            quizData={data?.getUserQuizzes}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
