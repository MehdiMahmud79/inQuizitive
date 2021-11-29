import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

  const [addScore, { data: ScoreData }] = useMutation(AddScoreToQuizMutation);

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
  const [quizScores, setQuizScores] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [summary, setSummary] = useState([]);

  const [timeLeft, setTimeLeft] = useState(
    TIME_PER_QUESTION * quizQuestions.length
  );

  const [isComplete, setComplete] = useState(false);
  const [score, setScore] = useState(0);

  function shuffle1(arr) {
    setAnswers(
      Array(arr.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => arr[i])
    );
  }

  useEffect(() => {
    shuffle1([
      quizQuestions[questionNumber].correct_answer,
      ...quizQuestions[questionNumber].incorrect_answers,
    ]);
  }, [questionNumber]);
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
        answers[answerIndex] === quizQuestions[questionNumber].correct_answer
      ) {
        setCorrectAnswers(correctAnswers + 1);
        setSummary([
          ...summary,
          { question: quizQuestions[questionNumber].question, res: true },
        ]);
      } else {
        setSummary([
          ...summary,
          { question: quizQuestions[questionNumber].question, res: false },
        ]);
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

        const quizScore = {
          score: `${Math.round(totalScore)}`,
          user_id: userId,
          userName: user_name,
        };

        const scoresData = await addScore({
          variables: { id: quizId, score: quizScore },
        });
        setQuizScores([...scoresData.data.AddScoreToQuiz.scores]);
        // console.log("All scores", scoresData.data.AddScoreToQuiz.scores);
        clearTimeout(timer);
        setComplete(true);
      }
    }
  };

  if (isComplete) {
    return (
      <QuizResult
        correctAnswers={correctAnswers}
        quizLength={quizQuestions.length}
        result={score}
        summary={summary}
        quizScores={quizScores}
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
        <NavLink
          className="bg-red-600 text-green-100 rounded-lg text-xl py-2 px-2 float-right"
          to={"/"}
        >
          <span className="font-bold text-white">
            {" "}
            <i className="fas fa-window-close"></i> Cancel
          </span>
        </NavLink>
        <h1 className="text-xl p-2">
          <span>
            <i className="fas fa-check-double text-green-700 "></i>
          </span>{" "}
          Correct answers:{" "}
          <span className="text-green-600 font-mono font-bold">
            {correctAnswers}
          </span>
        </h1>
        <hr />
        <h3 className="text-xl p-2">
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
        <h2 className="text-xl p-2">
          {" "}
          <i className="fas fa-question-circle text-blue-900 "></i> Question
        </h2>
        <p className="text-blue-600 font-bold text-xl m-2 p-2">
          {" "}
          {parse(quizQuestions[questionNumber].question)}
        </p>
        <br />
        <ListGroup as="ul" className=" text-xl">
          {answers.map((answer, index) =>
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
            className="bg-green-900 text-green-100 rounded-full text-xl py-2"
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
