import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert } from "react-bootstrap";

import SingleCard from "../components/SingleCard";
import { getAllQuizzes } from "../utils/queries";

import "./style.css";

const Home = () => {
  const { loading, data } = useQuery(getAllQuizzes);
  const [showAlert, setShowAlert] = useState(false);

  const [Quizes, setAllQuizes] = useState([]);
  useEffect(() => {
    if (loading) return;
    setAllQuizes(data.getAllQuizzes);
  }, [loading, data]);

  return (
    <>
      <div className="bg-gray-200 p-2">
        <h1 className="text-2xl text-center my-2">Welcome to</h1>
        <h2 className="display-4 text-center mb-2">
          in<span className="text-red-700 font-bold">Q</span>uizitive
        </h2>
      </div>
      <div className="flex flex-wrap justify-center bg-gray-100 m-2 p-2 rounded-xl shadow-md">
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
      {Quizes.length === 0 ? (
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show="true"
          variant="danger"
        >
          There is no Quizzes in the Database. Login and create one!
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
