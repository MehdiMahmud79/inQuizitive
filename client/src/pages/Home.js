import React, { useState, useEffect } from "react";
import "./style.css";
import SingleCard from "../components/SingleCard";
import { useQuery } from "@apollo/client";
import { getAllQuizzes } from "../utils/queries";
const Home = () => {
  const { loading, data } = useQuery(getAllQuizzes);

  const [Quizes, setAllQuizes] = useState([]);
  useEffect(() => {
    if (loading) return;
    setAllQuizes(data.getAllQuizzes);
  }, [loading]);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4 text-center mt-3">Welcome to</h1>
        <h2 className="display-4 text-center mb-3">
          in<span className="text-red-700 font-bold">Q</span>uizitive
        </h2>
      </div>
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
          Quizes.map((quiz) => {
            return (
              <SingleCard
                key={quiz._id}
                quizData={quiz}
                noOfQuestions={quiz?.questions.length + 1}
                toDelet={false}
                userName={quiz.author}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
