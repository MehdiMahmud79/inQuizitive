import React, { useEffect, useState } from "react";

import "./style.css";
import SingleCard from "./SingleCard";

const ProfileCards = ({ userQuizes, userName }) => {
  const loading = false;

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
                key={quiz._id + quiz.username}
                quizData={quiz}
                noOfQuestions={quiz.questions.length + 1}
                userName={userName}
                toDelet="true"
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default ProfileCards;
