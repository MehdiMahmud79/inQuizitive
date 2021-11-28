import React, { useEffect, useState } from "react";
import { ListGroup, ProgressBar } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import parse from "html-react-parser";

import QuizResult from "./QuizResult";
import { AddScoreToQuizMutation } from "../../utils/queries";
import "./style.css";
import Auth from "../../utils/auth";
import logo from "../../images/logo.png";

const TIME_PER_QUESTION = 10;

const QuizLogic = ({ quizData, quizId }) => {
  const userId = Auth.getProfile().data._id;
  const user_name = Auth.getProfile().data.username;

  let [addScore, { data: ScoreData }] = useMutation(AddScoreToQuizMutation);

  const category = quizData.category;
  const type = quizData.type;
  const difficulty = quizData.difficulty;

  const Questions = quizData.questions || [];
  const quizQuestions = Questions.map((Q) => {
    const correct_answer = Q.correct_answer;
    const incorrect_answers = Q.incorrect_answers;
    const question = Q.question;
    return {
      category,
      type,
      difficulty,
      correct_answer,
      incorrect_answers,
      question,
    };
  });

  const [questionNumber, setquestionNumber] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [timeLeft, setTimeLeft] = useState(
    TIME_PER_QUESTION * quizQuestions.length
  );

  const [isComplete, setComplete] = useState(false);
  const [score, setScore] = useState(0);

  function shuffle1(arr) {
    return Array(arr.length)
      .fill(null)
      .map((_, i) => [Math.random(), i])
      .sort(([a], [b]) => a - b)
      .map(([, i]) => arr[i]);
  }

  let answerArray = [];
  var arr1 = [...quizQuestions[questionNumber].incorrect_answers];
  var arr2 = quizQuestions[questionNumber].correct_answer;
  let answerArray1 = [...arr1, arr2];

  answerArray = answerArray1;

  useEffect(() => {
    answerArray = shuffle1(answerArray1);
  }, [questionNumber, answerArray]);
  const timer = setTimeout(() => {
    if (timeLeft <= 0) {
      clearTimeout(timer);
      setComplete(true);
    } else {
      setTimeLeft(timeLeft - 1);
    }
  }, [1000]);

  const handleClick = (event) => {
    setActiveQuestion(event.target.id);
  };

  const handleSubmit = async (event) => {
    setActiveQuestion(0);
    if (activeQuestion !== 0) {
      const answerIndex = parseInt(activeQuestion.replace(/[^0-9]/g, ""));
      if (
        answerArray[answerIndex] ===
        quizQuestions[questionNumber].correct_answer
      ) {
        setCorrectAnswers(correctAnswers + 1);
      }

      if (questionNumber < quizQuestions.length - 1) {
        setquestionNumber(questionNumber + 1);
      } else {
        const totalQuestions = quizQuestions.length;
        const totalScore =
          (correctAnswers / totalQuestions) *
          (timer / totalQuestions) *
          TIME_PER_QUESTION;
        setScore(Math.round(totalScore));
        const scoreString = score.toString();
        console.log(scoreString);
        const quizScore = { score: scoreString, user_id: userId };
        const mydata = await addScore({
          variables: { id: quizId, score: quizScore },
        });
        console.log(mydata);

        setComplete(true);
      }
    }
  };

  if (isComplete) {
    return (
      <QuizResult
        correctAnswers={correctAnswers}
        quizLength={quizQuestions.length}
        Result={score}
        quiz_id={quizId}
        user_id={userId}
        user_name={user_name}
      />
    );
  } else {
    return (
      <div className="container shadow-xl my-4 mx-auto border-2 p-4 bg-gray-100  rounded-xl">
        <img
          className="w-20 mx-auto rounded-xl m-2"
          src={logo}
          alt="inquizer logo"
        />{" "}
        <h1>
          <span>
            <i className="fas fa-check-double text-green-700"></i>
          </span>{" "}
          Correct answers:{" "}
          <span className="text-green-600 font-mono font-bold">
            {correctAnswers}
          </span>
        </h1>
        <hr />
        <h3>
          {" "}
          <span>
            <i className="fas fa-hourglass-half text-red-700"></i>
          </span>{" "}
          Time left
          <div>
            <ProgressBar
              id="bar"
              striped
              animated
              max={TIME_PER_QUESTION * quizQuestions.length}
              now={timeLeft}
              label={`${timeLeft} sec`}
              variant="danger"
            />
          </div>
        </h3>
        <hr />
        <h2>
          {" "}
          <i className="fas fa-question-circle text-blue-900"></i> Question
        </h2>
        <p className="text-blue-600 font-bold text-2xl m-2 p-2 h-20">
          {" "}
          {parse(quizQuestions[questionNumber].question)}
        </p>
        <br />
        <ListGroup as="ul" className=" text-2xl">
          {answerArray.map((answer, index) =>
            `answer-${index}` === activeQuestion ? (
              <ListGroup.Item
                className="list-group-item-primary rounded-b-2xl"
                key={index}
                action
                onClick={handleClick}
                active
                id={`answer-${index}`}
              >
                <i className="fas fa-angle-double-right text-yellow-400"></i>{" "}
                {parse(answer)}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                className="list-group-item-light"
                key={index}
                action
                onClick={handleClick}
                id={`answer-${index}`}
              >
                {parse(answer)}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
        <br />
        <hr />
        <div className="d-grid gap-2">
          <button
            className="bg-green-900 text-green-100 rounded-full text-2xl py-2"
            onClick={handleSubmit}
          >
            <i className="fas fa-forward  text-yellow-200"></i>{" "}
            <span className="font-bold text-white"> Submit</span>
          </button>
        </div>
        <br />
        <ProgressBar now={(questionNumber * 100) / quizQuestions.length} />
      </div>
    );
  }
};;

export default QuizLogic;
