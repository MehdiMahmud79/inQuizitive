import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { getUserQuizzes } from "../utils/queries";

import "./style.css";
import SingleCard from "../components/SingleCard";

const Profile = ({userQuizes,userName}) => {
//   const { loading, data } = useQuery(getUserQuizzes);
//   const[quizData, setUserQuiz]=useState([...data.getUserQuizzes])
// useEffect(() => {
//   if (!data) return;
//   setUserQuiz(data.getUserQuizzes)
// }, [quizData]);
const loading=false

return (
  <>

    <div className="flex flex-wrap justify-center bg-gray-100 m-3 p-3 rounded-xl shadow-md">
      {loading ? (
        <div
          key="loading"
          className="spinner-border text-success"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        userQuizes.map((quiz) => {
          return (
            <SingleCard
              key={quiz._id}
              quizData={quiz}
              noOfQuestions={quiz.questions.length + 1}
              userName={userName}
            />
          );
        })
      )}
    </div>
  </>
);
};

export default Profile;