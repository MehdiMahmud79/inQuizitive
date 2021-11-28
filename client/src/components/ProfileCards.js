import React from "react";

import "./style.css";
import SingleCard from "./SingleCard";

const ProfileCards = ({ userQuizes, userName, setUserQuizes }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center bg-gray-100 m-3 p-3 rounded-xl shadow-md">
        {userQuizes.map((quiz) => {
          return (
            <SingleCard
              key={quiz._id}
              quizData={quiz}
              noOfQuestions={quiz.questions.length}
              userName={userName}
              toDelet={true}
              setUserQuizes={setUserQuizes}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProfileCards;
