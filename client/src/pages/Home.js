import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { getAllQuizzes } from "../utils/queries";

import "./style.css";
import SingleCard from "../components/SingleCard";

const Home = () => {
  const { loading, data } = useQuery(getAllQuizzes);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4 text-center mt-3">Welcome to</h1>
        <h2 className="display-4 text-center mb-3">
          in<span className="text-red-700 font-bold">Q</span>uizitive
        </h2>
      </div>

      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div
            key="loading"
            className="spinner-border text-success"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          data.getAllQuizzes.map((quiz) => {
            return <SingleCard key={quiz._id} quizData={quiz} />;
          })
        )}
      </div>
    </>
  );
};

export default Home;
